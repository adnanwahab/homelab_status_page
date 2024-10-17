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

#ifndef GST_ZEDDATAMUX_H
#define GST_ZEDDATAMUX_H
#include <gst/gst.h>
#include <gst/gstelement.h>

G_BEGIN_DECLS

#define GST_TYPE_ZEDDATAMUX          (gst_zeddatamux_get_type())
#define GST_ZEDDATAMUX(obj)          (G_TYPE_CHECK_INSTANCE_CAST((obj), GST_TYPE_ZEDDATAMUX, GstZedDataMux))
#define GST_ZEDDATAMUX_CLASS(klass)  (G_TYPE_CHECK_CLASS_CAST((klass), GST_TYPE_ZEDDATAMUX, GstZedDataMuxClass))
#define GST_IS_ZEDDATAMUX(obj)       (G_TYPE_CHECK_INSTANCE_TYPE((obj), GST_TYPE_ZEDDATAMUX))
#define GST_IS_ZEDDATAMUX_CLASS(obj) (G_TYPE_CHECK_CLASS_TYPE((klass), GST_TYPE_ZEDDATAMUX))

typedef struct _GstZedDataMux GstZedDataMux;
typedef struct _GstZedDataMuxClass GstZedDataMuxClass;

struct _GstZedDataMux {
    GstElement element;

    GstPad *sinkpad_video;
    GstPad *sinkpad_data;
    GstPad *srcpad;

    GstCaps *caps;

    GstClockTime last_data_ts;
    GstClockTime last_video_ts;

    GstBuffer *last_video_buf;
    gsize last_video_buf_size;
    GstBuffer *last_data_buf;
    gsize last_data_buf_size;
};

struct _GstZedDataMuxClass {
    GstElementClass base_zeddatamux_class;
};

GType gst_zeddatamux_get_type(void);

G_END_DECLS

#endif /* GST_ZEDDATAMUX_H */
