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

#include "gstzeddatacsvsink.h"

#include <string>
#include <iomanip>
#include <gst/gstformat.h>

#include "gst-zed-meta/gstzedmeta.h"

static GstStaticPadTemplate sink_factory = GST_STATIC_PAD_TEMPLATE ("sink",
                                                                    GST_PAD_SINK,
                                                                    GST_PAD_ALWAYS,
                                                                    GST_STATIC_CAPS ("application/data"));

GST_DEBUG_CATEGORY_STATIC (gst_zeddatacsvsink_debug);
#define GST_CAT_DEFAULT gst_zeddatacsvsink_debug

#define DEFAULT_PROP_LOCATION   ""
#define DEFAULT_PROP_APPEND     FALSE

#define CSV_SEP ","

enum
{
    PROP_0,
    PROP_LOCATION,
    PROP_APPEND,
    PROP_LAST
};

static void gst_zeddatacsvsink_dispose(GObject * object);

static void gst_zeddatacsvsink_set_property (GObject * object, guint prop_id,
                                             const GValue * value, GParamSpec * pspec);
static void gst_zeddatacsvsink_get_property (GObject * object, guint prop_id,
                                             GValue * value, GParamSpec * pspec);

static gboolean gst_zeddatacsvsink_open_file(GstZedDataCsvSink* sink);
static void gst_zeddatacsvsink_close_file(GstZedDataCsvSink* sink);

static gboolean gst_zeddatacsvsink_start (GstBaseSink * sink);
static gboolean gst_zeddatacsvsink_stop (GstBaseSink * sink);

static gboolean gst_zeddatacsvsink_event (GstBaseSink * sink, GstEvent * event);
static GstFlowReturn gst_zeddatacsvsink_render (GstBaseSink * sink, GstBuffer * buffer);

G_DEFINE_TYPE( GstZedDataCsvSink, gst_zeddatacsvsink, GST_TYPE_BASE_SINK );

static void gst_zeddatacsvsink_class_init (GstZedDataCsvSinkClass * klass)
{
    GObjectClass *gobject_class = G_OBJECT_CLASS (klass);
    GstElementClass *gstelement_class = GST_ELEMENT_CLASS (klass);
    GstBaseSinkClass *gstbasesink_class = GST_BASE_SINK_CLASS (klass);

    gobject_class->dispose = gst_zeddatacsvsink_dispose;

    gobject_class->set_property = gst_zeddatacsvsink_set_property;
    gobject_class->get_property = gst_zeddatacsvsink_get_property;

    g_object_class_install_property (gobject_class, PROP_LOCATION,
                                     g_param_spec_string ("location", "CSVFile Location",
                                                          "Location of the CSV file to write", DEFAULT_PROP_LOCATION,
                                                          (GParamFlags) (G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property( gobject_class, PROP_APPEND,
                                     g_param_spec_boolean("append", "CSV append",
                                                          "Append to an already existing CSV file",
                                                          DEFAULT_PROP_APPEND,
                                                          (GParamFlags) (G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    gst_element_class_set_static_metadata (gstelement_class,
                                           "ZED CSV File Sink",
                                           "Sink/File", "Write data stream to a file",
                                           "Stereolabs <support@stereolabs.com>");
    gst_element_class_add_static_pad_template (gstelement_class, &sink_factory);

    gstbasesink_class->start = GST_DEBUG_FUNCPTR (gst_zeddatacsvsink_start);
    gstbasesink_class->stop = GST_DEBUG_FUNCPTR (gst_zeddatacsvsink_stop);
    gstbasesink_class->render = GST_DEBUG_FUNCPTR (gst_zeddatacsvsink_render);
    gstbasesink_class->event = GST_DEBUG_FUNCPTR (gst_zeddatacsvsink_event);
}

static void gst_zeddatacsvsink_init(GstZedDataCsvSink * csvsink)
{
    GST_TRACE_OBJECT( csvsink, "Init" );

    csvsink->filename = *g_string_new( DEFAULT_PROP_LOCATION );
    csvsink->append = DEFAULT_PROP_APPEND;

    csvsink->out_file_ptr = NULL;

    gst_base_sink_set_sync(GST_BASE_SINK(csvsink), FALSE);
}

static void gst_zeddatacsvsink_dispose (GObject * object)
{
    GstZedDataCsvSink* sink = GST_DATA_CSV_SINK(object);

    GST_TRACE_OBJECT( sink, "Dispose" );

    if(sink->out_file_ptr)
    {
        delete sink->out_file_ptr;
        sink->out_file_ptr = NULL;
    }

    G_OBJECT_CLASS(gst_zeddatacsvsink_parent_class)->dispose(object);
}

void gst_zeddatacsvsink_set_property (GObject * object, guint prop_id,
                                      const GValue * value, GParamSpec * pspec)
{
    GstZedDataCsvSink* sink = GST_DATA_CSV_SINK(object);

    GST_TRACE_OBJECT( sink, "Set property" );

    const gchar* str;

    switch (prop_id) {
    case PROP_LOCATION:
        str = g_value_get_string(value);
        sink->filename = *g_string_new( str );
        break;
    case PROP_APPEND:
        sink->append = g_value_get_boolean (value);
        break;
    default:
        G_OBJECT_WARN_INVALID_PROPERTY_ID (object, prop_id, pspec);
        break;
    }
}

void gst_zeddatacsvsink_get_property (GObject * object, guint prop_id,
                                      GValue * value, GParamSpec * pspec)
{
    GstZedDataCsvSink* sink = GST_DATA_CSV_SINK(object);

    GST_TRACE_OBJECT( sink, "Get property" );

    switch (prop_id) {
    case PROP_LOCATION:
        g_value_set_string( value, sink->filename.str );
        break;
    case PROP_APPEND:
        g_value_set_boolean (value, sink->append);
        break;
    default:
        G_OBJECT_WARN_INVALID_PROPERTY_ID (object, prop_id, pspec);
        break;
    }
}

gboolean gst_zeddatacsvsink_open_file(GstZedDataCsvSink* sink)
{
    GST_TRACE_OBJECT( sink, "Open file: %s", sink->filename.str );

    if( sink->filename.len == 0 )
    {
        GST_ELEMENT_ERROR (sink, RESOURCE, NOT_FOUND,
                           ("No file name specified for writing"), (NULL));
        return FALSE;
    }

    if(sink->append)
    {
        GST_TRACE_OBJECT( sink, "Opening in append mode..." );
        sink->out_file_ptr = new std::ofstream( sink->filename.str, std::ios::out | std::ios::app );
        GST_TRACE_OBJECT( sink, "... open." );
    }
    else
    {
        GST_TRACE_OBJECT( sink, "Opening..." );
        sink->out_file_ptr = new std::ofstream( sink->filename.str, std::ios::out | std::ios::trunc);
        GST_TRACE_OBJECT( sink, "... open." );

        *sink->out_file_ptr << "TIMESTAMP,STREAM_TYPE,CAM_MODEL,GRAB_W,GRAB_H," <<
                               "POSE_VAL,POS_TRK_STATE,POS_X_[m],POS_Y_[m],POS_Z_[m],OR_X_[rad],OR_Y_[rad],OR_Z_[rad]," <<
                               "IMU_VAL,ACC_X_[m/s²],ACC_Y_[m/s²],ACC_Z_[m/s²],GYRO_X_[rad/s],GYROY_[rad/s],GYRO_Z_[rad/s]," <<
                               "MAG_VAL,MAG_X_[uT],MAG_Y_[uT],MAG_Z_[uT]," <<
                               "ENV_VAL,TEMP_[°C],PRESS_[hPa]," <<
                               "TEMP_VAL,TEMP_L_[°C],TEMP_R_[°C]" <<
                               std::endl;
    }

    if(!sink->out_file_ptr || !sink->out_file_ptr->good() )
    {
        GST_ELEMENT_ERROR (sink, RESOURCE, NOT_FOUND,
                           ("Error opening CSV file for writing"), (NULL));
        return FALSE;
    }

    GST_TRACE_OBJECT( sink, "File opened: %s", sink->filename.str );


    return TRUE;
}

void gst_zeddatacsvsink_close_file(GstZedDataCsvSink* sink)
{
    GST_TRACE_OBJECT( sink, "Close File" );

    if(sink->out_file_ptr && sink->out_file_ptr->is_open())
    {
        sink->out_file_ptr->flush();
        sink->out_file_ptr->close();
    }
}

gboolean gst_zeddatacsvsink_start(GstBaseSink* sink)
{
    GstZedDataCsvSink* csvsink = GST_DATA_CSV_SINK(sink);

    GST_TRACE_OBJECT( csvsink, "Start" );

    return gst_zeddatacsvsink_open_file(csvsink);
}

gboolean gst_zeddatacsvsink_stop (GstBaseSink * sink)
{
    GstZedDataCsvSink* csvsink = GST_DATA_CSV_SINK(sink);

    GST_TRACE_OBJECT( csvsink, "Stop" );

    gst_zeddatacsvsink_close_file(csvsink);

    return TRUE;
}

gboolean gst_zeddatacsvsink_event (GstBaseSink * sink, GstEvent * event)
{
    GstEventType type;
    GstZedDataCsvSink* csvsink = GST_DATA_CSV_SINK(sink);

    type = GST_EVENT_TYPE (event);

    GST_TRACE_OBJECT( csvsink, "Event " );

    switch (type) {
    case GST_EVENT_EOS:
        if(csvsink->out_file_ptr && csvsink->out_file_ptr->is_open())
        {
            csvsink->out_file_ptr->flush();
        }
        break;
    default:
        break;
    }

    return GST_BASE_SINK_CLASS(gst_zeddatacsvsink_parent_class)->event( sink, event );
}


GstFlowReturn gst_zeddatacsvsink_render( GstBaseSink * sink, GstBuffer* buf )
{
    GstZedDataCsvSink* csvsink = GST_DATA_CSV_SINK(sink);

    GstMapInfo map_in;

    GST_TRACE_OBJECT( csvsink, "Render" );

    if(gst_buffer_map(buf, &map_in, GST_MAP_READ))
    {
        // ----> Timestamp
        GstClockTime timestamp = GST_BUFFER_TIMESTAMP (buf);
        *csvsink->out_file_ptr << timestamp << CSV_SEP;
        // <---  Timestamp

        GST_TRACE_OBJECT( csvsink, "Input buffer size %lu B", map_in.size );
        GST_TRACE_OBJECT( csvsink, "GstZedSrcMeta size %lu B", sizeof(GstZedSrcMeta) );

        GstZedSrcMeta* meta = (GstZedSrcMeta*)map_in.data;

        // ----> Info
        *csvsink->out_file_ptr << meta->info.stream_type << CSV_SEP;
        *csvsink->out_file_ptr << meta->info.cam_model << CSV_SEP;
        *csvsink->out_file_ptr << meta->info.grab_single_frame_width << CSV_SEP;
        *csvsink->out_file_ptr << meta->info.grab_single_frame_height << CSV_SEP;

        GST_LOG (" * [META] Stream type: %d", meta->info.stream_type );
        GST_LOG (" * [META] Camera model: %d", meta->info.cam_model );
        GST_LOG (" * [META] Grab frame size: %d x %d", meta->info.grab_single_frame_width,  meta->info.grab_single_frame_height );
        // <---- Info

        // ----> Camera Pose

        *csvsink->out_file_ptr << meta->pose.pose_avail << CSV_SEP;
        *csvsink->out_file_ptr << meta->pose.pos_tracking_state << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(6) << meta->pose.pos[0]/1000. << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(6) << meta->pose.pos[1]/1000. << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(6) << meta->pose.pos[2]/1000. << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(6) << meta->pose.orient[0] << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(6) << meta->pose.orient[1] << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(6) << meta->pose.orient[2] << CSV_SEP;

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
        // <---- Camera Pose

        // ----> Sensors
        *csvsink->out_file_ptr << meta->sens.imu.imu_avail << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(6) << meta->sens.imu.acc[0] << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(6) << meta->sens.imu.acc[1] << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(6) << meta->sens.imu.acc[2] << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(6) << meta->sens.imu.gyro[0] << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(6) << meta->sens.imu.gyro[1] << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(6) << meta->sens.imu.gyro[2] << CSV_SEP;

        *csvsink->out_file_ptr << meta->sens.mag.mag_avail << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(6) << meta->sens.mag.mag[0] << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(6) << meta->sens.mag.mag[1] << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(6) << meta->sens.mag.mag[2] << CSV_SEP;

        *csvsink->out_file_ptr << meta->sens.env.env_avail << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(2) << meta->sens.env.temp << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(2) << meta->sens.env.press << CSV_SEP;

        *csvsink->out_file_ptr << meta->sens.temp.temp_avail << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(2) << meta->sens.temp.temp_cam_left << CSV_SEP;
        *csvsink->out_file_ptr << std::fixed << std::setprecision(2) << meta->sens.temp.temp_cam_right;

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
        // <---- Sensors

        // endline
        *csvsink->out_file_ptr << std::endl;

        // Release incoming buffer
        gst_buffer_unmap( buf, &map_in );
    }
    else
    {
        GST_ELEMENT_ERROR (sink, RESOURCE, FAILED,
                           ("Failed to map buffer for reading" ), (NULL));
        return GST_FLOW_ERROR;
    }

    return GST_FLOW_OK;
}

static gboolean plugin_init (GstPlugin * plugin)
{
    GST_DEBUG_CATEGORY_INIT( gst_zeddatacsvsink_debug, "zeddatacsvsink", 0,
                             "debug category for zeddatacsvsink element");
    gst_element_register( plugin, "zeddatacsvsink", GST_RANK_NONE,
                          gst_zeddatacsvsink_get_type());

    return TRUE;
}

GST_PLUGIN_DEFINE (GST_VERSION_MAJOR,
                   GST_VERSION_MINOR,
                   zeddatacsvsink,
                   "ZED Data CSV sink",
                   plugin_init,
                   GST_PACKAGE_VERSION,
                   GST_PACKAGE_LICENSE,
                   GST_PACKAGE_NAME,
                   GST_PACKAGE_ORIGIN)
