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

#ifndef _GST_ZED_X_ONE_SRC_H_
#define _GST_ZED_X_ONE_SRC_H_

#include <gst/base/gstpushsrc.h>

#include "lib/include/ArgusCapture.hpp"

G_BEGIN_DECLS

#define GST_TYPE_ZED_X_ONE_SRC (gst_zedxonesrc_get_type())
#define GST_ZED_X_ONE_SRC(obj)                                                                     \
    (G_TYPE_CHECK_INSTANCE_CAST((obj), GST_TYPE_ZED_X_ONE_SRC, GstZedXOneSrc))
#define GST_ZED_X_ONE_SRC_CLASS(klass)                                                             \
    (G_TYPE_CHECK_CLASS_CAST((klass), GST_TYPE_ZED_X_ONE_SRC, GstZedXOneSrcClass))
#define GST_IS_ZED_X_ONE_SRC(obj) (G_TYPE_CHECK_INSTANCE_TYPE((obj), GST_TYPE_ZED_X_ONE_SRC))
#define GST_IS_ZED_X_ONE_SRC_CLASS(obj) (G_TYPE_CHECK_CLASS_TYPE((klass), GST_TYPE_ZED_X_ONE_SRC))

typedef struct _GstZedXOneSrc GstZedXOneSrc;
typedef struct _GstZedXOneSrcClass GstZedXOneSrcClass;

struct _GstZedXOneSrc {
    GstPushSrc base_zedxonesrc;

    // ZED X One camera object
    std::unique_ptr<oc::ArgusBayerCapture> zed;   // ZED X One object

    gboolean is_started;       // grab started flag
    gboolean stop_requested;   // stop request flagout_framesize

    // ----> Properties
    gint camera_resolution;   // * Camera resolution [enum]
    gint camera_fps;          // * Camera FPS
    gint verbose_level;       // * Capture library verbose level
    gint cam_timeout_msec;    // * Camera communication timeout
    gint camera_id;           // * Camera ID
    gboolean swap_rb;         // * Swap for RGB(A) or BGR(A) output

    gboolean auto_exposure;      // * Enable Automatic Exposure
    gint exposure_range_min;     // * Minimum value for Automatic Exposure
    gint exposure_range_max;     // * Maximum value for Automatic Exposure
    gint manual_exposure_usec;   // * Manual Exposure time

    gboolean auto_analog_gain;          // * Enable Automatic Analog Gain
    gint analog_frame_gain_range_min;   // * Minimum value for Automatic Analog Gain
    gint analog_frame_gain_range_max;   // * Maximum value for Automatic Analog Gain
    gfloat manual_analog_gain_db;       // * Manual Analog Gain

    gboolean auto_digital_gain;            // * Enable Automatic Digital Gain
    gfloat digital_frame_gain_range_min;   // * Minimum value for Automatic Digital Gain
    gfloat digital_frame_gain_range_max;   // * Maximum value for Automatic Digital Gain
    gint manual_digital_gain_value;        // * Manual Digital Gain [1,256]

    gboolean auto_wb;   // * Enable Automatic White Balance
    gint manual_wb;     // * Manual White Balance [2800,12000]

    gint ae_anti_banding;           // * Exposure anti banding - OFF, AUTO, 50Hz, 60Hz
    gfloat color_saturation;        // * Color Saturation [0.0,2.0]
    gfloat denoising;               // * Image Denoising [0.0,1.0]
    gfloat exposure_compensation;   // * Exposure Compensation [-2.0,2.0]
    gfloat sharpening;              // * Image Sharpening [0.0,1.0]

    gint aec_agc_roi_x; // * AEC-AGC ROI top left x coordinate
    gint aec_agc_roi_y; // * AEC-AGC ROI top left y coordinate
    gint aec_agc_roi_w; // * AEC-AGC ROI width
    gint aec_agc_roi_h; // * AEC-AGC ROI height

    gfloat tone_mapping_r_gamma;   // [1.5,3.5]
    gfloat tone_mapping_g_gamma;   // [1.5,3.5]
    gfloat tone_mapping_b_gamma;   // [1.5,3.5]
    // <---- Properties

    GstClockTime acq_start_time;   // Acquisition start time

    GstCaps *caps;         // Stream caps
    guint out_framesize;   // Output frame size in byte
};

struct _GstZedXOneSrcClass {
    GstPushSrcClass base_zedxonesrc_class;
};

G_GNUC_INTERNAL GType gst_zedxonesrc_get_type(void);

G_END_DECLS

#endif   // _GST_ZED_X_ONE_SRC_H_
