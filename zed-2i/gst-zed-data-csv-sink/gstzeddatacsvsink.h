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

#ifndef _GST_ZED_DATA_CSV_SINK_H
#define _GST_ZED_DATA_CSV_SINK_H

#include <gst/gst.h>
#include <gst/base/gstbasesink.h>

#ifdef __linux__ 
#include <unistd.h>
#endif

#include <string>
#include <string.h>
#include <fstream>

G_BEGIN_DECLS

#define GST_TYPE_ZED_DATA_CSV_SINK  (gst_zeddatacsvsink_get_type())
#define GST_DATA_CSV_SINK(obj) (G_TYPE_CHECK_INSTANCE_CAST((obj),GST_TYPE_ZED_DATA_CSV_SINK,GstZedDataCsvSink))
#define GST_DATA_CSV_SINK_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST((klass),GST_TYPE_ZED_DATA_CSV_SINK,GstZedDataCsvSinkClass))
#define GST_IS_DATA_CSV_SINK(obj) (G_TYPE_CHECK_INSTANCE_TYPE((obj),GST_TYPE_ZED_DATA_CSV_SINK))
#define GST_IS_DATA_CSV_SINK_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE((klass),GST_TYPE_ZED_DATA_CSV_SINK))
#define GST_DATA_CSV_SINK_CAST(obj) ((GstZedDataCsvSink *)(obj))

typedef struct _GstZedDataCsvSink GstZedDataCsvSink;
typedef struct _GstZedDataCsvSinkClass GstZedDataCsvSinkClass;

struct _GstZedDataCsvSink
{
    GstBaseSink parent;

    std::ofstream* out_file_ptr;

    // Properties
    GString filename;
    gboolean append;
};

struct _GstZedDataCsvSinkClass {
  GstBaseSinkClass parent_class;
};

G_GNUC_INTERNAL GType gst_zeddatacsvsink_get_type (void);

G_END_DECLS

#endif // #ifndef _GST_ZED_DATA_CSV_SINK_H
