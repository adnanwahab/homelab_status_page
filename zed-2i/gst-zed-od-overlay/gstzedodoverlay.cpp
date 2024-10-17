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

#include <gst-zed-meta/gstzedmeta.h>
#include <opencv2/opencv.hpp>

#include <gst/base/base.h>
#include <gst/controller/controller.h>
#include <gst/gst.h>
#include <gst/video/video.h>

#include "gstzedodoverlay.h"

GST_DEBUG_CATEGORY_STATIC(gst_zed_od_overlay_debug);
#define GST_CAT_DEFAULT gst_zed_od_overlay_debug

static void draw_objects(GstZedOdOverlay *filter, cv::Mat &image, guint8 obj_count, ZedObjectData *objs, gfloat scaleW, gfloat scaleH);
gboolean gst_zedoddisplaysink_event(GstBaseTransform *base, GstEvent *event);

/* Filter signals and args */
enum {
    /* FILL ME */
    LAST_SIGNAL
};

enum { PROP_0 };

static GstStaticPadTemplate sink_template =
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

static GstStaticPadTemplate src_template =
    GST_STATIC_PAD_TEMPLATE("src", GST_PAD_SRC, GST_PAD_ALWAYS,
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

#define gst_zed_od_overlay_parent_class parent_class
G_DEFINE_TYPE(GstZedOdOverlay, gst_zed_od_overlay, GST_TYPE_BASE_TRANSFORM);

static void gst_zed_od_overlay_set_property(GObject *object, guint prop_id, const GValue *value, GParamSpec *pspec);
static void gst_zed_od_overlay_get_property(GObject *object, guint prop_id, GValue *value, GParamSpec *pspec);

static GstFlowReturn gst_zed_od_overlay_transform_ip(GstBaseTransform *base, GstBuffer *outbuf);

/* GObject vmethod implementations */

/* initialize the plugin's class */
static void gst_zed_od_overlay_class_init(GstZedOdOverlayClass *klass) {
    GObjectClass *gobject_class;
    GstElementClass *gstelement_class;

    gobject_class = (GObjectClass *) klass;
    gstelement_class = (GstElementClass *) klass;

    gobject_class->set_property = gst_zed_od_overlay_set_property;
    gobject_class->get_property = gst_zed_od_overlay_get_property;

    gst_element_class_set_details_simple(gstelement_class, "ZedOdOverlay", "Generic/Filter", "Draws the results of ZED Object Detection module",
                                         "Stereolabs <support@stereolabs.com>");

    gst_element_class_add_pad_template(gstelement_class, gst_static_pad_template_get(&src_template));
    gst_element_class_add_pad_template(gstelement_class, gst_static_pad_template_get(&sink_template));

    GST_BASE_TRANSFORM_CLASS(klass)->transform_ip = GST_DEBUG_FUNCPTR(gst_zed_od_overlay_transform_ip);

    GST_BASE_TRANSFORM_CLASS(klass)->sink_event = GST_DEBUG_FUNCPTR(gst_zedoddisplaysink_event);

    // debug category for filtering log messages
    GST_DEBUG_CATEGORY_INIT(gst_zed_od_overlay_debug, "zedodoverlay", 0, "Zed Object Detection Overlay");
}

/* initialize the new element
 * initialize instance structure
 */
static void gst_zed_od_overlay_init(GstZedOdOverlay *filter) {
    filter->img_left_w = 0;
    filter->img_left_h = 0;
}

static void gst_zed_od_overlay_set_property(GObject *object, guint prop_id, const GValue *value, GParamSpec *pspec) {
    GstZedOdOverlay *filter = GST_ZED_OD_OVERLAY(object);

    switch (prop_id) {
    default:
        G_OBJECT_WARN_INVALID_PROPERTY_ID(object, prop_id, pspec);
        break;
    }
}

static void gst_zed_od_overlay_get_property(GObject *object, guint prop_id, GValue *value, GParamSpec *pspec) {
    GstZedOdOverlay *filter = GST_ZED_OD_OVERLAY(object);

    switch (prop_id) {
    default:
        G_OBJECT_WARN_INVALID_PROPERTY_ID(object, prop_id, pspec);
        break;
    }
}

/* GstBaseTransform vmethod implementations */
gboolean gst_zedoddisplaysink_event(GstBaseTransform *base, GstEvent *event) {
    GstEventType type;
    GstZedOdOverlay *filter = GST_ZED_OD_OVERLAY(base);

    type = GST_EVENT_TYPE(event);

    GST_TRACE_OBJECT(filter, "Event %d [%d]", type, GST_EVENT_CAPS);

    switch (type) {
    case GST_EVENT_EOS:
        break;
    case GST_EVENT_CAPS: {
        GST_DEBUG_OBJECT(filter, "Event CAPS");
        GstCaps *caps;

        gst_event_parse_caps(event, &caps);

        GstVideoInfo vinfo_in;
        gst_video_info_from_caps(&vinfo_in, caps);
        filter->img_left_w = vinfo_in.width;
        filter->img_left_h = vinfo_in.height;
        if (vinfo_in.height == 752 || vinfo_in.height == 1440 || vinfo_in.height == 2160 || vinfo_in.height == 2484) {
            filter->img_left_h /= 2;   // Only half buffer size if the stream is composite
        }

        break;
    }
    default:
        break;
    }

    return GST_BASE_TRANSFORM_CLASS(parent_class)->sink_event(base, event);
}

/* this function does the actual processing
 */
static GstFlowReturn gst_zed_od_overlay_transform_ip(GstBaseTransform *base, GstBuffer *outbuf) {
    GstZedOdOverlay *filter = GST_ZED_OD_OVERLAY(base);
    GST_TRACE_OBJECT(filter, "transform_ip");

    GstMapInfo map_buf;

    if (GST_CLOCK_TIME_IS_VALID(GST_BUFFER_TIMESTAMP(outbuf)))
        gst_object_sync_values(GST_OBJECT(filter), GST_BUFFER_TIMESTAMP(outbuf));

    if (FALSE == gst_buffer_map(outbuf, &map_buf, GstMapFlags(GST_MAP_READ | GST_MAP_WRITE))) {
        GST_WARNING_OBJECT(filter, "Could not map buffer for write/read");
        return GST_FLOW_OK;
    }

    // Get left image (upper half memory buffer)
    cv::Mat ocv_left = cv::Mat(filter->img_left_h, filter->img_left_w, CV_8UC4, map_buf.data);

    // Metadata
    GstZedSrcMeta *meta = (GstZedSrcMeta *) gst_buffer_get_meta(outbuf, GST_ZED_SRC_META_API_TYPE);

    if (meta == NULL)   // Metadata not found
    {
        GST_ELEMENT_ERROR(filter, RESOURCE, FAILED, ("No ZED metadata [GstZedSrcMeta] found in the stream'"), (NULL));
        return GST_FLOW_ERROR;
    }

    GST_LOG_OBJECT(filter, "Cam. Model: %d", meta->info.cam_model);
    GST_LOG_OBJECT(filter, "Stream type: %d", meta->info.stream_type);
    GST_LOG_OBJECT(filter, "Grab frame Size: %d x %d", meta->info.grab_single_frame_width, meta->info.grab_single_frame_height);
    GST_LOG_OBJECT(filter, "Filter frame Size: %d x %d", filter->img_left_w, filter->img_left_h);

    gboolean rescaled = FALSE;
    gfloat scaleW = 1.0f;
    gfloat scaleH = 1.0f;
    if (meta->info.grab_single_frame_width != filter->img_left_w || meta->info.grab_single_frame_height != filter->img_left_h) {
        rescaled = TRUE;
        scaleW = ((gfloat) filter->img_left_w) / meta->info.grab_single_frame_width;
        scaleH = ((gfloat) filter->img_left_h) / meta->info.grab_single_frame_height;
    }

    if (meta->od_enabled) {
        GST_LOG_OBJECT(filter, "Detected %d objects", meta->obj_count);
        // Draw 2D detections
        draw_objects(filter, ocv_left, meta->obj_count, meta->objects, scaleW, scaleH);
    }

    GST_TRACE("Buffer unmap");
    gst_buffer_unmap(outbuf, &map_buf);

    return GST_FLOW_OK;
}

/* entry point to initialize the plug-in
 * initialize the plug-in itself
 * register the element factories and other features
 */
static gboolean plugin_init(GstPlugin *plugin) { return gst_element_register(plugin, "zedodoverlay", GST_RANK_NONE, GST_TYPE_ZED_OD_OVERLAY); }

GST_PLUGIN_DEFINE(GST_VERSION_MAJOR, GST_VERSION_MINOR, zedodoverlay, "ZED Object Detection Overlay", plugin_init, GST_PACKAGE_VERSION, GST_PACKAGE_LICENSE,
                  GST_PACKAGE_NAME, GST_PACKAGE_ORIGIN)

static void draw_objects(GstZedOdOverlay *filter, cv::Mat &image, guint8 obj_count, ZedObjectData *objs, gfloat scaleW, gfloat scaleH) {
    for (int i = 0; i < obj_count; i++) {
        cv::Scalar color = cv::Scalar::all(125);
        if (objs[i].id >= 0) {
            color = cv::Scalar((objs[i].id * 232 + 232) % 255, (objs[i].id * 176 + 176) % 255, (objs[i].id * 59 + 59) % 255);
        }

        cv::Rect roi_render(0, 0, image.size().width, image.size().height);

        GST_LOG_OBJECT(filter,"Object: %d", i);
        GST_LOG_OBJECT(filter," * Id: %d [%d]", (int) objs[i].label, (int) objs[i].sublabel);
        GST_LOG_OBJECT(filter," * Pos: %g,%g,%g", objs[i].position[0], objs[i].position[1], objs[i].position[2]);

        if (objs[i].skeletons_avail == FALSE) {
            GST_LOG_OBJECT(filter,"Scale: %g, %g", scaleW, scaleH);

            // ----> Bounding box

            cv::Point2f tl;
            tl.x = objs[i].bounding_box_2d[0][0] * scaleW;
            tl.y = objs[i].bounding_box_2d[0][1] * scaleH;
            cv::Point2f br;
            br.x = objs[i].bounding_box_2d[2][0] * scaleW;
            br.y = objs[i].bounding_box_2d[2][1] * scaleH;
            cv::rectangle(image, tl, br, color, 3);

            // <---- Bounding box

            // ----> Text info
            int baseline = 0;
            int font_face = cv::FONT_HERSHEY_COMPLEX_SMALL;
            double font_scale = 0.75;

            std::stringstream txt_info;
            txt_info << "Id: " << objs[i].id << " - ";

            switch (objs[i].label) {
            case OBJECT_CLASS::PERSON:
                txt_info << "PERSON";
                break;
            case OBJECT_CLASS::VEHICLE:
                txt_info << "VEHICLE";
                break;
            case OBJECT_CLASS::ANIMAL:
                txt_info << "ANIMAL";
                break;
            case OBJECT_CLASS::BAG:
                txt_info << "BAG";
                break;
            case OBJECT_CLASS::ELECTRONICS:
                txt_info << "ELECTRONICS";
                break;
            case OBJECT_CLASS::FRUIT_VEGETABLE:
                txt_info << "FRUIT_VEGETABLE";
                break;
            case OBJECT_CLASS::LAST:
            default:
                txt_info << "UNDEFINED";
                break;
            }

            if (!objs[i].skeletons_avail) {
                switch (objs[i].sublabel) {
                case OBJECT_SUBCLASS::PERSON:
                    // txt_info << " [Person]";
                    break;
                case OBJECT_SUBCLASS::BICYCLE:
                    txt_info << " [Bicycle]";
                    break;
                case OBJECT_SUBCLASS::CAR:
                    txt_info << " [Car]";
                    break;
                case OBJECT_SUBCLASS::MOTORBIKE:
                    txt_info << " [Motorbike]";
                    break;
                case OBJECT_SUBCLASS::BUS:
                    txt_info << " [Bus]";
                    break;
                case OBJECT_SUBCLASS::TRUCK:
                    txt_info << " [Truck]";
                    break;
                case OBJECT_SUBCLASS::BOAT:
                    txt_info << " [Boat]";
                    break;
                case OBJECT_SUBCLASS::BACKPACK:
                    txt_info << " [Backpack]";
                    break;
                case OBJECT_SUBCLASS::HANDBAG:
                    txt_info << " [Handbag]";
                    break;
                case OBJECT_SUBCLASS::SUITCASE:
                    txt_info << " [Suitcase]";
                    break;
                case OBJECT_SUBCLASS::BIRD:
                    txt_info << " [Bird]";
                    break;
                case OBJECT_SUBCLASS::CAT:
                    txt_info << " [Cat]";
                    break;
                case OBJECT_SUBCLASS::DOG:
                    txt_info << " [Dog]";
                    break;
                case OBJECT_SUBCLASS::HORSE:
                    txt_info << " [Horse]";
                    break;
                case OBJECT_SUBCLASS::SHEEP:
                    txt_info << " [Sheep]";
                    break;
                case OBJECT_SUBCLASS::COW:
                    txt_info << " [Cow]";
                    break;
                case OBJECT_SUBCLASS::CELLPHONE:
                    txt_info << " [CellPhone]";
                    break;
                case OBJECT_SUBCLASS::LAPTOP:
                    txt_info << " [Laptop]";
                    break;
                case OBJECT_SUBCLASS::BANANA:
                    txt_info << " [Banana]";
                    break;
                case OBJECT_SUBCLASS::APPLE:
                    txt_info << " [Apple]";
                    break;
                case OBJECT_SUBCLASS::ORANGE:
                    txt_info << " [Orange]";
                    break;
                case OBJECT_SUBCLASS::CARROT:
                    txt_info << " [Carrot]";
                    break;
                default:
                    txt_info << " [-]";
                    break;
                }
            }

            cv::Size txt_size = cv::getTextSize(txt_info.str(), font_face, font_scale, 1, &baseline);

            int offset = 5;

            cv::Point txt_tl;
            cv::Point txt_br;
            cv::Point txt_pos;

            txt_tl.x = tl.x;
            txt_tl.y = tl.y - (txt_size.height + 2 * offset);

            txt_br.x = tl.x + (txt_size.width + 2 * offset);
            txt_br.y = tl.y;

            txt_pos.x = txt_tl.x + offset;
            txt_pos.y = txt_br.y - offset;

            if (!roi_render.contains(txt_tl)) {
                txt_tl.y = tl.y + (txt_size.height + 2 * baseline);
                txt_pos.y = txt_tl.y - offset;
            }

            cv::rectangle(image, txt_tl, txt_br, color, 1);
            cv::putText(image, txt_info.str(), txt_pos, font_face, font_scale, color, 1, cv::LINE_AA);

            if (!std::isnan(objs[i].position[0]) && !std::isnan(objs[i].position[1]) && !std::isnan(objs[i].position[2])) {
                float dist =
                    sqrtf(objs[i].position[0] * objs[i].position[0] + objs[i].position[1] * objs[i].position[1] + objs[i].position[2] * objs[i].position[2]);
                char text[64];
                sprintf(text, "%.2fm", abs(dist / 1000.0f));
                putText(image, text, cv::Point2i(tl.x + (br.x - tl.x) / 2 - 20, tl.y + (br.y - tl.y) / 2 - 12), cv::FONT_HERSHEY_COMPLEX_SMALL, 0.75, color, 1);
            }
            // <---- Text info
        } else {
            GST_LOG_OBJECT(filter,"Scale: %g, %g", scaleW, scaleH);
            GST_LOG_OBJECT(filter,"Format: %d", objs[i].skel_format);
            // ----> Skeletons
            {
                switch (objs[i].skel_format) {
                case 18:
                    // ----> Bones
                    for (const auto &parts : skeleton::BODY_18_BONES) {
                        if (objs[i].keypoint_2d[skeleton::getIdx_18(parts.first)][0] >= 0 && objs[i].keypoint_2d[skeleton::getIdx_18(parts.first)][1] >= 0 &&
                            objs[i].keypoint_2d[skeleton::getIdx_18(parts.second)][0] >= 0 && objs[i].keypoint_2d[skeleton::getIdx_18(parts.second)][1] >= 0) {
                            cv::Point2f kp_a;
                            kp_a.x = objs[i].keypoint_2d[skeleton::getIdx_18(parts.first)][0] * scaleW;
                            kp_a.y = objs[i].keypoint_2d[skeleton::getIdx_18(parts.first)][1] * scaleH;
                            GST_LOG_OBJECT(filter,"kp_a: %g, %g", kp_a.x, kp_a.y);

                            cv::Point2f kp_b;
                            kp_b.x = objs[i].keypoint_2d[skeleton::getIdx_18(parts.second)][0] * scaleW;
                            kp_b.y = objs[i].keypoint_2d[skeleton::getIdx_18(parts.second)][1] * scaleH;
                            GST_LOG_OBJECT(filter,"kp_b: %g, %g", kp_b.x, kp_b.y);

                            if (roi_render.contains(kp_a) && roi_render.contains(kp_b))
                                cv::line(image, kp_a, kp_b, color, 1, cv::LINE_AA);
                        }
                    }
                    // <---- Bones
                    // ----> Joints
                    for (int j = 0; j < 18; j++) {
                        if (objs[i].keypoint_2d[j][0] >= 0 && objs[i].keypoint_2d[j][1] >= 0) {
                            cv::Point2f cv_kp;
                            cv_kp.x = objs[i].keypoint_2d[j][0] * scaleW;
                            cv_kp.y = objs[i].keypoint_2d[j][1] * scaleH;
                            if (roi_render.contains(cv_kp)) {
                                cv::circle(image, cv_kp, 3, color + cv::Scalar(50, 50, 50), -1, cv::LINE_AA);
                            }
                        }
                    }
                    // <---- Joints
                    break;
                case 34:
                    // ----> Bones
                    for (const auto &parts : skeleton::BODY_34_BONES) {
                        if (objs[i].keypoint_2d[skeleton::getIdx_34(parts.first)][0] >= 0 && objs[i].keypoint_2d[skeleton::getIdx_34(parts.first)][1] >= 0 &&
                            objs[i].keypoint_2d[skeleton::getIdx_34(parts.second)][0] >= 0 && objs[i].keypoint_2d[skeleton::getIdx_34(parts.second)][1] >= 0) {
                            cv::Point2f kp_a;
                            kp_a.x = objs[i].keypoint_2d[skeleton::getIdx_34(parts.first)][0] * scaleW;
                            kp_a.y = objs[i].keypoint_2d[skeleton::getIdx_34(parts.first)][1] * scaleH;
                            GST_LOG_OBJECT(filter,"kp_a: %g, %g", kp_a.x, kp_a.y);

                            cv::Point2f kp_b;
                            kp_b.x = objs[i].keypoint_2d[skeleton::getIdx_34(parts.second)][0] * scaleW;
                            kp_b.y = objs[i].keypoint_2d[skeleton::getIdx_34(parts.second)][1] * scaleH;
                            GST_LOG_OBJECT(filter,"kp_b: %g, %g", kp_b.x, kp_b.y);

                            if (roi_render.contains(kp_a) && roi_render.contains(kp_b))
                                cv::line(image, kp_a, kp_b, color, 1, cv::LINE_AA);
                        }
                    }
                    // <---- Bones
                    // ----> Joints
                    for (int j = 0; j < 34; j++) {
                        if (objs[i].keypoint_2d[j][0] >= 0 && objs[i].keypoint_2d[j][1] >= 0) {
                            cv::Point2f cv_kp;
                            cv_kp.x = objs[i].keypoint_2d[j][0] * scaleW;
                            cv_kp.y = objs[i].keypoint_2d[j][1] * scaleH;
                            if (roi_render.contains(cv_kp)) {
                                cv::circle(image, cv_kp, 3, color + cv::Scalar(50, 50, 50), -1, cv::LINE_AA);
                            }
                        }
                    }
                    // <---- Joints
                    break;
                case 38:
                    // ----> Bones
                    for (const auto &parts : skeleton::BODY_38_BONES) {
                        if (objs[i].keypoint_2d[skeleton::getIdx_38(parts.first)][0] >= 0 && objs[i].keypoint_2d[skeleton::getIdx_38(parts.first)][1] >= 0 &&
                            objs[i].keypoint_2d[skeleton::getIdx_38(parts.second)][0] >= 0 && objs[i].keypoint_2d[skeleton::getIdx_38(parts.second)][1] >= 0) {
                            cv::Point2f kp_a;
                            kp_a.x = objs[i].keypoint_2d[skeleton::getIdx_38(parts.first)][0] * scaleW;
                            kp_a.y = objs[i].keypoint_2d[skeleton::getIdx_38(parts.first)][1] * scaleH;
                            GST_LOG_OBJECT(filter,"kp_a: %g, %g", kp_a.x, kp_a.y);

                            cv::Point2f kp_b;
                            kp_b.x = objs[i].keypoint_2d[skeleton::getIdx_38(parts.second)][0] * scaleW;
                            kp_b.y = objs[i].keypoint_2d[skeleton::getIdx_38(parts.second)][1] * scaleH;
                            GST_LOG_OBJECT(filter,"kp_b: %g, %g", kp_b.x, kp_b.y);

                            if (roi_render.contains(kp_a) && roi_render.contains(kp_b))
                                cv::line(image, kp_a, kp_b, color, 1, cv::LINE_AA);
                        }
                    }
                    // <---- Bones
                    // ----> Joints
                    for (int j = 0; j < 38; j++) {
                        if (objs[i].keypoint_2d[j][0] >= 0 && objs[i].keypoint_2d[j][1] >= 0) {
                            cv::Point2f cv_kp;
                            cv_kp.x = objs[i].keypoint_2d[j][0] * scaleW;
                            cv_kp.y = objs[i].keypoint_2d[j][1] * scaleH;
                            if (roi_render.contains(cv_kp)) {
                                cv::circle(image, cv_kp, 3, color + cv::Scalar(50, 50, 50), -1, cv::LINE_AA);
                            }
                        }
                    }
                    // <---- Joints
                    break;
                case 70:
                    // ----> Bones
                    for (const auto &parts : skeleton::BODY_70_BONES) {
                        if (objs[i].keypoint_2d[skeleton::getIdx_70(parts.first)][0] >= 0 && objs[i].keypoint_2d[skeleton::getIdx_70(parts.first)][1] >= 0 &&
                            objs[i].keypoint_2d[skeleton::getIdx_70(parts.second)][0] >= 0 && objs[i].keypoint_2d[skeleton::getIdx_70(parts.second)][1] >= 0) {
                            cv::Point2f kp_a;
                            kp_a.x = objs[i].keypoint_2d[skeleton::getIdx_70(parts.first)][0] * scaleW;
                            kp_a.y = objs[i].keypoint_2d[skeleton::getIdx_70(parts.first)][1] * scaleH;
                            GST_LOG_OBJECT(filter,"kp_a: %g, %g", kp_a.x, kp_a.y);

                            cv::Point2f kp_b;
                            kp_b.x = objs[i].keypoint_2d[skeleton::getIdx_70(parts.second)][0] * scaleW;
                            kp_b.y = objs[i].keypoint_2d[skeleton::getIdx_70(parts.second)][1] * scaleH;
                            GST_LOG_OBJECT(filter,"kp_b: %g, %g", kp_b.x, kp_b.y);

                            if (roi_render.contains(kp_a) && roi_render.contains(kp_b))
                                cv::line(image, kp_a, kp_b, color, 1, cv::LINE_AA);
                        }
                    }
                    // <---- Bones
                    // ----> Joints
                    for (int j = 0; j < 70; j++) {
                        if (objs[i].keypoint_2d[j][0] >= 0 && objs[i].keypoint_2d[j][1] >= 0) {
                            cv::Point2f cv_kp;
                            cv_kp.x = objs[i].keypoint_2d[j][0] * scaleW;
                            cv_kp.y = objs[i].keypoint_2d[j][1] * scaleH;
                            GST_LOG_OBJECT(filter,"Joint: %g, %g", cv_kp.x, cv_kp.y);

                            if (roi_render.contains(cv_kp)) {
                                cv::circle(image, cv_kp, 3, color + cv::Scalar(50, 50, 50), -1, cv::LINE_AA);
                            }
                        }
                    }
                    // <---- Joints
                    break;
                default:
                    GST_ELEMENT_ERROR(filter, RESOURCE, FAILED, ("Wrong skeleton model format: %d",objs[i].skel_format), (NULL));
                }
            }
            // <---- Skeletons
        }
    }
}
