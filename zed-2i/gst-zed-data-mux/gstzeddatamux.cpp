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
#include "gstzeddatamux.h"

GST_DEBUG_CATEGORY_STATIC(gst_zeddatamux_debug);
#define GST_CAT_DEFAULT gst_zeddatamux_debug

/* Filter signals and args */
enum {
    /* FILL ME */
    LAST_SIGNAL
};

enum {
    PROP_0,
};

/* the capabilities of the inputs and outputs.
 *
 * describe the real formats here.
 */
static GstStaticPadTemplate src_factory = GST_STATIC_PAD_TEMPLATE("src", GST_PAD_SRC, GST_PAD_ALWAYS,
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
                                                                                   "framerate = (fraction) { 15, 30, 60, 120 }"
                                                                                   ";"
                                                                                   "video/x-raw, "   // Depth VGA
                                                                                   "format = (string)GRAY16_LE, "
                                                                                   "width = (int)672, "
                                                                                   "height =  (int)376, "
                                                                                   "framerate = (fraction) { 15, 30, 60, 100 }"
                                                                                   ";"
                                                                                   "video/x-raw, "   // Depth HD720
                                                                                   "format = (string)GRAY16_LE, "
                                                                                   "width = (int)1280, "
                                                                                   "height =  (int)720, "
                                                                                   "framerate =  (fraction)  { 15, 30, 60}"
                                                                                   ";"
                                                                                   "video/x-raw, "   // Depth HD1080
                                                                                   "format = (string)GRAY16_LE, "
                                                                                   "width = (int)1920, "
                                                                                   "height = (int)1080, "
                                                                                   "framerate = (fraction) { 15, 30, 60 }"
                                                                                   ";"
                                                                                   "video/x-raw, "   // Depth HD2K
                                                                                   "format = (string)GRAY16_LE, "
                                                                                   "width = (int)2208, "
                                                                                   "height = (int)1242, "
                                                                                   "framerate = (fraction)15"
                                                                                   ";"
                                                                                   "video/x-raw, "   // Depth HD1200 (GMSL2)
                                                                                   "format = (string)GRAY16_LE, "
                                                                                   "width = (int)1920, "
                                                                                   "height = (int)1200, "
                                                                                   "framerate = (fraction) { 15, 30, 60 }"
                                                                                   ";"
                                                                                   "video/x-raw, "   // Depth SVGA (GMSL2)
                                                                                   "format = (string)GRAY16_LE, "
                                                                                   "width = (int)960, "
                                                                                   "height = (int)600, "
                                                                                   "framerate = (fraction) { 15, 30, 60, 120 }")));

static GstStaticPadTemplate sink_video_factory = GST_STATIC_PAD_TEMPLATE("sink_video", GST_PAD_SINK, GST_PAD_ALWAYS,
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
                                                                                          "framerate = (fraction) { 15, 30, 60, 120 }"
                                                                                          ";"
                                                                                          "video/x-raw, "   // Depth VGA
                                                                                          "format = (string)GRAY16_LE, "
                                                                                          "width = (int)672, "
                                                                                          "height =  (int)376, "
                                                                                          "framerate = (fraction) { 15, 30, 60, 100 }"
                                                                                          ";"
                                                                                          "video/x-raw, "   // Depth HD720
                                                                                          "format = (string)GRAY16_LE, "
                                                                                          "width = (int)1280, "
                                                                                          "height =  (int)720, "
                                                                                          "framerate =  (fraction)  { 15, 30, 60}"
                                                                                          ";"
                                                                                          "video/x-raw, "   // Depth HD1080
                                                                                          "format = (string)GRAY16_LE, "
                                                                                          "width = (int)1920, "
                                                                                          "height = (int)1080, "
                                                                                          "framerate = (fraction) { 15, 30, 60 }"
                                                                                          ";"
                                                                                          "video/x-raw, "   // Depth HD2K
                                                                                          "format = (string)GRAY16_LE, "
                                                                                          "width = (int)2208, "
                                                                                          "height = (int)1242, "
                                                                                          "framerate = (fraction)15"
                                                                                          ";"
                                                                                          "video/x-raw, "   // Depth HD1200 (GMSL2)
                                                                                          "format = (string)GRAY16_LE, "
                                                                                          "width = (int)1920, "
                                                                                          "height = (int)1200, "
                                                                                          "framerate = (fraction) { 15, 30, 60 }"
                                                                                          ";"
                                                                                          "video/x-raw, "   // Depth SVGA (GMSL2)
                                                                                          "format = (string)GRAY16_LE, "
                                                                                          "width = (int)960, "
                                                                                          "height = (int)600, "
                                                                                          "framerate = (fraction) { 15, 30, 60, 120 }")));

static GstStaticPadTemplate sink_data_factory = GST_STATIC_PAD_TEMPLATE("sink_data", GST_PAD_SINK, GST_PAD_ALWAYS, GST_STATIC_CAPS("application/data"));

/* class initialization */
G_DEFINE_TYPE(GstZedDataMux, gst_zeddatamux, GST_TYPE_ELEMENT);

static void gst_zeddatamux_set_property(GObject *object, guint prop_id, const GValue *value, GParamSpec *pspec);
static void gst_zeddatamux_get_property(GObject *object, guint prop_id, GValue *value, GParamSpec *pspec);

static gboolean gst_zeddatamux_sink_data_event(GstPad *pad, GstObject *parent, GstEvent *event);
static GstFlowReturn gst_zeddatamux_chain_data(GstPad *pad, GstObject *parent, GstBuffer *buf);
static gboolean gst_zeddatamux_sink_video_event(GstPad *pad, GstObject *parent, GstEvent *event);
static GstFlowReturn gst_zeddatamux_chain_video(GstPad *pad, GstObject *parent, GstBuffer *buf);

/* GObject vmethod implementations */

/* initialize the plugin's class */
static void gst_zeddatamux_class_init(GstZedDataMuxClass *klass) {
    GObjectClass *gobject_class = G_OBJECT_CLASS(klass);
    GstElementClass *gstelement_class = GST_ELEMENT_CLASS(klass);

    GST_DEBUG_OBJECT(gobject_class, "Class Init");

    gobject_class->set_property = gst_zeddatamux_set_property;
    gobject_class->get_property = gst_zeddatamux_get_property;

    gst_element_class_set_static_metadata(gstelement_class, "ZED Data Video Muxer", "Muxer/Video", "Stereolabs ZED Data Video Muxer",
                                          "Stereolabs <support@stereolabs.com>");

    gst_element_class_add_pad_template(gstelement_class, gst_static_pad_template_get(&src_factory));

    gst_element_class_add_pad_template(gstelement_class, gst_static_pad_template_get(&sink_data_factory));

    gst_element_class_add_pad_template(gstelement_class, gst_static_pad_template_get(&sink_video_factory));
}

/* initialize the new element
 * instantiate pads and add them to element
 * set pad calback functions
 * initialize instance structure
 */
static void gst_zeddatamux_init(GstZedDataMux *filter) {
    GST_DEBUG_OBJECT(filter, "Filter Init");

    filter->sinkpad_data = gst_pad_new_from_static_template(&sink_data_factory, "sink_data");
    gst_element_add_pad(GST_ELEMENT(filter), filter->sinkpad_data);

    filter->sinkpad_video = gst_pad_new_from_static_template(&sink_video_factory, "sink_video");
    gst_element_add_pad(GST_ELEMENT(filter), filter->sinkpad_video);

    filter->srcpad = gst_pad_new_from_static_template(&src_factory, "src");
    gst_element_add_pad(GST_ELEMENT(filter), filter->srcpad);

    gst_pad_set_event_function(filter->sinkpad_data, GST_DEBUG_FUNCPTR(gst_zeddatamux_sink_data_event));
    gst_pad_set_event_function(filter->sinkpad_video, GST_DEBUG_FUNCPTR(gst_zeddatamux_sink_video_event));

    gst_pad_set_chain_function(filter->sinkpad_video, GST_DEBUG_FUNCPTR(gst_zeddatamux_chain_video));
    gst_pad_set_chain_function(filter->sinkpad_data, GST_DEBUG_FUNCPTR(gst_zeddatamux_chain_data));

    filter->caps = nullptr;

    filter->last_data_ts = 0;
    filter->last_video_ts = 0;
    filter->last_video_buf = nullptr;
    filter->last_video_buf_size = 0;
    filter->last_data_buf = nullptr;
    filter->last_data_buf_size = 0;
}

static void gst_zeddatamux_set_property(GObject *object, guint prop_id, const GValue *value, GParamSpec *pspec) {
    GstZedDataMux *filter = GST_ZEDDATAMUX(object);

    GST_DEBUG_OBJECT(filter, "Set property");

    switch (prop_id) {
    default:
        G_OBJECT_WARN_INVALID_PROPERTY_ID(object, prop_id, pspec);
        break;
    }
}

static void gst_zeddatamux_get_property(GObject *object, guint prop_id, GValue *value, GParamSpec *pspec) {
    GstZedDataMux *filter = GST_ZEDDATAMUX(object);

    GST_DEBUG_OBJECT(filter, "Get property");

    switch (prop_id) {
    default:
        G_OBJECT_WARN_INVALID_PROPERTY_ID(object, prop_id, pspec);
        break;
    }
}

/* GstElement vmethod implementations */

static gboolean set_out_caps(GstZedDataMux *filter, GstCaps *sink_caps) {
    GstVideoInfo vinfo_in;
    GstVideoInfo vinfo_out;

    GST_DEBUG_OBJECT(filter, "Sink caps %" GST_PTR_FORMAT, sink_caps);

    // ----> Caps source
    if (filter->caps) {
        gst_caps_unref(filter->caps);
    }

    gst_video_info_from_caps(&vinfo_in, sink_caps);

    gst_video_info_init(&vinfo_out);
    gst_video_info_set_format(&vinfo_out, vinfo_in.finfo->format, vinfo_in.width, vinfo_in.height);
    vinfo_out.fps_d = vinfo_in.fps_d;
    vinfo_out.fps_n = vinfo_in.fps_n;
    filter->caps = gst_video_info_to_caps(&vinfo_out);

    GST_DEBUG_OBJECT(filter, "Created video caps %" GST_PTR_FORMAT, filter->caps);
    if (gst_pad_set_caps(filter->srcpad, filter->caps) == FALSE) {
        return false;
    }
    // <---- Caps source

    return TRUE;
}

/* this function handles video sink events */
static gboolean gst_zeddatamux_sink_video_event(GstPad *pad, GstObject *parent, GstEvent *event) {
    GstZedDataMux *filter;
    gboolean ret;

    filter = GST_ZEDDATAMUX(parent);

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

/* this function handles data sink events */
static gboolean gst_zeddatamux_sink_data_event(GstPad *pad, GstObject *parent, GstEvent *event) {
    GstZedDataMux *filter;
    gboolean ret;

    filter = GST_ZEDDATAMUX(parent);

    GST_LOG_OBJECT(filter, "Received %s event: %" GST_PTR_FORMAT, GST_EVENT_TYPE_NAME(event), event);

    switch (GST_EVENT_TYPE(event)) {
    case GST_EVENT_CAPS: {
        GST_DEBUG_OBJECT(filter, "Event CAPS");
        GstCaps *caps;

        gst_event_parse_caps(event, &caps);
        /* do something with the caps */

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

/* chain function for data sink
 * this function does the actual processing
 */
static GstFlowReturn gst_zeddatamux_chain_data(GstPad *pad, GstObject *parent, GstBuffer *buf) {
    GstZedDataMux *filter;
    filter = GST_ZEDDATAMUX(parent);

    GST_TRACE_OBJECT(filter, "Chain data");

    GstMapInfo map_in;
    GstMapInfo map_out;
    GstMapInfo map_store;

    GstClockTime timestamp = GST_CLOCK_TIME_NONE;
    timestamp = GST_BUFFER_TIMESTAMP(buf);
    GST_LOG("timestamp %" GST_TIME_FORMAT, GST_TIME_ARGS(timestamp));

    GST_TRACE_OBJECT(filter, "Processing data...");
    if (gst_buffer_map(buf, &map_in, GST_MAP_READ)) {
        GST_TRACE("Input buffer size %lu B", map_in.size);

        if (timestamp == filter->last_video_ts) {
            GST_TRACE("Data sync");

            if (filter->last_video_buf) {
                gsize out_buf_size = filter->last_video_buf_size;
                GstBuffer *out_buf = gst_buffer_new_allocate(NULL, out_buf_size, NULL);

                if (!GST_IS_BUFFER(out_buf)) {
                    GST_DEBUG("Out buffer not allocated");

                    // ----> Release incoming buffer
                    GST_TRACE("Input buffer unmap");
                    gst_buffer_unmap(buf, &map_in);
                    // gst_buffer_unref(buf);
                    //  <---- Release incoming buffer

                    return GST_FLOW_ERROR;
                }

                if (gst_buffer_map(out_buf, &map_out, (GstMapFlags) (GST_MAP_WRITE)) &&
                    gst_buffer_map(filter->last_video_buf, &map_store, (GstMapFlags) (GST_MAP_READ))) {
                    GST_TRACE("Copying video buffer %lu B", out_buf_size);
                    memcpy(map_out.data, map_store.data, out_buf_size);

                    GstZedSrcMeta *meta = (GstZedSrcMeta *) buf;

                    GST_TRACE("Adding metadata");
                    gst_buffer_add_zed_src_meta(out_buf, meta->info, meta->pose, meta->sens, meta->od_enabled, meta->obj_count, meta->objects, meta->frame_id);

                    // ----> Timestamp meta-data
                    GST_TRACE("Out buffer set timestamp");
                    GST_BUFFER_TIMESTAMP(out_buf) = timestamp;
                    GST_BUFFER_DTS(out_buf) = GST_BUFFER_TIMESTAMP(out_buf);
                    GST_BUFFER_OFFSET(out_buf) = GST_BUFFER_OFFSET(filter->last_video_buf);
                    // <---- Timestamp meta-data

                    GST_TRACE("Out buffer push");
                    GstFlowReturn ret = gst_pad_push(filter->srcpad, out_buf);

                    if (ret != GST_FLOW_OK) {
                        GST_DEBUG_OBJECT(filter, "Error pushing out buffer: %s", gst_flow_get_name(ret));

                        // ----> Release incoming buffer
                        GST_TRACE("Input buffer unmap");
                        gst_buffer_unmap(buf, &map_in);
                        // gst_buffer_unref(buf);
                        GST_TRACE("Out buffer unmap");
                        gst_buffer_unmap(out_buf, &map_out);
                        // gst_buffer_unref(out_buf);
                        //  <---- Release incoming buffer
                        return ret;
                    }

                    GST_TRACE("Out buffer unmap");
                    gst_buffer_unmap(out_buf, &map_out);
                    GST_TRACE("Store buffer unmap");
                    gst_buffer_unmap(filter->last_video_buf, &map_store);
                    // gst_buffer_unref(data_buf);
                }
            } else {
                GST_TRACE("No video buffer to be muxed");
            }
        } else if (timestamp > filter->last_video_ts) {
            GST_TRACE("Wait for sync");

            filter->last_data_ts = timestamp;

            if (!filter->last_data_buf) {
                GST_TRACE("Creating new stored data buffer");
                filter->last_data_buf_size = map_in.size;
                filter->last_data_buf = gst_buffer_new_allocate(NULL, filter->last_data_buf_size, NULL);
            } else if (map_in.size != filter->last_data_buf_size) {
                GST_TRACE("Resizing stored data buffer");
                filter->last_data_buf_size = map_in.size;
                gst_buffer_resize(filter->last_data_buf, 0, filter->last_data_buf_size);
            }

            if (!GST_IS_BUFFER(filter->last_data_buf)) {
                GST_DEBUG("Stored data buffer not valid");

                // ----> Release incoming buffer
                GST_TRACE("Input buffer unmap");
                gst_buffer_unmap(buf, &map_in);
                // gst_buffer_unref(buf);
                //  <---- Release incoming buffer

                return GST_FLOW_ERROR;
            }

            if (gst_buffer_map(filter->last_data_buf, &map_store, (GstMapFlags) (GST_MAP_WRITE))) {
                GST_TRACE("Storing data buffer %lu B", map_in.size);
                memcpy(map_store.data, map_in.data, map_in.size);

                GST_TRACE("Store buffer unmap");
                gst_buffer_unmap(filter->last_data_buf, &map_store);
            }
        }

        // ----> Release incoming buffer
        GST_TRACE("Input buffer unmap");
        gst_buffer_unmap(buf, &map_in);
        // <---- Release incoming buffer
    } else {
        GST_ELEMENT_ERROR(pad, RESOURCE, FAILED, ("Failed to map buffer for reading"), (NULL));
        return GST_FLOW_ERROR;
    }
    GST_TRACE("... processed");

    return GST_FLOW_OK;
}

/* chain function for video sink
 * this function does the actual processing
 */
static GstFlowReturn gst_zeddatamux_chain_video(GstPad *pad, GstObject *parent, GstBuffer *buf) {
    GstZedDataMux *filter;

    filter = GST_ZEDDATAMUX(parent);

    GST_TRACE_OBJECT(filter, "Chain video");

    GstMapInfo map_in;
    GstMapInfo map_out;
    GstMapInfo map_store;

    GstClockTime timestamp = GST_CLOCK_TIME_NONE;
    timestamp = GST_BUFFER_TIMESTAMP(buf);
    GST_LOG("timestamp %" GST_TIME_FORMAT, GST_TIME_ARGS(timestamp));

    GST_TRACE_OBJECT(filter, "Processing video...");
    if (gst_buffer_map(buf, &map_in, (GstMapFlags) (GST_MAP_READ))) {
        GST_TRACE("Input buffer size %lu B", map_in.size);

        if (timestamp == filter->last_data_ts) {
            GST_TRACE("Data sync");

            if (filter->last_data_buf) {
                gsize out_buf_size = map_in.size;
                GstBuffer *out_buf = gst_buffer_new_allocate(NULL, out_buf_size, NULL);

                if (!GST_IS_BUFFER(out_buf)) {
                    GST_DEBUG("Out buffer not allocated");

                    // ----> Release incoming buffer
                    GST_TRACE("Input buffer unmap");
                    gst_buffer_unmap(buf, &map_in);
                    // gst_buffer_unref(buf);
                    //  <---- Release incoming buffer

                    return GST_FLOW_ERROR;
                }

                if (gst_buffer_map(out_buf, &map_out, (GstMapFlags) (GST_MAP_WRITE)) &&
                    gst_buffer_map(filter->last_data_buf, &map_store, (GstMapFlags) (GST_MAP_WRITE))) {
                    GST_TRACE("Copying video buffer %lu B", map_in.size);
                    memcpy(map_out.data, map_in.data, map_in.size);

                    GstZedSrcMeta *meta = (GstZedSrcMeta *) map_store.data;

                    GST_TRACE("Adding metadata");
                    gst_buffer_add_zed_src_meta(out_buf, meta->info, meta->pose, meta->sens, meta->od_enabled, meta->obj_count, meta->objects, meta->frame_id);

                    // ----> Timestamp meta-data
                    GST_TRACE("Out buffer set timestamp");
                    GST_BUFFER_TIMESTAMP(out_buf) = timestamp;
                    GST_BUFFER_DTS(out_buf) = GST_BUFFER_TIMESTAMP(out_buf);
                    GST_BUFFER_OFFSET(out_buf) = GST_BUFFER_OFFSET(buf);
                    // <---- Timestamp meta-data

                    GST_TRACE("Out buffer push");
                    GstFlowReturn ret = gst_pad_push(filter->srcpad, out_buf);

                    if (ret != GST_FLOW_OK) {
                        GST_DEBUG_OBJECT(filter, "Error pushing out buffer: %s", gst_flow_get_name(ret));

                        // ----> Release incoming buffer
                        GST_TRACE("Input buffer unmap");
                        gst_buffer_unmap(buf, &map_in);
                        // gst_buffer_unref(buf);
                        GST_TRACE("Out buffer unmap");
                        gst_buffer_unmap(out_buf, &map_out);
                        // gst_buffer_unref(out_buf);
                        //  <---- Release incoming buffer
                        return ret;
                    }

                    GST_TRACE("Out buffer unmap");
                    gst_buffer_unmap(out_buf, &map_out);
                    GST_TRACE("Store buffer unmap");
                    gst_buffer_unmap(filter->last_data_buf, &map_store);
                    // gst_buffer_unref(data_buf);
                }
            } else {
                GST_TRACE("No data buffer to be muxed");
            }
        } else if (timestamp > filter->last_data_ts) {
            GST_TRACE("Wait for sync");

            filter->last_video_ts = timestamp;

            if (!filter->last_video_buf) {
                GST_TRACE("Creating new stored video buffer");
                filter->last_video_buf_size = map_in.size;
                filter->last_video_buf = gst_buffer_new_allocate(NULL, filter->last_video_buf_size, NULL);
            } else if (map_in.size != filter->last_video_buf_size) {
                filter->last_video_buf_size = map_in.size;
                gst_buffer_resize(filter->last_video_buf, 0, filter->last_video_buf_size);
            }

            if (!GST_IS_BUFFER(filter->last_video_buf)) {
                GST_DEBUG("Stored video buffer not valid");

                // ----> Release incoming buffer
                GST_TRACE("Input buffer unmap");
                gst_buffer_unmap(buf, &map_in);
                // gst_buffer_unref(buf);
                //  <---- Release incoming buffer

                return GST_FLOW_ERROR;
            }

            if (gst_buffer_map(filter->last_video_buf, &map_store, (GstMapFlags) (GST_MAP_WRITE))) {
                GST_TRACE("Storing video buffer %lu B", map_in.size);
                memcpy(filter->last_video_buf, map_in.data, map_in.size);

                GST_TRACE("Store buffer unmap");
                gst_buffer_unmap(filter->last_video_buf, &map_store);
            }
        }

        // ----> Release incoming buffer
        gst_buffer_unmap(buf, &map_in);
        // <---- Release incoming buffer
    } else {
        GST_ELEMENT_ERROR(pad, RESOURCE, FAILED, ("Failed to map buffer for reading"), (NULL));
        return GST_FLOW_ERROR;
    }
    GST_TRACE("... processed");

    return GST_FLOW_OK;
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
    GST_DEBUG_CATEGORY_INIT(gst_zeddatamux_debug, "zeddatamux", 0, "debug category for zeddatamux element");

    gst_element_register(plugin, "zeddatamux", GST_RANK_NONE, gst_zeddatamux_get_type());

    return TRUE;
}

/* gstreamer looks for this structure to register plugins
 *
 * exchange the string 'Template plugin' with your plugin description
 */
GST_PLUGIN_DEFINE(GST_VERSION_MAJOR, GST_VERSION_MINOR, zeddatamux, "ZED data video muxer", plugin_init, GST_PACKAGE_VERSION, GST_PACKAGE_LICENSE,
                  GST_PACKAGE_NAME, GST_PACKAGE_ORIGIN)
