// /////////////////////////////////////////////////////////////////////////

//
// Copyright (c) 2024, STEREOLABS.
//
// All rights reserved.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// /////////////////////////////////////////////////////////////////////////

#include <gst/gst.h>
#include <gst/gstbuffer.h>
#include <gst/gstcaps.h>
#include <gst/video/video.h>

#include "gst-zed-meta/gstzedmeta.h"
#include "gstzeddemux.h"

#include <stdio.h>

GST_DEBUG_CATEGORY_STATIC(gst_zeddemux_debug);
#define GST_CAT_DEFAULT gst_zeddemux_debug

/* Filter signals and args */
enum {
    /* FILL ME */
    LAST_SIGNAL
};

enum { PROP_0, PROP_IS_DEPTH, PROP_STREAM_DATA };

#define DEFAULT_PROP_IS_DEPTH    TRUE
#define DEFAULT_PROP_STREAM_DATA FALSE

/* the capabilities of the inputs and outputs.
 *
 * describe the real formats here.
 */
static GstStaticPadTemplate sink_factory =
    GST_STATIC_PAD_TEMPLATE("sink", GST_PAD_SINK, GST_PAD_ALWAYS,
                            GST_STATIC_CAPS(("video/x-raw, "   // Double stream VGA
                                             "format = (string)BGRA, "
                                             "width = (int)672, "
                                             "height = (int)752 , "
                                             "framerate = (fraction) { 15, 30, 60, 100 }"
                                             ";"
                                             "video/x-raw, "   // Double stream HD720
                                             "format = (string)BGRA, "
                                             "width = (int)1280, "
                                             "height = (int)1440, "
                                             "framerate = (fraction) { 15, 30, 60 }"
                                             ";"
                                             "video/x-raw, "   // Double stream HD1080
                                             "format = (string)BGRA, "
                                             "width = (int)1920, "
                                             "height = (int)2160, "
                                             "framerate = (fraction) { 15, 30, 60 }"
                                             ";"
                                             "video/x-raw, "   // Double stream HD2K
                                             "format = (string)BGRA, "
                                             "width = (int)2208, "
                                             "height = (int)2484, "
                                             "framerate = (fraction)15"
                                             ";"
                                             "video/x-raw, "   // Double stream HD1200 (GMSL2)
                                             "format = (string)BGRA, "
                                             "width = (int)1920, "
                                             "height = (int)2400, "
                                             "framerate = (fraction) { 15, 30, 60 }"
                                             ";"
                                             "video/x-raw, "   // Double stream SVGA (GMSL2)
                                             "format = (string)BGRA, "
                                             "width = (int)960, "
                                             "height = (int)1200, "
                                             "framerate = (fraction) { 15, 30, 60, 120 }")));

static GstStaticPadTemplate src_left_factory =
    GST_STATIC_PAD_TEMPLATE("src_left", GST_PAD_SRC, GST_PAD_ALWAYS,
                            GST_STATIC_CAPS(("video/x-raw, "   // Color VGA
                                             "format = (string)BGRA, "
                                             "width = (int)672, "
                                             "height =  (int)376, "
                                             "framerate = (fraction) { 15, 30, 60, 100 }"
                                             ";"
                                             "video/x-raw, "   // Color HD720
                                             "format = (string)BGRA, "
                                             "width = (int)1280, "
                                             "height =  (int)720, "
                                             "framerate =  (fraction)  { 15, 30, 60}"
                                             ";"
                                             "video/x-raw, "   // Color HD1080
                                             "format = (string)BGRA, "
                                             "width = (int)1920, "
                                             "height = (int)1080, "
                                             "framerate = (fraction) { 15, 30, 60 }"
                                             ";"
                                             "video/x-raw, "   // Color HD2K
                                             "format = (string)BGRA, "
                                             "width = (int)2208, "
                                             "height = (int)1242, "
                                             "framerate = (fraction)15"
                                             ";"
                                             "video/x-raw, "   // Color HD1200 (GMSL2)
                                             "format = (string)BGRA, "
                                             "width = (int)1920, "
                                             "height = (int)1200, "
                                             "framerate = (fraction) { 15, 30, 60 }"
                                             ";"
                                             "video/x-raw, "   // Color SVGA (GMSL2)
                                             "format = (string)BGRA, "
                                             "width = (int)960, "
                                             "height = (int)600, "
                                             "framerate = (fraction) { 15, 30, 60, 120 }")));

static GstStaticPadTemplate src_aux_factory =
    GST_STATIC_PAD_TEMPLATE("src_aux", GST_PAD_SRC, GST_PAD_ALWAYS,
                            GST_STATIC_CAPS(("video/x-raw, "   // Color VGA
                                             "format = (string)BGRA, "
                                             "width = (int)672, "
                                             "height =  (int)376, "
                                             "framerate = (fraction) { 15, 30, 60, 100 }"
                                             ";"
                                             "video/x-raw, "   // Color HD720
                                             "format = (string)BGRA, "
                                             "width = (int)1280, "
                                             "height =  (int)720, "
                                             "framerate =  (fraction)  { 15, 30, 60}"
                                             ";"
                                             "video/x-raw, "   // Color HD1080
                                             "format = (string)BGRA, "
                                             "width = (int)1920, "
                                             "height = (int)1080, "
                                             "framerate = (fraction) { 15, 30, 60 }"
                                             ";"
                                             "video/x-raw, "   // Color HD2K
                                             "format = (string)BGRA, "
                                             "width = (int)2208, "
                                             "height = (int)1242, "
                                             "framerate = (fraction)15"
                                             ";"
                                             "video/x-raw, "   // Color HD1200 (GMSL2)
                                             "format = (string)BGRA, "
                                             "width = (int)1920, "
                                             "height = (int)1200, "
                                             "framerate = (fraction) { 15, 30, 60 }"
                                             ";"
                                             "video/x-raw, "   // Color SVGA (GMSL2)
                                             "format = (string)BGRA, "
                                             "width = (int)960, "
                                             "height = (int)600, "
                                             "framerate = (fraction) { 15, 30, 60, 120 }"
                                             ";"
                                             "video/x-raw, "   // Color VGA
                                             "format = (string)BGRA, "
                                             "width = (int)672, "
                                             "height =  (int)376, "
                                             "framerate = (fraction) { 15, 30, 60, 100 }"
                                             ";"
                                             "video/x-raw, "   // Color HD720
                                             "format = (string)BGRA, "
                                             "width = (int)1280, "
                                             "height =  (int)720, "
                                             "framerate =  (fraction)  { 15, 30, 60}"
                                             ";"
                                             "video/x-raw, "   // Color HD1080
                                             "format = (string)BGRA, "
                                             "width = (int)1920, "
                                             "height = (int)1080, "
                                             "framerate = (fraction) { 15, 30, 60 }"
                                             ";"
                                             "video/x-raw, "   // Color HD2K
                                             "format = (string)BGRA, "
                                             "width = (int)2208, "
                                             "height = (int)1242, "
                                             "framerate = (fraction)15"
                                             ";"
                                             "video/x-raw, "   // Color HD1200 (GMSL2)
                                             "format = (string)BGRA, "
                                             "width = (int)1920, "
                                             "height = (int)1200, "
                                             "framerate = (fraction) { 15, 30, 60 }"
                                             ";"
                                             "video/x-raw, "   // Color SVGA (GMSL2)
                                             "format = (string)BGRA, "
                                             "width = (int)960, "
                                             "height = (int)600, "
                                             "framerate = (fraction) { 15, 30, 60, 120 }")));

static GstStaticPadTemplate src_data_factory = GST_STATIC_PAD_TEMPLATE("src_data", GST_PAD_SRC, GST_PAD_ALWAYS, GST_STATIC_CAPS("application/data"));

/* class initialization */
G_DEFINE_TYPE(GstZedDemux, gst_zeddemux, GST_TYPE_ELEMENT);

static void gst_zeddemux_set_property(GObject *object, guint prop_id, const GValue *value, GParamSpec *pspec);
static void gst_zeddemux_get_property(GObject *object, guint prop_id, GValue *value, GParamSpec *pspec);

static gboolean gst_zeddemux_sink_event(GstPad *pad, GstObject *parent, GstEvent *event);
static GstFlowReturn gst_zeddemux_chain(GstPad *pad, GstObject *parent, GstBuffer *buf);

/* GObject vmethod implementations */

/* initialize the plugin's class */
static void gst_zeddemux_class_init(GstZedDemuxClass *klass) {
    GObjectClass *gobject_class = G_OBJECT_CLASS(klass);
    GstElementClass *gstelement_class = GST_ELEMENT_CLASS(klass);

    GST_DEBUG_OBJECT(gobject_class, "Class Init");

    gobject_class->set_property = gst_zeddemux_set_property;
    gobject_class->get_property = gst_zeddemux_get_property;

    g_object_class_install_property(gobject_class, PROP_IS_DEPTH,
                                    g_param_spec_boolean("is-depth", "Depth", "Aux source is GRAY16 depth", DEFAULT_PROP_IS_DEPTH, G_PARAM_READWRITE));

    g_object_class_install_property(
        gobject_class, PROP_STREAM_DATA,
        g_param_spec_boolean("stream-data", "Stream Data", "Enable binary data streaming on `src_data` pad", DEFAULT_PROP_STREAM_DATA, G_PARAM_READWRITE));

    gst_element_class_set_static_metadata(gstelement_class, "ZED Composite Stream Demuxer", "Demuxer/Video", "Stereolabs ZED Stream Demuxer",
                                          "Stereolabs <support@stereolabs.com>");

    gst_element_class_add_pad_template(gstelement_class, gst_static_pad_template_get(&src_left_factory));
    gst_element_class_add_pad_template(gstelement_class, gst_static_pad_template_get(&src_aux_factory));
    gst_element_class_add_pad_template(gstelement_class, gst_static_pad_template_get(&src_data_factory));

    gst_element_class_add_pad_template(gstelement_class, gst_static_pad_template_get(&sink_factory));
}

/* initialize the new element
 * instantiate pads and add them to element
 * set pad calback functions
 * initialize instance structure
 */
static void gst_zeddemux_init(GstZedDemux *filter) {
    GST_DEBUG_OBJECT(filter, "Filter Init");

    filter->sinkpad = gst_pad_new_from_static_template(&sink_factory, "sink");
    gst_element_add_pad(GST_ELEMENT(filter), filter->sinkpad);

    filter->srcpad_left = gst_pad_new_from_static_template(&src_left_factory, "src_left");
    gst_element_add_pad(GST_ELEMENT(filter), filter->srcpad_left);

    filter->srcpad_aux = gst_pad_new_from_static_template(&src_aux_factory, "src_aux");
    gst_element_add_pad(GST_ELEMENT(filter), filter->srcpad_aux);

    filter->srcpad_data = gst_pad_new_from_static_template(&src_data_factory, "src_data");
    gst_element_add_pad(GST_ELEMENT(filter), filter->srcpad_data);

    gst_pad_set_event_function(filter->sinkpad, GST_DEBUG_FUNCPTR(gst_zeddemux_sink_event));
    gst_pad_set_chain_function(filter->sinkpad, GST_DEBUG_FUNCPTR(gst_zeddemux_chain));

    filter->is_depth = DEFAULT_PROP_IS_DEPTH;
    filter->stream_data = DEFAULT_PROP_STREAM_DATA;
    filter->caps_left = nullptr;
    filter->caps_aux = nullptr;
}

static void gst_zeddemux_set_property(GObject *object, guint prop_id, const GValue *value, GParamSpec *pspec) {
    GstZedDemux *filter = GST_ZEDDEMUX(object);

    GST_DEBUG_OBJECT(filter, "Set property");

    switch (prop_id) {
    case PROP_IS_DEPTH:
        filter->is_depth = g_value_get_boolean(value);
        GST_DEBUG("Depth mode: %d", filter->is_depth);
        break;
    case PROP_STREAM_DATA:
        filter->stream_data = g_value_get_boolean(value);
        GST_DEBUG("Data stream: %d", filter->stream_data);
        break;
    default:
        G_OBJECT_WARN_INVALID_PROPERTY_ID(object, prop_id, pspec);
        break;
    }
}

static void gst_zeddemux_get_property(GObject *object, guint prop_id, GValue *value, GParamSpec *pspec) {
    GstZedDemux *filter = GST_ZEDDEMUX(object);

    GST_DEBUG_OBJECT(filter, "Get property");

    switch (prop_id) {
    case PROP_IS_DEPTH:
        g_value_set_boolean(value, filter->is_depth);
        GST_DEBUG("Depth mode: %d", filter->is_depth);
        break;
    case PROP_STREAM_DATA:
        g_value_set_boolean(value, filter->stream_data);
        GST_DEBUG("Data Stream: %d", filter->stream_data);
        break;
    default:
        G_OBJECT_WARN_INVALID_PROPERTY_ID(object, prop_id, pspec);
        break;
    }
}

/* GstElement vmethod implementations */

static gboolean set_out_caps(GstZedDemux *filter, GstCaps *sink_caps) {
    GstVideoInfo vinfo_in;
    GstVideoInfo vinfo_left;
    GstVideoInfo vinfo_aux;

    GST_DEBUG_OBJECT(filter, "Sink caps %" GST_PTR_FORMAT, sink_caps);

    // ----> Caps left source
    if (filter->caps_left) {
        gst_caps_unref(filter->caps_left);
    }

    gst_video_info_from_caps(&vinfo_in, sink_caps);

    gst_video_info_init(&vinfo_left);
    gst_video_info_set_format(&vinfo_left, GST_VIDEO_FORMAT_BGRA, vinfo_in.width, vinfo_in.height / 2);
    vinfo_left.fps_d = vinfo_in.fps_d;
    vinfo_left.fps_n = vinfo_in.fps_n;
    filter->caps_left = gst_video_info_to_caps(&vinfo_left);

    GST_DEBUG_OBJECT(filter, "Created left caps %" GST_PTR_FORMAT, filter->caps_left);
    if (gst_pad_set_caps(filter->srcpad_left, filter->caps_left) == FALSE) {
        return false;
    }
    // <---- Caps left source

    // ----> Caps aux source
    if (filter->caps_aux) {
        gst_caps_unref(filter->caps_aux);
    }

    gst_video_info_from_caps(&vinfo_in, sink_caps);

    gst_video_info_init(&vinfo_aux);
    if (filter->is_depth) {
        gst_video_info_set_format(&vinfo_aux, GST_VIDEO_FORMAT_GRAY16_LE, vinfo_in.width, vinfo_in.height / 2);
    } else {
        gst_video_info_set_format(&vinfo_aux, GST_VIDEO_FORMAT_BGRA, vinfo_in.width, vinfo_in.height / 2);
    }
    vinfo_aux.fps_d = vinfo_in.fps_d;
    vinfo_aux.fps_n = vinfo_in.fps_n;
    filter->caps_aux = gst_video_info_to_caps(&vinfo_aux);

    GST_DEBUG_OBJECT(filter, "Created aux caps %" GST_PTR_FORMAT, filter->caps_aux);
    if (gst_pad_set_caps(filter->srcpad_aux, filter->caps_aux) == FALSE) {
        return false;
    }
    // <---- Caps aux source

    return TRUE;
}

/* this function handles sink events */
static gboolean gst_zeddemux_sink_event(GstPad *pad, GstObject *parent, GstEvent *event) {
    GstZedDemux *filter;
    gboolean ret;

    filter = GST_ZEDDEMUX(parent);

    GST_LOG_OBJECT(filter, "Received %s event: %" GST_PTR_FORMAT, GST_EVENT_TYPE_NAME(event), event);

    switch (GST_EVENT_TYPE(event)) {
    case GST_EVENT_CAPS: {
        GST_DEBUG_OBJECT(filter, "Event CAPS");
        GstCaps *caps;

        gst_event_parse_caps(event, &caps);
        /* do something with the caps */

        ret = set_out_caps(filter, caps);

        /* and forward */
        ret = gst_pad_event_default(pad, parent, event);
        break;
    }
    default:
        ret = gst_pad_event_default(pad, parent, event);
        break;
    }

    return ret;
}

/* chain function
 * this function does the actual processing
 */
static GstFlowReturn gst_zeddemux_chain(GstPad *pad, GstObject *parent, GstBuffer *buf) {
    GstZedDemux *filter;

    filter = GST_ZEDDEMUX(parent);

    GST_TRACE_OBJECT(filter, "Chain");

    GstMapInfo map_in;
    GstMapInfo map_out_left;
    GstMapInfo map_out_aux;
    GstMapInfo map_out_data;

    GstZedSrcMeta *meta = nullptr;

    GstFlowReturn ret_left = GST_FLOW_ERROR;
    GstFlowReturn ret_aux = GST_FLOW_ERROR;

    GstClockTime timestamp = GST_CLOCK_TIME_NONE;

    timestamp = GST_BUFFER_TIMESTAMP(buf);
    GST_LOG("timestamp %" GST_TIME_FORMAT, GST_TIME_ARGS(timestamp));

    GST_TRACE_OBJECT(filter, "Processing ...");
    if (gst_buffer_map(buf, &map_in, GST_MAP_READ)) {
        GST_TRACE("Input buffer size %lu B", map_in.size);

        // Get metadata
        meta = (GstZedSrcMeta *) gst_buffer_get_meta(buf, GST_ZED_SRC_META_API_TYPE);

        if (meta == NULL) {
            GST_WARNING("The ZED Stream does not contain ZED metadata");
        }

        // ----> Data buffer
        if (filter->stream_data && meta != NULL) {
#if 0
            GST_LOG (" * [META] Stream type: %d", meta->stream_type );
            GST_LOG (" * [META] Camera model: %d", meta->cam_model );
            if( meta->pose.pose_avail==TRUE )
            {
                GST_LOG (" * [META] Pos X: %g mm", meta->pose.pos[0] );
                GST_LOG (" * [META] Pos Y: %g mm", meta->pose.pos[1] );
                GST_LOG (" * [META] Pos Z: %g mm", meta->pose.pos[2] );
                GST_LOG (" * [META] Orient X: %g rad", meta->pose.orient[0] );
                GST_LOG (" * [META] Orient Y: %g rad", meta->pose.orient[1] );
                GST_LOG (" * [META] Orient Z: %g rad", meta->pose.orient[2] );
            }
            else
            {
                GST_LOG (" * [META] Positional tracking disabled" );
            }

            if( meta->sens.sens_avail==TRUE )
            {
                GST_LOG (" * [META] IMU acc X: %g m/sec²", meta->sens.imu.acc[0] );
                GST_LOG (" * [META] IMU acc Y: %g m/sec²", meta->sens.imu.acc[1] );
                GST_LOG (" * [META] IMU acc Z: %g m/sec²", meta->sens.imu.acc[2] );
                GST_LOG (" * [META] IMU gyro X: %g rad/sec", meta->sens.imu.gyro[0] );
                GST_LOG (" * [META] IMU gyro Y: %g rad/sec", meta->sens.imu.gyro[1] );
                GST_LOG (" * [META] IMU gyro Z: %g rad/sec", meta->sens.imu.gyro[2] );
                GST_LOG (" * [META] MAG X: %g uT", meta->sens.mag.mag[0] );
                GST_LOG (" * [META] MAG Y: %g uT", meta->sens.mag.mag[1] );
                GST_LOG (" * [META] MAG Z: %g uT", meta->sens.mag.mag[2] );
                GST_LOG (" * [META] Env Temp: %g °C", meta->sens.env.temp );
                GST_LOG (" * [META] Pressure: %g hPa", meta->sens.env.press );
                GST_LOG (" * [META] Temp left: %g °C", meta->sens.temp.temp_cam_left );
                GST_LOG (" * [META] Temp right: %g °C", meta->sens.temp.temp_cam_right );
            }
            else
            {
                GST_LOG (" * [META] Sensors data not available" );
            }
#endif

            gsize data_size = sizeof(GstZedSrcMeta);
            GstBuffer *data_buf = gst_buffer_new_allocate(NULL, data_size, NULL);

            if (!GST_IS_BUFFER(data_buf)) {
                GST_DEBUG("Data buffer not allocated");

                // ----> Release incoming buffer
                gst_buffer_unmap(buf, &map_in);
                // gst_buffer_unref(buf);
                //  <---- Release incoming buffer

                return GST_FLOW_ERROR;
            }

            if (gst_buffer_map(data_buf, &map_out_data, (GstMapFlags) (GST_MAP_WRITE))) {
                GST_TRACE("Copying data buffer %lu B", map_out_data.size);
                memcpy(map_out_data.data, meta, map_out_data.size);

                GST_TRACE("Data buffer set timestamp");
                GST_BUFFER_PTS(data_buf) = GST_BUFFER_PTS(buf);
                GST_BUFFER_DTS(data_buf) = GST_BUFFER_DTS(buf);
                GST_BUFFER_TIMESTAMP(data_buf) = GST_BUFFER_TIMESTAMP(buf);

                GST_TRACE("Data buffer push");
                GstFlowReturn ret_data = gst_pad_push(filter->srcpad_data, data_buf);

                if (ret_data != GST_FLOW_OK) {
                    GST_DEBUG_OBJECT(filter, "Error pushing data buffer: %s", gst_flow_get_name(ret_data));

                    // ----> Release incoming buffer
                    gst_buffer_unmap(buf, &map_in);
                    // gst_buffer_unref(buf);
                    GST_TRACE("Data buffer unmap");
                    gst_buffer_unmap(data_buf, &map_out_data);
                    // gst_buffer_unref(data_buf);
                    //  <---- Release incoming buffer
                    return ret_data;
                }

                GST_TRACE("Data buffer unmap");
                gst_buffer_unmap(data_buf, &map_out_data);
                // gst_buffer_unref(data_buf);
            } else {
                GST_ELEMENT_ERROR(pad, RESOURCE, FAILED, ("Failed to map buffer for writing"), (NULL));
                return GST_FLOW_ERROR;
            }
        }
        // <---- Data buffer

        // ----> Left buffer
        gsize left_framesize = map_in.size;
        left_framesize /= 2;

        GST_TRACE("Left buffer allocation - size %lu B", left_framesize);

        GstBuffer *left_proc_buf = gst_buffer_new_allocate(NULL, left_framesize, NULL);

        if (!GST_IS_BUFFER(left_proc_buf)) {
            GST_DEBUG("Left buffer not allocated");

            // ----> Release incoming buffer
            gst_buffer_unmap(buf, &map_in);
            // gst_buffer_unref(buf);
            //  <---- Release incoming buffer

            return GST_FLOW_ERROR;
        }

        if (gst_buffer_map(left_proc_buf, &map_out_left, (GstMapFlags) (GST_MAP_WRITE))) {
            GST_TRACE("Copying left buffer %lu B", map_out_left.size);
            memcpy(map_out_left.data, map_in.data, map_out_left.size);

            if (meta) {
                // Add metadata
                gst_buffer_add_zed_src_meta(left_proc_buf, meta->info, meta->pose, meta->sens, meta->od_enabled, meta->obj_count, meta->objects,
                                            meta->frame_id);
            }

            GST_TRACE("Left buffer set timestamp");
            GST_BUFFER_PTS(left_proc_buf) = GST_BUFFER_PTS(buf);
            GST_BUFFER_DTS(left_proc_buf) = GST_BUFFER_DTS(buf);
            GST_BUFFER_TIMESTAMP(left_proc_buf) = GST_BUFFER_TIMESTAMP(buf);

            GST_TRACE("Left buffer push");
            ret_left = gst_pad_push(filter->srcpad_left, left_proc_buf);

            if (ret_left != GST_FLOW_OK) {
                GST_DEBUG_OBJECT(filter, "Error pushing left buffer: %s", gst_flow_get_name(ret_left));

                // ----> Release incoming buffer
                gst_buffer_unmap(buf, &map_in);
                // gst_buffer_unref(buf);
                GST_TRACE("Left buffer unmap");
                gst_buffer_unmap(left_proc_buf, &map_out_left);
                // gst_buffer_unref(left_proc_buf);
                //  <---- Release incoming buffer
                return ret_left;
            }

            GST_TRACE("Left buffer unmap");
            gst_buffer_unmap(left_proc_buf, &map_out_left);
            // gst_buffer_unref(left_proc_buf);
        } else {
            GST_ELEMENT_ERROR(pad, RESOURCE, FAILED, ("Failed to map buffer for writing"), (NULL));
            return GST_FLOW_ERROR;
        }
        // <---- Left buffer

        // ----> Aux buffer
        gsize aux_framesize = map_in.size;
        aux_framesize /= 2;
        if (filter->is_depth) {
            aux_framesize /= 2;   // 16bit data
        }

        GST_TRACE("Aux buffer allocation - size %lu B", aux_framesize);
        GstBuffer *aux_proc_buf = gst_buffer_new_allocate(NULL, aux_framesize, NULL);

        if (!GST_IS_BUFFER(aux_proc_buf)) {
            GST_DEBUG("Aux buffer not allocated");

            // ----> Release incoming buffer
            gst_buffer_unmap(buf, &map_in);
            // gst_buffer_unref(buf);
            //  <---- Release incoming buffer
            return GST_FLOW_ERROR;
        }

        if (gst_buffer_map(aux_proc_buf, &map_out_aux, (GstMapFlags) (GST_MAP_WRITE))) {
            if (filter->is_depth == FALSE) {
                GST_TRACE("Copying aux buffer %lu B", map_out_aux.size);
                memcpy(map_out_aux.data, map_in.data + map_out_left.size, map_out_aux.size);
            } else {
                GST_TRACE("Converting aux buffer %lu B", map_out_aux.size);

                guint32 *gst_in_data = (guint32 *) (map_in.data + map_out_left.size);
                guint16 *gst_out_data = (guint16 *) (map_out_aux.data);

                for (unsigned long i = 0; i < map_out_aux.size / (sizeof(guint16)); i++) {
                    float depth = static_cast<float>(*(gst_in_data++));
                    *(gst_out_data++) = static_cast<guint16>(depth);

                    // printf( "#%lu: %g / %u %u \n", i, depth, *(gst_out_data-1), *(gst_in_data-1));
                }
            }

            if (meta) {
                // Add metadata
                gst_buffer_add_zed_src_meta(aux_proc_buf, meta->info, meta->pose, meta->sens, meta->od_enabled, meta->obj_count, meta->objects, meta->frame_id);
            }

            GST_TRACE("Aux buffer set timestamp");
            GST_BUFFER_PTS(aux_proc_buf) = GST_BUFFER_PTS(buf);
            GST_BUFFER_DTS(aux_proc_buf) = GST_BUFFER_DTS(buf);
            GST_BUFFER_TIMESTAMP(aux_proc_buf) = GST_BUFFER_TIMESTAMP(buf);

            GST_TRACE("Aux buffer push");

            ret_aux = gst_pad_push(filter->srcpad_aux, aux_proc_buf);

            if (ret_aux != GST_FLOW_OK) {
                GST_DEBUG_OBJECT(filter, "Error pushing aux buffer: %s", gst_flow_get_name(ret_aux));

                // ----> Release incoming buffer
                gst_buffer_unmap(buf, &map_in);
                // gst_buffer_unref(buf);
                GST_TRACE("Aux buffer unmap");
                gst_buffer_unmap(aux_proc_buf, &map_out_aux);
                // gst_buffer_unref(aux_proc_buf);
                //  <---- Release incoming buffer
                return ret_aux;
            }

            GST_TRACE("Aux buffer unmap");
            gst_buffer_unmap(aux_proc_buf, &map_out_aux);
            // gst_buffer_unref(aux_proc_buf);
        } else {
            GST_ELEMENT_ERROR(pad, RESOURCE, FAILED, ("Failed to map buffer for writing"), (NULL));
            return GST_FLOW_ERROR;
        }
        // <---- Aux buffer

        // ----> Release incoming buffer
        gst_buffer_unmap(buf, &map_in);
        gst_buffer_unref(buf);   // NOTE: required to not increase memory consumption exponentially
        // <---- Release incoming buffer
    } else {
        GST_ELEMENT_ERROR(pad, RESOURCE, FAILED, ("Failed to map buffer for reading"), (NULL));
        return GST_FLOW_ERROR;
    }
    GST_TRACE("... processed");

    if (ret_left == GST_FLOW_OK && ret_aux == GST_FLOW_OK) {
        GST_TRACE_OBJECT(filter, "Chain OK");
        GST_LOG("**************************");
        return GST_FLOW_OK;
    }

    return GST_FLOW_ERROR;
}

/* entry point to initialize the plug-in
 * initialize the plug-in itself
 * register the element factories and other features
 */
static gboolean plugin_init(GstPlugin *plugin) {
    /* debug category for fltering log messages
     *
     * exchange the string 'Template plugin' with your description
     */
    GST_DEBUG_CATEGORY_INIT(gst_zeddemux_debug, "zeddemux", 0, "debug category for zeddemux element");

    gst_element_register(plugin, "zeddemux", GST_RANK_NONE, gst_zeddemux_get_type());

    return TRUE;
}

/* gstreamer looks for this structure to register plugins
 *
 * exchange the string 'Template plugin' with your plugin description
 */
GST_PLUGIN_DEFINE(GST_VERSION_MAJOR, GST_VERSION_MINOR, zeddemux, "ZED composite stream demuxer", plugin_init, GST_PACKAGE_VERSION, GST_PACKAGE_LICENSE,
                  GST_PACKAGE_NAME, GST_PACKAGE_ORIGIN)
