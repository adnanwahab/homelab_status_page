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

#include "gstzedmeta.h"
#include <gst/gstbuffer.h>
#include <gst/video/gstvideofilter.h>
#include <gst/video/gstvideometa.h>
#include <gst/video/video.h>

#ifndef GST_DISABLE_GST_DEBUG
#define GST_CAT_DEFAULT ensure_debug_category()
static GstDebugCategory *ensure_debug_category(void) {
    static gsize cat_gonce = 0;

    if (g_once_init_enter(&cat_gonce)) {
        gsize cat_done;

        cat_done = (gsize) _gst_debug_category_new("zedsrcmeta", 0, "zedsrcmeta");

        g_once_init_leave(&cat_gonce, cat_done);
    }

    return (GstDebugCategory *) cat_gonce;
}
#else
#define ensure_debug_category() /* NOOP */
#endif                          /* GST_DISABLE_GST_DEBUG */

GType gst_zed_src_meta_api_get_type() {
    GST_TRACE("gst_zed_src_meta_api_get_type");

    static GType type;

    static const gchar *tags[] = {/*GST_META_TAG_VIDEO_STR, GST_META_TAG_VIDEO_SIZE_STR,
                                    GST_META_TAG_VIDEO_ORIENTATION_STR,*/
                                  NULL};

    if (g_once_init_enter(&type)) {
        GType _type = gst_meta_api_type_register("GstZedSrcMetaAPI", tags);

        g_once_init_leave(&type, _type);
    }

    return type;
}

static gboolean gst_zed_src_meta_init(GstMeta *meta, gpointer params, GstBuffer *buffer) {
    GST_TRACE("gst_zed_src_meta_init");

    GstZedSrcMeta *emeta = (GstZedSrcMeta *) meta;

    emeta->info.cam_model = 0;
    emeta->info.stream_type = 0;
    emeta->info.grab_single_frame_width = 0;
    emeta->info.grab_single_frame_height = 0;

    emeta->pose.pose_avail = FALSE;
    emeta->pose.pos[0] = 0.0;
    emeta->pose.pos[1] = 0.0;
    emeta->pose.pos[2] = 0.0;
    emeta->pose.orient[0] = 0.0;
    emeta->pose.orient[1] = 0.0;
    emeta->pose.orient[2] = 0.0;
    return true;
}

static gboolean gst_zed_src_meta_transform(GstBuffer *transbuf, GstMeta *meta, GstBuffer *buffer, GQuark type, gpointer data) {
    GST_TRACE("gst_zed_src_meta_transform [%u]", type);

    GstZedSrcMeta *emeta = (GstZedSrcMeta *) meta;

    // ----> Scale transformation
    // TODO understand how `videoscale` filter handleds this part because there is something weird with
    //      metadata tags handling
    //    if( GST_VIDEO_META_TRANSFORM_IS_SCALE(type) )
    //    {
    //        if(emeta->od_enabled==TRUE && emeta->obj_count>0)
    //        {
    //            GstVideoMetaTransform* transf = (GstVideoMetaTransform*)data;
    //            gint in_w = transf->in_info->width;
    //            gint in_h = transf->in_info->height;
    //            gint out_w = transf->out_info->width;
    //            gint out_h = transf->out_info->height;

    //            GST_DEBUG(  "Transform scale: [%dx%d] -> [%d,x%d]", in_w,in_h, out_w,out_h );
    //        }
    //    }
    // <---- Scale transformation

    if (GST_META_TRANSFORM_IS_COPY(type)) {
        GST_DEBUG("Transform copy");
    }

    gst_buffer_add_zed_src_meta(transbuf, emeta->info, emeta->pose, emeta->sens, emeta->od_enabled, emeta->obj_count, emeta->objects, emeta->frame_id);

    return TRUE;
}

static void gst_zed_src_meta_free(GstMeta *meta, GstBuffer *buffer) {
    GST_TRACE("gst_zed_src_meta_free");

    GstZedSrcMeta *emeta = (GstZedSrcMeta *) meta;
}

const GstMetaInfo *gst_zed_src_meta_get_info(void) {
    GST_TRACE("gst_zed_src_meta_get_info");

    static const GstMetaInfo *meta_info = NULL;

    if (g_once_init_enter(&meta_info)) {
        const GstMetaInfo *mi = gst_meta_register(GST_ZED_SRC_META_API_TYPE, "GstZedSrcMeta", sizeof(GstZedSrcMeta), gst_zed_src_meta_init,
                                                  gst_zed_src_meta_free, gst_zed_src_meta_transform);
        g_once_init_leave(&meta_info, mi);
    }

    return meta_info;
}

GstZedSrcMeta *gst_buffer_add_zed_src_meta(GstBuffer *buffer, ZedInfo &info, ZedPose &pose, ZedSensors &sens, gboolean od_enabled, guint8 obj_count,
                                           ZedObjectData *objects, guint64 frame_id) {
    GST_TRACE("gst_buffer_add_zed_src_meta");

    GST_DEBUG("Add GstZedSrcMeta");

    GstZedSrcMeta *meta;

    g_return_val_if_fail(GST_IS_BUFFER(buffer), NULL);

    meta = (GstZedSrcMeta *) gst_buffer_add_meta(buffer, GST_ZED_SRC_META_INFO, NULL);

    memcpy(&meta->info, &info, sizeof(ZedInfo));
    memcpy(&meta->pose, &pose, sizeof(ZedPose));
    memcpy(&meta->sens, &sens, sizeof(ZedSensors));

    meta->od_enabled = od_enabled;
    meta->obj_count = obj_count;

    memcpy(&meta->objects, objects, obj_count * sizeof(ZedObjectData));

    meta->frame_id = frame_id;

    return meta;
}
