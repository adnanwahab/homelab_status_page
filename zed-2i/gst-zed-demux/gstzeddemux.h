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

#ifndef GST_ZEDDEMUX_H
#define GST_ZEDDEMUX_H
#include <gst/gst.h>
#include <gst/gstelement.h>

G_BEGIN_DECLS

#define GST_TYPE_ZEDDEMUX          (gst_zeddemux_get_type())
#define GST_ZEDDEMUX(obj)          (G_TYPE_CHECK_INSTANCE_CAST((obj), GST_TYPE_ZEDDEMUX, GstZedDemux))
#define GST_ZEDDEMUX_CLASS(klass)  (G_TYPE_CHECK_CLASS_CAST((klass), GST_TYPE_ZEDDEMUX, GstZedDemuxClass))
#define GST_IS_ZEDDEMUX(obj)       (G_TYPE_CHECK_INSTANCE_TYPE((obj), GST_TYPE_ZEDDEMUX))
#define GST_IS_ZEDDEMUX_CLASS(obj) (G_TYPE_CHECK_CLASS_TYPE((klass), GST_TYPE_ZEDDEMUX))

typedef struct _GstZedDemux GstZedDemux;
typedef struct _GstZedDemuxClass GstZedDemuxClass;

struct _GstZedDemux {
    GstElement element;

    GstPad *sinkpad;
    GstPad *srcpad_left;
    GstPad *srcpad_aux;
    GstPad *srcpad_data;

    GstCaps *caps_left;
    GstCaps *caps_aux;

    gboolean is_depth;
    gboolean stream_data;
};

struct _GstZedDemuxClass {
    GstElementClass base_zeddemux_class;
};

GType gst_zeddemux_get_type(void);

G_END_DECLS

#endif /* GST_ZEDDEMUX_H */
