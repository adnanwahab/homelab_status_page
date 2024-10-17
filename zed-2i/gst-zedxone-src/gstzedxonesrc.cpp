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

#include <gst/base/gstpushsrc.h>
#include <gst/gst.h>
#include <gst/video/video.h>
#include <math.h>
#include <unistd.h>

#include "gst-zed-meta/gstzedmeta.h"
#include "gstzedxonesrc.h"

#include <chrono>

GST_DEBUG_CATEGORY_STATIC(gst_zedxonesrc_debug);
#define GST_CAT_DEFAULT gst_zedxonesrc_debug

/* prototypes */
static void gst_zedxonesrc_set_property(GObject *object, guint property_id, const GValue *value,
                                        GParamSpec *pspec);
static void gst_zedxonesrc_get_property(GObject *object, guint property_id, GValue *value,
                                        GParamSpec *pspec);
static void gst_zedxonesrc_dispose(GObject *object);
static void gst_zedxonesrc_finalize(GObject *object);

static gboolean gst_zedxonesrc_start(GstBaseSrc *src);
static gboolean gst_zedxonesrc_stop(GstBaseSrc *src);
static GstCaps *gst_zedxonesrc_get_caps(GstBaseSrc *src, GstCaps *filter);
static gboolean gst_zedxonesrc_set_caps(GstBaseSrc *src, GstCaps *caps);
static gboolean gst_zedxonesrc_unlock(GstBaseSrc *src);
static gboolean gst_zedxonesrc_unlock_stop(GstBaseSrc *src);

static GstFlowReturn gst_zedxonesrc_fill(GstPushSrc *src, GstBuffer *buf);

enum {
    PROP_0,
    PROP_CAM_RES,
    PROP_CAM_FPS,
    PROP_VERBOSE_LVL,
    PROP_CAM_ID,
    PROP_SWAP_RB,
    PROP_TIMEOUT_MSEC,
    PROP_AE_ANTI_BANDING,
    PROP_ANALOG_GAIN_RANGE_MIN,
    PROP_ANALOG_GAIN_RANGE_MAX,
    PROP_DIGITAL_GAIN_RANGE_MIN,
    PROP_DIGITAL_GAIN_RANGE_MAX,
    PROP_EXPOSURE_RANGE_MIN,
    PROP_EXPOSURE_RANGE_MAX,
    PROP_AUTO_ANALOG_GAIN,
    PROP_AUTO_DIGITAL_GAIN,
    PROP_AUTO_EXPOSURE,
    PROP_AUTO_WB,
    PROP_SATURATION,
    PROP_DENOISING,
    PROP_EXP_COMPENSATION,
    PROP_SHARPENING,
    PROP_MAN_ANALOG_GAIN_DB,
    PROP_MAN_DIGITAL_GAIN,
    PROP_MAN_EXPOSURE_USEC,
    PROP_MANUAL_WB,
    PROP_TONE_MAP_R_GAMMA,
    PROP_TONE_MAP_G_GAMMA,
    PROP_TONE_MAP_B_GAMMA,
    PROP_AEC_AGC_ROI_X,
    PROP_AEC_AGC_ROI_Y,
    PROP_AEC_AGC_ROI_W,
    PROP_AEC_AGC_ROI_H,
    N_PROPERTIES
};

typedef enum {
    GST_ZEDXONESRC_SVGA,    // 960 x 600
    GST_ZEDXONESRC_1080P,   // 1920 x 1080
    GST_ZEDXONESRC_1200P,   // 1920 x 1200
    GST_ZEDXONESRC_4K       // 3840 x 2160
} GstZedXOneSrcRes;

typedef enum {
    GST_ZEDXONESRC_120FPS = 120,
    GST_ZEDXONESRC_60FPS = 60,
    GST_ZEDXONESRC_30FPS = 30,
    GST_ZEDXONESRC_15FPS = 15
} GstZedXOneSrcFPS;

typedef enum {
    GST_AE_ANTI_BAND_OFF = 0,
    GST_AE_ANTI_BAND_AUTO = 1,
    GST_AE_ANTI_BAND_50HZ = 2,
    GST_AE_ANTI_BAND_60HZ = 3
} GstZedXOneSrcAeAntiBand;

//////////////// DEFAULT PARAMETERS
/////////////////////////////////////////////////////////////////////////////

// INITIALIZATION
#define DEFAULT_PROP_CAM_RES GST_ZEDXONESRC_1200P
#define DEFAULT_PROP_CAM_FPS GST_ZEDXONESRC_15FPS
#define DEFAULT_PROP_VERBOSE_LVL 0
#define DEFAULT_PROP_CAM_ID 0
#define DEFAULT_PROP_SWAP_RB 0
#define DEFAULT_PROP_TIMEOUT_MSEC 1000

// CAMERA CONTROLS
#define DEFAULT_PROP_AE_ANTI_BANDING GST_AE_ANTI_BAND_AUTO
#define DEFAULT_PROP_ANALOG_GAIN_RANGE_MIN 0.1
#define DEFAULT_PROP_ANALOG_GAIN_RANGE_MAX 30.0
#define DEFAULT_PROP_DIGITAL_GAIN_RANGE_MIN 1.0
#define DEFAULT_PROP_DIGITAL_GAIN_RANGE_MAX 256.0
#define DEFAULT_PROP_EXPOSURE_RANGE_MIN 28
#define DEFAULT_PROP_EXPOSURE_RANGE_MAX 66000
#define DEFAULT_PROP_AUTO_ANALOG_GAIN TRUE
#define DEFAULT_PROP_AUTO_DIGITAL_GAIN TRUE
#define DEFAULT_PROP_AUTO_EXPOSURE TRUE
#define DEFAULT_PROP_AUTO_WB TRUE
#define DEFAULT_PROP_SATURATION 1.0
#define DEFAULT_PROP_DENOISING 0.5
#define DEFAULT_PROP_EXP_COMPENSATION 0.0
#define DEFAULT_PROP_SHARPENING 1.0
#define DEFAULT_PROP_MAN_ANALOG_GAIN_DB 1.0
#define DEFAULT_PROP_MAN_DIGITAL_GAIN 128
#define DEFAULT_PROP_MAN_EXPOSURE_USEC 2000
#define DEFAULT_PROP_MANUAL_WB 5000
#define DEFAULT_PROP_TONE_MAP_R_GAMMA 2.0
#define DEFAULT_PROP_TONE_MAP_G_GAMMA 2.0
#define DEFAULT_PROP_TONE_MAP_B_GAMMA 2.0
#define DEFAULT_PROP_AEG_AGC_ROI_X -1
#define DEFAULT_PROP_AEG_AGC_ROI_Y -1
#define DEFAULT_PROP_AEG_AGC_ROI_W -1
#define DEFAULT_PROP_AEG_AGC_ROI_H -1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

#define GST_TYPE_ZEDXONE_RESOL (gst_zedxonesrc_resol_get_type())
static GType gst_zedxonesrc_resol_get_type(void) {
    static GType zedxonesrc_resol_type = 0;

    if (!zedxonesrc_resol_type) {
        static GEnumValue pattern_types[] = {
            {static_cast<gint>(GST_ZEDXONESRC_4K), "3840x2160", "4K"},
            {static_cast<gint>(GST_ZEDXONESRC_1200P), "1920x1200", "HD1200"},
            {static_cast<gint>(GST_ZEDXONESRC_1080P), "1920x1080", "HD1080"},
            {static_cast<gint>(GST_ZEDXONESRC_SVGA), "960x600", "SVGA"},
            {0, NULL, NULL},
        };

        zedxonesrc_resol_type = g_enum_register_static("GstZedXOneSrcResol", pattern_types);
    }

    return zedxonesrc_resol_type;
}

#define GST_TYPE_ZED_FPS (gst_zedxonesrc_fps_get_type())
static GType gst_zedxonesrc_fps_get_type(void) {
    static GType zedxonesrc_fps_type = 0;

    if (!zedxonesrc_fps_type) {
        static GEnumValue pattern_types[] = {
            {GST_ZEDXONESRC_120FPS, "Only with SVGA. Not available with 4K mode", "120 FPS"},
            {GST_ZEDXONESRC_60FPS, "Not available with 4K mode", "60  FPS"},
            {GST_ZEDXONESRC_30FPS, "Not available with 4K mode", "30  FPS"},
            {GST_ZEDXONESRC_15FPS, "all resolutions (NO GMSL2)", "15  FPS"},
            {0, NULL, NULL},
        };

        zedxonesrc_fps_type = g_enum_register_static("GstZedXOneSrcFPS", pattern_types);
    }

    return zedxonesrc_fps_type;
}

#define GST_TYPE_ANTI_BANDING (gst_zedxonesrc_anti_banding_get_type())
static GType gst_zedxonesrc_anti_banding_get_type(void) {
    static GType zedxonesrc_anti_banding_type = 0;

    if (!zedxonesrc_anti_banding_type) {
        static GEnumValue pattern_types[] = {
            {GST_AE_ANTI_BAND_OFF, "Anti Banding disabled", "Disabled"},
            {GST_AE_ANTI_BAND_AUTO, "Automatic Anti Banding", "Automatic"},
            {GST_AE_ANTI_BAND_50HZ, "50 Hz Anti Banding", "50 Hz"},
            {GST_AE_ANTI_BAND_60HZ, "60 Hz Anti Banding", "60 Hz"},
            {0, NULL, NULL},
        };

        zedxonesrc_anti_banding_type =
            g_enum_register_static("GstZedXOneSrcAntiBanding", pattern_types);
    }

    return zedxonesrc_anti_banding_type;
}

/* pad templates */
static GstStaticPadTemplate gst_zedxonesrc_src_template =
    GST_STATIC_PAD_TEMPLATE("src", GST_PAD_SRC, GST_PAD_ALWAYS,
                            GST_STATIC_CAPS(("video/x-raw, "   // Color 4K
                                             "format = (string)BGRA, "
                                             "width = (int)3840, "
                                             "height = (int)2160, "
                                             "framerate = (fraction)15"
                                             ";"
                                             "video/x-raw, "   // Color HD1200
                                             "format = (string)BGRA, "
                                             "width = (int)1920, "
                                             "height = (int)1200, "
                                             "framerate = (fraction) { 15, 30, 60 }"
                                             ";"
                                             "video/x-raw, "   // Color HD1080
                                             "format = (string)BGRA, "
                                             "width = (int)1920, "
                                             "height = (int)1080, "
                                             "framerate = (fraction) { 15, 30, 60 }"
                                             ";"
                                             "video/x-raw, "   // Color SVGA
                                             "format = (string)BGRA, "
                                             "width = (int)960, "
                                             "height = (int)600, "
                                             "framerate = (fraction) { 15, 30, 60, 120 }"
                                             ";"
                                             "video/x-raw, "   // Color 4K
                                             "format = (string)RGBA, "
                                             "width = (int)3840, "
                                             "height = (int)2160, "
                                             "framerate = (fraction)15"
                                             ";"
                                             "video/x-raw, "   // Color HD1200
                                             "format = (string)RGBA, "
                                             "width = (int)1920, "
                                             "height = (int)1200, "
                                             "framerate = (fraction) { 15, 30, 60 }"
                                             ";"
                                             "video/x-raw, "   // Color HD1080
                                             "format = (string)RGBA, "
                                             "width = (int)1920, "
                                             "height = (int)1080, "
                                             "framerate = (fraction) { 15, 30, 60 }"
                                             ";"
                                             "video/x-raw, "   // Color SVGA
                                             "format = (string)RGBA, "
                                             "width = (int)960, "
                                             "height = (int)600, "
                                             "framerate = (fraction) { 15, 30, 60, 120 }")));

/* Tools */
bool resol_to_w_h(const GstZedXOneSrcRes &resol, guint32 &out_w, guint32 &out_h) {
    switch (resol) {
    case GST_ZEDXONESRC_SVGA:
        out_w = 960;
        out_h = 600;
        break;

    case GST_ZEDXONESRC_1080P:
        out_w = 1920;
        out_h = 1080;
        break;

    case GST_ZEDXONESRC_1200P:
        out_w = 1920;
        out_h = 1200;
        break;

    case GST_ZEDXONESRC_4K:
        out_w = 3840;
        out_h = 2160;
        break;

    default:
        out_w = -1;
        out_h = -1;
        return false;
    }

    return true;
}

/* class initialization */
G_DEFINE_TYPE(GstZedXOneSrc, gst_zedxonesrc, GST_TYPE_PUSH_SRC);

static void gst_zedxonesrc_class_init(GstZedXOneSrcClass *klass) {
    GObjectClass *gobject_class = G_OBJECT_CLASS(klass);
    GstElementClass *gstelement_class = GST_ELEMENT_CLASS(klass);
    GstBaseSrcClass *gstbasesrc_class = GST_BASE_SRC_CLASS(klass);
    GstPushSrcClass *gstpushsrc_class = GST_PUSH_SRC_CLASS(klass);

    gobject_class->set_property = gst_zedxonesrc_set_property;
    gobject_class->get_property = gst_zedxonesrc_get_property;
    gobject_class->dispose = gst_zedxonesrc_dispose;
    gobject_class->finalize = gst_zedxonesrc_finalize;

    gst_element_class_add_pad_template(gstelement_class,
                                       gst_static_pad_template_get(&gst_zedxonesrc_src_template));

    gst_element_class_set_static_metadata(gstelement_class, "ZED X One Camera Source",
                                          "Source/Video", "Stereolabs ZED X One Camera source",
                                          "Stereolabs <support@stereolabs.com>");

    gstbasesrc_class->start = GST_DEBUG_FUNCPTR(gst_zedxonesrc_start);
    gstbasesrc_class->stop = GST_DEBUG_FUNCPTR(gst_zedxonesrc_stop);
    gstbasesrc_class->get_caps = GST_DEBUG_FUNCPTR(gst_zedxonesrc_get_caps);
    gstbasesrc_class->set_caps = GST_DEBUG_FUNCPTR(gst_zedxonesrc_set_caps);
    gstbasesrc_class->unlock = GST_DEBUG_FUNCPTR(gst_zedxonesrc_unlock);
    gstbasesrc_class->unlock_stop = GST_DEBUG_FUNCPTR(gst_zedxonesrc_unlock_stop);

    gstpushsrc_class->fill = GST_DEBUG_FUNCPTR(gst_zedxonesrc_fill);

    /* Install GObject properties */
    g_object_class_install_property(
        gobject_class, PROP_CAM_RES,
        g_param_spec_enum("camera-resolution", "Camera Resolution", "Camera Resolution",
                          GST_TYPE_ZEDXONE_RESOL, DEFAULT_PROP_CAM_RES,
                          (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_CAM_FPS,
        g_param_spec_enum("camera-fps", "Camera frame rate", "Camera frame rate", GST_TYPE_ZED_FPS,
                          DEFAULT_PROP_CAM_FPS,
                          (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_VERBOSE_LVL,
        g_param_spec_int("verbose-level", "Capture Library Verbose",
                         "Capture Library Verbose level", 0, 4, DEFAULT_PROP_VERBOSE_LVL,
                         (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_CAM_ID,
        g_param_spec_int("camera-id", "Camera ID", "Select camera from cameraID", 0, 255,
                         DEFAULT_PROP_CAM_ID,
                         (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_SWAP_RB,
        g_param_spec_boolean("swap-rb", "Swap RB", "Swap Red and Blue color channels",
                             DEFAULT_PROP_SWAP_RB,
                             (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_TIMEOUT_MSEC,
        g_param_spec_int("camera-timeout", "Timeout [msec]", "Connection timeout in milliseconds",
                         100, 100000000, DEFAULT_PROP_TIMEOUT_MSEC,
                         (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_AUTO_EXPOSURE,
        g_param_spec_boolean("auto-exposure", "Automatic Exposure", "Enable Automatic Exposure",
                             DEFAULT_PROP_AUTO_EXPOSURE,
                             (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_MAN_EXPOSURE_USEC,
        g_param_spec_int("exposure-time", "Exposure time [µsec]", "Exposure time in microseconds",
                         28, 66000, DEFAULT_PROP_MAN_EXPOSURE_USEC,
                         (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_EXPOSURE_RANGE_MIN,
        g_param_spec_int("auto-exposure-range-min", "Minimum Exposure time [µsec]",
                         "Minimum exposure time in microseconds for the automatic exposure setting",
                         28, 66000, DEFAULT_PROP_EXPOSURE_RANGE_MIN,
                         (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_EXPOSURE_RANGE_MAX,
        g_param_spec_int("auto-exposure-range-max", "Maximum Exposure time [µsec]",
                         "Maximum exposure time in microseconds for the automatic exposure setting",
                         28, 66000, DEFAULT_PROP_EXPOSURE_RANGE_MAX,
                         (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_AUTO_ANALOG_GAIN,
        g_param_spec_boolean("auto-analog-gain", "Automatic Analog Gain",
                             "Enable Automatic Analog Gain", DEFAULT_PROP_AUTO_ANALOG_GAIN,
                             (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_MAN_ANALOG_GAIN_DB,
        g_param_spec_float("analog-gain", "Analog Gain [dB]", "Analog Gain value in dB", 0.1, 30.0,
                           DEFAULT_PROP_MAN_ANALOG_GAIN_DB,
                           (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_ANALOG_GAIN_RANGE_MIN,
        g_param_spec_float("auto-analog-gain-range-min", "Minimum Automatic Analog Gain [dB]",
                           "Minimum Analog Gain in dB for the automatic analog gain setting", 0.1,
                           30.0, DEFAULT_PROP_ANALOG_GAIN_RANGE_MIN,
                           (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_ANALOG_GAIN_RANGE_MAX,
        g_param_spec_float("auto-analog-gain-range-max", "Maximum Automatic Analog Gain [dB]",
                           "Maximum Analog Gain in dB for the automatic analog gain setting", 0.1,
                           30.0, DEFAULT_PROP_ANALOG_GAIN_RANGE_MAX,
                           (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_AUTO_DIGITAL_GAIN,
        g_param_spec_boolean("auto-digital-gain", "Automatic Digital Gain",
                             "Enable Automatic Digital Gain", DEFAULT_PROP_AUTO_DIGITAL_GAIN,
                             (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_MAN_DIGITAL_GAIN,
        g_param_spec_int("digital-gain", "Digital Gain", "Digital Gain value", 1, 256,
                         DEFAULT_PROP_MAN_DIGITAL_GAIN,
                         (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_DIGITAL_GAIN_RANGE_MIN,
        g_param_spec_float("auto-digital-gain-range-min", "Minimum Automatic Digital Gain",
                           "Minimum Digital Gain for the automatic digital gain setting", 1.0,
                           256.0, DEFAULT_PROP_DIGITAL_GAIN_RANGE_MIN,
                           (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_DIGITAL_GAIN_RANGE_MAX,
        g_param_spec_float("auto-digital-gain-range-max", "Maximum Automatic Digital Gain",
                           "Maximum Digital Gain for the automatic digital gain setting", 1.0,
                           256.0, DEFAULT_PROP_DIGITAL_GAIN_RANGE_MAX,
                           (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_AUTO_WB,
        g_param_spec_boolean("auto-wb", "Automatic White Balance", "Enable Automatic White Balance",
                             DEFAULT_PROP_AUTO_WB,
                             (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_MANUAL_WB,
        g_param_spec_int("white-balance-temp", "White Balance Temperature [°]",
                         "White Balance Temperature [°]", 2800, 12000, DEFAULT_PROP_MANUAL_WB,
                         (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_AE_ANTI_BANDING,
        g_param_spec_enum("anti-banding", "Anti Banding", "AE Anti Banding", GST_TYPE_ANTI_BANDING,
                          DEFAULT_PROP_AE_ANTI_BANDING,
                          (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_SATURATION,
        g_param_spec_float("saturation", "Color Saturation", "Color Saturation", 0.0, 2.0,
                           DEFAULT_PROP_SATURATION,
                           (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_DENOISING,
        g_param_spec_float("denoising", "Denoising", "Denoising factor", 0.0, 1.0,
                           DEFAULT_PROP_DENOISING,
                           (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_EXP_COMPENSATION,
        g_param_spec_float("exposure-compensation", "Exposure Compensation",
                           "Exposure Compensation", -2.0, 2.0, DEFAULT_PROP_EXP_COMPENSATION,
                           (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_SHARPENING,
        g_param_spec_float("sharpening", "Image Sharpening", "Image Sharpening", 0.0, 1.0,
                           DEFAULT_PROP_SHARPENING,
                           (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_TONE_MAP_R_GAMMA,
        g_param_spec_float("tone-map-gamma-r", "Tone Map from Gamma (Ch. R)",
                           "Set the tone mapping curve from a gamma value (Channel R)", 1.5, 3.5,
                           DEFAULT_PROP_TONE_MAP_R_GAMMA,
                           (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_TONE_MAP_G_GAMMA,
        g_param_spec_float("tone-map-gamma-g", "Tone Map from Gamma (Ch. G)",
                           "Set the tone mapping curve from a gamma value (Channel G)", 1.5, 3.5,
                           DEFAULT_PROP_TONE_MAP_G_GAMMA,
                           (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_TONE_MAP_B_GAMMA,
        g_param_spec_float("tone-map-gamma-b", "Tone Map from Gamma (Ch. B)",
                           "Set the tone mapping curve from a gamma value (Channel B)", 1.5, 3.5,
                           DEFAULT_PROP_TONE_MAP_B_GAMMA,
                           (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_AEC_AGC_ROI_X,
        g_param_spec_int(
            "ctrl-aec-agc-roi-x", "Camera control: auto gain/exposure ROI top left 'X' coordinate",
            "Auto gain/exposure ROI top left 'X' coordinate (-1 to not set ROI)", -1, 3810,
            DEFAULT_PROP_AEG_AGC_ROI_X, (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_AEC_AGC_ROI_Y,
        g_param_spec_int(
            "ctrl-aec-agc-roi-y", "Camera control: auto gain/exposure ROI top left 'Y' coordinate",
            "Auto gain/exposure ROI top left 'Y' coordinate (-1 to not set ROI)", -1, 2160,
            DEFAULT_PROP_AEG_AGC_ROI_Y, (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_AEC_AGC_ROI_W,
        g_param_spec_int("ctrl-aec-agc-roi-w", "Camera control: auto gain/exposure ROI width",
                         "Auto gain/exposure ROI width (-1 to not set ROI)", -1, 3810,
                         DEFAULT_PROP_AEG_AGC_ROI_W,
                         (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));

    g_object_class_install_property(
        gobject_class, PROP_AEC_AGC_ROI_H,
        g_param_spec_int("ctrl-aec-agc-roi-h", "Camera control: auto gain/exposure ROI height",
                         "Auto gain/exposure ROI height (-1 to not set ROI)", -1, 2160,
                         DEFAULT_PROP_AEG_AGC_ROI_H,
                         (GParamFlags)(G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS)));
}

static void gst_zedxonesrc_reset(GstZedXOneSrc *src) {
    if (src->zed->isOpened()) {
        src->zed->closeCamera();
    }

    src->out_framesize = 0;
    src->is_started = FALSE;

    if (src->caps) {
        gst_caps_unref(src->caps);
        src->caps = NULL;
    }
}

static void gst_zedxonesrc_init(GstZedXOneSrc *src) {
    /* set source as live (no preroll) */
    gst_base_src_set_live(GST_BASE_SRC(src), TRUE);

    /* override default of BYTES to operate in time mode */
    gst_base_src_set_format(GST_BASE_SRC(src), GST_FORMAT_TIME);

    // ----> Parameters initialization
    src->camera_resolution = DEFAULT_PROP_CAM_RES;
    src->camera_fps = DEFAULT_PROP_CAM_FPS;
    src->verbose_level = DEFAULT_PROP_VERBOSE_LVL;
    src->camera_id = DEFAULT_PROP_CAM_ID;
    src->swap_rb = DEFAULT_PROP_SWAP_RB;
    src->cam_timeout_msec = DEFAULT_PROP_TIMEOUT_MSEC;

    src->ae_anti_banding = DEFAULT_PROP_AE_ANTI_BANDING;
    src->color_saturation = DEFAULT_PROP_SATURATION;
    src->denoising = DEFAULT_PROP_DENOISING;
    src->exposure_compensation = DEFAULT_PROP_EXP_COMPENSATION;
    src->sharpening = DEFAULT_PROP_SHARPENING;
    src->tone_mapping_r_gamma = DEFAULT_PROP_TONE_MAP_R_GAMMA;
    src->tone_mapping_g_gamma = DEFAULT_PROP_TONE_MAP_G_GAMMA;
    src->tone_mapping_b_gamma = DEFAULT_PROP_TONE_MAP_B_GAMMA;

    src->auto_exposure = DEFAULT_PROP_AUTO_EXPOSURE;
    src->exposure_range_min = DEFAULT_PROP_EXPOSURE_RANGE_MIN;
    src->exposure_range_max = DEFAULT_PROP_EXPOSURE_RANGE_MAX;
    src->manual_exposure_usec = DEFAULT_PROP_MAN_EXPOSURE_USEC;

    src->auto_analog_gain = DEFAULT_PROP_AUTO_ANALOG_GAIN;
    src->analog_frame_gain_range_min = DEFAULT_PROP_ANALOG_GAIN_RANGE_MIN;
    src->analog_frame_gain_range_max = DEFAULT_PROP_ANALOG_GAIN_RANGE_MAX;
    src->manual_analog_gain_db = DEFAULT_PROP_MAN_ANALOG_GAIN_DB;

    src->auto_digital_gain = DEFAULT_PROP_AUTO_DIGITAL_GAIN;
    src->digital_frame_gain_range_min = DEFAULT_PROP_DIGITAL_GAIN_RANGE_MIN;
    src->digital_frame_gain_range_max = DEFAULT_PROP_DIGITAL_GAIN_RANGE_MAX;
    src->manual_digital_gain_value = DEFAULT_PROP_MAN_DIGITAL_GAIN;

    src->auto_wb = DEFAULT_PROP_AUTO_WB;
    src->manual_wb = DEFAULT_PROP_MANUAL_WB;

    src->aec_agc_roi_x = DEFAULT_PROP_AEG_AGC_ROI_X;
    src->aec_agc_roi_y = DEFAULT_PROP_AEG_AGC_ROI_Y;
    src->aec_agc_roi_w = DEFAULT_PROP_AEG_AGC_ROI_W;
    src->aec_agc_roi_h = DEFAULT_PROP_AEG_AGC_ROI_H;
    // <---- Parameters initialization

    src->stop_requested = FALSE;
    src->caps = NULL;

    if (!src->zed) {
        src->zed = std::make_unique<oc::ArgusBayerCapture>();
    }

    gst_zedxonesrc_reset(src);
}

void gst_zedxonesrc_set_property(GObject *object, guint property_id, const GValue *value,
                                 GParamSpec *pspec) {
    GstZedXOneSrc *src;

    src = GST_ZED_X_ONE_SRC(object);

    GST_TRACE_OBJECT(src, "gst_zedxonesrc_set_property");

    switch (property_id) {
    case PROP_CAM_RES:
        src->camera_resolution = g_value_get_enum(value);
        break;
    case PROP_CAM_FPS:
        src->camera_fps = g_value_get_enum(value);
        break;
    case PROP_VERBOSE_LVL:
        src->verbose_level = g_value_get_int(value);
        break;
    case PROP_CAM_ID:
        src->camera_id = g_value_get_int(value);
        break;
    case PROP_SWAP_RB:
        src->swap_rb = g_value_get_boolean(value);
        break;
    case PROP_TIMEOUT_MSEC:
        src->cam_timeout_msec = g_value_get_int(value);
        break;
    case PROP_AE_ANTI_BANDING:
        src->ae_anti_banding = g_value_get_enum(value);
        break;
    case PROP_SATURATION:
        src->color_saturation = g_value_get_float(value);
        break;
    case PROP_DENOISING:
        src->denoising = g_value_get_float(value);
        break;
    case PROP_EXP_COMPENSATION:
        src->exposure_compensation = g_value_get_float(value);
        break;
    case PROP_SHARPENING:
        src->sharpening = g_value_get_float(value);
        break;
    case PROP_TONE_MAP_R_GAMMA:
        src->tone_mapping_r_gamma = g_value_get_float(value);
        break;
    case PROP_TONE_MAP_G_GAMMA:
        src->tone_mapping_g_gamma = g_value_get_float(value);
        break;
    case PROP_TONE_MAP_B_GAMMA:
        src->tone_mapping_b_gamma = g_value_get_float(value);
        break;
    case PROP_AUTO_EXPOSURE:
        src->auto_exposure = g_value_get_boolean(value);
        break;
    case PROP_MAN_EXPOSURE_USEC:
        src->manual_exposure_usec = g_value_get_int(value);
        break;
    case PROP_EXPOSURE_RANGE_MIN:
        src->exposure_range_min = g_value_get_int(value);
        break;
    case PROP_EXPOSURE_RANGE_MAX:
        src->exposure_range_max = g_value_get_int(value);
        break;
    case PROP_AUTO_ANALOG_GAIN:
        src->auto_analog_gain = g_value_get_boolean(value);
        break;
    case PROP_MAN_ANALOG_GAIN_DB:
        src->manual_analog_gain_db = g_value_get_float(value);
        break;
    case PROP_ANALOG_GAIN_RANGE_MIN:
        src->analog_frame_gain_range_min = g_value_get_float(value);
        break;
    case PROP_ANALOG_GAIN_RANGE_MAX:
        src->analog_frame_gain_range_max = g_value_get_float(value);
        break;
    case PROP_AUTO_DIGITAL_GAIN:
        src->auto_digital_gain = g_value_get_boolean(value);
        break;
    case PROP_MAN_DIGITAL_GAIN:
        src->manual_digital_gain_value = g_value_get_int(value);
        break;
    case PROP_DIGITAL_GAIN_RANGE_MIN:
        src->digital_frame_gain_range_min = g_value_get_float(value);
        break;
    case PROP_DIGITAL_GAIN_RANGE_MAX:
        src->digital_frame_gain_range_max = g_value_get_float(value);
        break;
    case PROP_AUTO_WB:
        src->auto_wb = g_value_get_boolean(value);
        break;
    case PROP_MANUAL_WB:
        src->manual_wb = g_value_get_int(value);
        break;
    case PROP_AEC_AGC_ROI_X:
        src->aec_agc_roi_x = g_value_get_int(value);
        break;
    case PROP_AEC_AGC_ROI_Y:
        src->aec_agc_roi_y = g_value_get_int(value);
        break;
    case PROP_AEC_AGC_ROI_W:
        src->aec_agc_roi_w = g_value_get_int(value);
        break;
    case PROP_AEC_AGC_ROI_H:
        src->aec_agc_roi_h = g_value_get_int(value);
        break;
    default:
        G_OBJECT_WARN_INVALID_PROPERTY_ID(object, property_id, pspec);
        break;
    }
}

void gst_zedxonesrc_get_property(GObject *object, guint property_id, GValue *value,
                                 GParamSpec *pspec) {
    GstZedXOneSrc *src;

    g_return_if_fail(GST_IS_ZED_X_ONE_SRC(object));
    src = GST_ZED_X_ONE_SRC(object);

    GST_TRACE_OBJECT(src, "gst_zedxonesrc_get_property");

    switch (property_id) {
    case PROP_CAM_RES:
        g_value_set_enum(value, src->camera_resolution);
        break;
    case PROP_CAM_FPS:
        g_value_set_enum(value, src->camera_fps);
        break;
    case PROP_VERBOSE_LVL:
        g_value_set_int(value, src->verbose_level);
        break;
    case PROP_CAM_ID:
        g_value_set_int(value, src->camera_id);
        break;
    case PROP_SWAP_RB:
        g_value_set_boolean(value, src->swap_rb);
        break;
    case PROP_TIMEOUT_MSEC:
        g_value_set_int(value, src->cam_timeout_msec);
        break;
    case PROP_AE_ANTI_BANDING:
        g_value_set_enum(value, src->ae_anti_banding);
        break;
    case PROP_SATURATION:
        g_value_set_float(value, src->color_saturation);
        break;
    case PROP_DENOISING:
        g_value_set_float(value, src->denoising);
        break;
    case PROP_EXP_COMPENSATION:
        g_value_set_float(value, src->exposure_compensation);
        break;
    case PROP_SHARPENING:
        g_value_set_float(value, src->sharpening);
        break;
    case PROP_TONE_MAP_R_GAMMA:
        g_value_set_float(value, src->tone_mapping_r_gamma);
        break;
    case PROP_TONE_MAP_G_GAMMA:
        g_value_set_float(value, src->tone_mapping_g_gamma);
        break;
    case PROP_TONE_MAP_B_GAMMA:
        g_value_set_float(value, src->tone_mapping_b_gamma);
        break;
    case PROP_AUTO_EXPOSURE:
        g_value_set_boolean(value, src->auto_exposure);
        break;
    case PROP_MAN_EXPOSURE_USEC:
        g_value_set_int(value, src->manual_exposure_usec);
        break;
    case PROP_EXPOSURE_RANGE_MIN:
        g_value_set_int(value, src->exposure_range_min);
        break;
    case PROP_EXPOSURE_RANGE_MAX:
        g_value_set_int(value, src->exposure_range_max);
        break;
    case PROP_AUTO_ANALOG_GAIN:
        g_value_set_boolean(value, src->auto_analog_gain);
        break;
    case PROP_MAN_ANALOG_GAIN_DB:
        g_value_set_float(value, src->manual_analog_gain_db);
        break;
    case PROP_ANALOG_GAIN_RANGE_MIN:
        g_value_set_float(value, src->analog_frame_gain_range_min);
        break;
    case PROP_ANALOG_GAIN_RANGE_MAX:
        g_value_set_float(value, src->analog_frame_gain_range_max);
        break;
    case PROP_AUTO_DIGITAL_GAIN:
        g_value_set_boolean(value, src->auto_digital_gain);
        break;
    case PROP_MAN_DIGITAL_GAIN:
        g_value_set_int(value, src->manual_digital_gain_value);
        break;
    case PROP_DIGITAL_GAIN_RANGE_MIN:
        g_value_set_float(value, src->digital_frame_gain_range_min);
        break;
    case PROP_DIGITAL_GAIN_RANGE_MAX:
        g_value_set_float(value, src->digital_frame_gain_range_max);
        break;
    case PROP_AUTO_WB:
        g_value_set_boolean(value, src->auto_wb);
        break;
    case PROP_MANUAL_WB:
        g_value_set_int(value, src->manual_wb);
        break;
    case PROP_AEC_AGC_ROI_X:
        g_value_set_int(value, src->aec_agc_roi_x);
        break;
    case PROP_AEC_AGC_ROI_Y:
        g_value_set_int(value, src->aec_agc_roi_y);
        break;
    case PROP_AEC_AGC_ROI_W:
        g_value_set_int(value, src->aec_agc_roi_w);
        break;
    case PROP_AEC_AGC_ROI_H:
        g_value_set_int(value, src->aec_agc_roi_h);
        break;
    default:
        G_OBJECT_WARN_INVALID_PROPERTY_ID(object, property_id, pspec);
        break;
    }
}

void gst_zedxonesrc_dispose(GObject *object) {
    GstZedXOneSrc *src;

    g_return_if_fail(GST_IS_ZED_X_ONE_SRC(object));
    src = GST_ZED_X_ONE_SRC(object);

    GST_TRACE_OBJECT(src, "gst_zedxonesrc_dispose");

    /* clean up as possible.  may be called multiple times */

    G_OBJECT_CLASS(gst_zedxonesrc_parent_class)->dispose(object);
}

void gst_zedxonesrc_finalize(GObject *object) {
    GstZedXOneSrc *src;

    g_return_if_fail(GST_IS_ZED_X_ONE_SRC(object));
    src = GST_ZED_X_ONE_SRC(object);

    GST_TRACE_OBJECT(src, "gst_zedxonesrc_finalize");

    /* clean up object here */
    if (src->caps) {
        gst_caps_unref(src->caps);
        src->caps = NULL;
    }

    G_OBJECT_CLASS(gst_zedxonesrc_parent_class)->finalize(object);
}

static gboolean gst_zedxonesrc_calculate_caps(GstZedXOneSrc *src) {
    GST_TRACE_OBJECT(src, "gst_zedxonesrc_calculate_caps");

    guint32 width, height;
    gint fps;
    GstVideoInfo vinfo;
    GstVideoFormat format = src->swap_rb ? GST_VIDEO_FORMAT_RGBA : GST_VIDEO_FORMAT_BGRA;

    if (!resol_to_w_h(static_cast<GstZedXOneSrcRes>(src->camera_resolution), width, height)) {
        return FALSE;
    }

    fps = src->camera_fps;

    if (format != GST_VIDEO_FORMAT_UNKNOWN) {
        gst_video_info_init(&vinfo);
        gst_video_info_set_format(&vinfo, format, width, height);
        if (src->caps) {
            gst_caps_unref(src->caps);
        }
        src->out_framesize = (guint) GST_VIDEO_INFO_SIZE(&vinfo);
        vinfo.fps_n = fps;
        vinfo.fps_d = 1;
        src->caps = gst_video_info_to_caps(&vinfo);
    }

    gst_base_src_set_blocksize(GST_BASE_SRC(src), src->out_framesize);
    gst_base_src_set_caps(GST_BASE_SRC(src), src->caps);
    GST_DEBUG_OBJECT(src, "Created caps %" GST_PTR_FORMAT, src->caps);

    return TRUE;
}

static gboolean gst_zedxonesrc_start(GstBaseSrc *bsrc) {

    GstZedXOneSrc *src = GST_ZED_X_ONE_SRC(bsrc);

    GST_TRACE_OBJECT(src, "gst_zedxonesrc_calculate_caps");

    // ----> Set config parameters
    guint32 width, height;
    if (!resol_to_w_h(static_cast<GstZedXOneSrcRes>(src->camera_resolution), width, height)) {
        return FALSE;
    }

    int major, minor, patch;
    oc::ArgusVirtualCapture::getVersion(major, minor, patch);
    GST_INFO("ZED Argus Capture Version: %d.%d.%d", major, minor, patch);

    std::vector<oc::ArgusDevice> devs = oc::ArgusBayerCapture::getArgusDevices();
    for (int i = 0; i < devs.size(); i++) {
        GST_INFO("##################");
        GST_INFO(" Device: %d", devs.at(i).id);
        GST_INFO(" Name: %s", devs.at(i).name.c_str());
        GST_INFO(" Badge: %s", devs.at(i).badge.c_str());
        GST_INFO(" Available: %s", (devs.at(i).available ? "TRUE" : "FALSE"));
    }
    GST_INFO("***********************");

    GST_INFO("CAMERA INITIALIZATION PARAMETERS");

    oc::ArgusCameraConfig config;
    config.mDeviceId = src->camera_id;
    GST_INFO(" * Camera ID: %d", src->camera_id);
    config.mWidth = width;
    config.mHeight = height;
    GST_INFO(" * Camera resolution: %d x %d", (int) width, (int) height);
    config.mFPS = src->camera_fps;
    GST_INFO(" * Camera FPS: %d", src->camera_fps);
    config.mChannel = 4;
    GST_INFO(" * Camera channels: %d", config.mChannel);
    config.mSwapRB = src->swap_rb;
    GST_INFO(" * Swap RB: %s", (src->swap_rb ? "TRUE" : "FALSE"));
    config.verbose_level = src->verbose_level;
    GST_INFO(" * Verbose level: %d", src->verbose_level);

    GST_INFO(" * Connection timeout: %d msec", src->cam_timeout_msec);
    // <---- Set config parameters

    // ----> Open camera
    GST_INFO("Opening camera #%d ...", (int) config.mDeviceId);

    oc::ARGUS_STATE ret = src->zed->openCamera(config);

    if (ret != oc::ARGUS_STATE::OK) {
        GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                          ("Failed to open camera, '%s'", oc::ARGUS_STATE2str(ret).c_str()),
                          (NULL));
        return FALSE;
    }
    GST_INFO("... camera ready");
    GST_INFO(" * %dx%d@%dFPS", src->zed->getWidth(), src->zed->getHeight(), src->zed->getFPS());

    usleep(5000);
    // <---- Open camera

    // ----> Camera Controls
    // GST_INFO("CAMERA CONTROL DEFAULT PARAMETERS");
    // uint64_t min_u64;
    // uint64_t max_u64;
    // float min_f;
    // float max_f;

    // src->zed->getExposureLimits(min_u64, max_u64);
    // GST_INFO(" * Exposure Limits: [%d,%d]", (int) min_u64, (int) max_u64);
    // src->zed->getAnalogGainLimits(min_f, max_f);
    // GST_INFO(" * Analog Gain Limits: [%g,%g]", min_f, max_f);
    // src->zed->getDigitalGainLimits(min_f, max_f);
    // GST_INFO(" * Digital Gain Limits: [%g,%g]", min_f, max_f);

    // float sat = src->zed->getColorSaturation();
    // GST_INFO(" * Default Saturation: %g", sat);
    // float den = src->zed->getDenoisingValue();
    // GST_INFO(" * Default Denoising: %g", den);
    // float exp = src->zed->getExposureCompensation();
    // GST_INFO(" * Default Exposure Compensation: %g", exp);
    // float sharp = src->zed->getSharpening();
    // GST_INFO(" * Default Sharpening: %g", sharp);

    GST_INFO("CAMERA CONTROL PARAMETERS");
    int res;

    // AE ANTI BANDING
    res = src->zed->setAEAntiBanding(static_cast<oc::AEANTIBANDING>(src->ae_anti_banding));
    if (res != 0) {
        GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND, ("Failed to set AE Anti Banding: %d", res),
                          (NULL));
        return FALSE;
    }
    std::string ae;
    switch (static_cast<GstZedXOneSrcAeAntiBand>(src->ae_anti_banding)) {
    case GST_AE_ANTI_BAND_AUTO:
        ae = "AUTO";
        break;

    case GST_AE_ANTI_BAND_50HZ:
        ae = "50 Hz";
        break;

    case GST_AE_ANTI_BAND_60HZ:
        ae = "60 Hz";
        break;

    case GST_AE_ANTI_BAND_OFF:
    default:
        ae = "OFF";
        break;
    }
    GST_INFO(" * AE Anti Banding: %s", ae.c_str());

    // COLOR SATURATION
    res = src->zed->setColorSaturation(src->color_saturation);
    if (res != 0) {
        GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND, ("Failed to set Color saturation: %d", res),
                          (NULL));
        return FALSE;
    }
    GST_INFO(" * Color Saturation: %g", src->color_saturation);

    // DENOISING
    res = src->zed->setDenoisingValue(src->denoising);
    if (res != 0) {
        GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND, ("Failed to set denoising: %d", res), (NULL));
        return FALSE;
    }
    GST_INFO(" * Denoising: %g", src->denoising);

    // EXPOSURE COMPENSATION
    res = src->zed->setExposureCompensation(src->exposure_compensation);
    if (res != 0) {
        GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                          ("Failed to set exposure compensation value: %d", res), (NULL));
        return FALSE;
    }
    GST_INFO(" * Exposure Compensation: %g", src->exposure_compensation);

    // SHARPENING
    res = src->zed->setSharpening(src->sharpening);
    if (res != 0) {
        GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                          ("Failed to set image sharpening value: %d", res), (NULL));
        return FALSE;
    }
    GST_INFO(" * Image Sharpening: %g", src->sharpening);

    // TONE MAPPING FROM GAMMA
    res = src->zed->setToneMappingFromGamma(0, src->tone_mapping_r_gamma);
    if (res != 0) {
        GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                          ("Failed to set Tone Mapping for channel red: %d", res), (NULL));
        return FALSE;
    }
    res = src->zed->setToneMappingFromGamma(1, src->tone_mapping_g_gamma);
    if (res != 0) {
        GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                          ("Failed to set Tone Mapping for channel green: %d", res), (NULL));
        return FALSE;
    }
    res = src->zed->setToneMappingFromGamma(2, src->tone_mapping_b_gamma);
    if (res != 0) {
        GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                          ("Failed to set Tone Mapping for channel blue: %d", res), (NULL));
        return FALSE;
    }
    GST_INFO(" * Tone Mapping from gamma: [%g,%g,%g]", src->tone_mapping_r_gamma, src->tone_mapping_g_gamma, src->tone_mapping_b_gamma);

    // EXPOSURE
    if (src->auto_exposure == TRUE) {
        res = src->zed->setAutomaticExposure();
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to set Automatic exposure: %d", res), (NULL));
            return FALSE;
        }
        GST_INFO(" * Automatic Exposure: TRUE");
        res = src->zed->setFrameExposureRange(src->exposure_range_min, src->exposure_range_max);
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to set Automatic exposure range: %d", res), (NULL));
            return FALSE;
        }
        GST_INFO(" * Automatic Exposure range: [%d,%d] µsec", src->exposure_range_min,
                 src->exposure_range_max);
    } else {
        uint64_t min, max;
        res = src->zed->getFrameExposureRange(min, max);
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to retrieve exposure limits: %d", res), (NULL));
            return FALSE;
        }

        if (src->manual_exposure_usec > max) {
            GST_WARNING("Manual exposure time (%d) setting is higher than the maximum limit "
                        "(%d). "
                        "Value truncated to %d µsec",
                        src->manual_exposure_usec, (int) max, (int) max);
            src->manual_exposure_usec = max;
        }
        if (src->manual_exposure_usec < min) {
            GST_WARNING("Manual exposure time (%d) setting is lower than the minimum limit "
                        "(%d). "
                        "Value truncated to %d µsec",
                        src->manual_exposure_usec, (int) min, (int) min);
            src->manual_exposure_usec = min;
        }
        res = src->zed->setManualTimeExposure((uint64_t) src->manual_exposure_usec);

        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND, ("Failed to set Manual exposure: %d", res),
                              (NULL));
            return FALSE;
        }
        GST_INFO(" * Manual Exposure: %d µsec", src->manual_exposure_usec);
    }

    // ANALOG GAIN
    if (src->auto_analog_gain == TRUE) {
        res = src->zed->setAutomaticAnalogGain();
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to set Automatic Analog Gain: %d", res), (NULL));
            return FALSE;
        }
        GST_INFO(" * Automatic Analog Gain: TRUE");
        res = src->zed->setAnalogFrameGainRange(src->analog_frame_gain_range_min,
                                                src->analog_frame_gain_range_max);
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to set Automatic Analog Gain range: %d", res), (NULL));
            return FALSE;
        }
        GST_INFO(" * Automatic Analog Gain range: [%d,%d] dB", src->analog_frame_gain_range_min,
                 src->analog_frame_gain_range_max);
    } else {
        float min, max;
        res = src->zed->getAnalogGainLimits(min, max);
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to retrieve analog gain limits: %d", res), (NULL));
            return FALSE;
        }

        if (src->manual_analog_gain_db > max) {
            GST_WARNING("Manual analog gain (%g) setting is higher than the maximum limit "
                        "(%g). "
                        "Value truncated to %g dB",
                        src->manual_analog_gain_db, max, max);
            src->manual_analog_gain_db = max;
        }
        if (src->manual_analog_gain_db < min) {
            GST_WARNING("Manual analog gain time (%g) setting is lower than the minimum limit "
                        "(%g). "
                        "Value truncated to %g dB",
                        src->manual_analog_gain_db, min, min);
            src->manual_analog_gain_db = min;
        }
        res = src->zed->setManualAnalogGainReal(src->manual_analog_gain_db);

        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to set Manual Analog Gain: %d", res), (NULL));
            return FALSE;
        }
        GST_INFO(" * Manual Analog Gain: %g dB", src->manual_analog_gain_db);
    }

    // DIGITAL GAIN
    if (src->auto_digital_gain == TRUE) {
        res = src->zed->setAutomaticDigitalGain();
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to set Automatic Digital Gain: %d", res), (NULL));
            return FALSE;
        }
        GST_INFO(" * Automatic Digital Gain: TRUE");
        res = src->zed->setDigitalFrameGainRange(src->digital_frame_gain_range_min,
                                                 src->digital_frame_gain_range_max);
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to set Automatic Digital Gain range: %d", res), (NULL));
            return FALSE;
        }
        GST_INFO(" * Automatic Digital Gain range: [%g,%g]", src->digital_frame_gain_range_min,
                 src->digital_frame_gain_range_max);
    } else {
        float min, max;
        res = src->zed->getDigitalGainLimits(min, max);
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to retrieve digital gain limits: %d", res), (NULL));
            return FALSE;
        }

        if (src->manual_digital_gain_value > max) {
            GST_WARNING("Manual digital gain (%d) setting is higher than the maximum limit "
                        "(%g). "
                        "Value truncated to %g",
                        src->manual_digital_gain_value, max, max);
            src->manual_digital_gain_value = max;
        }
        if (src->manual_digital_gain_value < min) {
            GST_WARNING("Manual digital gain time (%d) setting is lower than the minimum limit "
                        "(%g). "
                        "Value truncated to %g",
                        src->manual_digital_gain_value, min, min);
            src->manual_digital_gain_value = min;
        }
        res = src->zed->setManualDigitalGainReal(src->manual_digital_gain_value);

        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to set Manual Digital Gain: %d", res), (NULL));
            return FALSE;
        }
        GST_INFO(" * Manual Digital Gain: %d", src->manual_digital_gain_value);
    }

    // WHITE BALANCE
    if (src->auto_wb == TRUE) {
        res = src->zed->setAutomaticWhiteBalance(TRUE);
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to set Automatic White Balance: %d", res), (NULL));
            return FALSE;
        }
        GST_INFO(" * Automatic White Balance: TRUE");
    } else {
        res = src->zed->setAutomaticWhiteBalance(FALSE);
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to set Automatic White Balance: %d", res), (NULL));
            return FALSE;
        }
        res = src->zed->setManualWhiteBalance(src->manual_wb);
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to set White Balance value: %d", res), (NULL));
            return FALSE;
        }
        GST_INFO(" * Manual White Balance: %d°", src->manual_wb);
    }

    // REGION OF INTEREST FOR AEC AND AGC    
    if (src->aec_agc_roi_x != -1 && src->aec_agc_roi_x != -1 && src->aec_agc_roi_w != -1 &&
        src->aec_agc_roi_h != -1) {
        oc::Rect roi;
        roi.x = src->aec_agc_roi_x;
        roi.y = src->aec_agc_roi_y;
        roi.width = src->aec_agc_roi_w;
        roi.height = src->aec_agc_roi_h;
        res = src->zed->setROIforAECAGC(roi);
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to set ROI for AEC and AGC: %d", res), (NULL));

            if(res==7) {
                GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("ROI size is too small"), (NULL));
            }

            return FALSE;
        }
        GST_INFO(" * AEC/AGC ROI: Origin (%d,%d) - Size %d x %d", src->aec_agc_roi_x,
                 src->aec_agc_roi_y, src->aec_agc_roi_w, src->aec_agc_roi_h);
    } else {
        GST_INFO(" * AEC/AGC ROI: DISABLED");
    }
    // <---- Camera Controls

    if (!gst_zedxonesrc_calculate_caps(src)) {
        return FALSE;
    }

    return TRUE;
}

static gboolean gst_zedxonesrc_stop(GstBaseSrc *bsrc) {
    GstZedXOneSrc *src = GST_ZED_X_ONE_SRC(bsrc);

    GST_TRACE_OBJECT(src, "gst_zedxonesrc_stop");

    gst_zedxonesrc_reset(src);

    return TRUE;
}

static GstCaps *gst_zedxonesrc_get_caps(GstBaseSrc *bsrc, GstCaps *filter) {
    GstZedXOneSrc *src = GST_ZED_X_ONE_SRC(bsrc);
    GstCaps *caps;

    if (src->caps) {
        caps = gst_caps_copy(src->caps);
    } else {
        caps = gst_pad_get_pad_template_caps(GST_BASE_SRC_PAD(src));
    }

    GST_DEBUG_OBJECT(src, "The caps before filtering are %" GST_PTR_FORMAT, caps);

    if (filter && caps) {
        GstCaps *tmp = gst_caps_intersect(caps, filter);
        gst_caps_unref(caps);
        caps = tmp;
    }

    GST_DEBUG_OBJECT(src, "The caps after filtering are %" GST_PTR_FORMAT, caps);

    return caps;
}

static gboolean gst_zedxonesrc_set_caps(GstBaseSrc *bsrc, GstCaps *caps) {
    GstZedXOneSrc *src = GST_ZED_X_ONE_SRC(bsrc);
    GST_TRACE_OBJECT(src, "gst_zedxonesrc_set_caps");

    GstVideoInfo vinfo;

    gst_caps_get_structure(caps, 0);

    GST_DEBUG_OBJECT(src, "The caps being set are %" GST_PTR_FORMAT, caps);

    gst_video_info_from_caps(&vinfo, caps);

    if (GST_VIDEO_INFO_FORMAT(&vinfo) == GST_VIDEO_FORMAT_UNKNOWN) {
        goto unsupported_caps;
    }

    return TRUE;

unsupported_caps:
    GST_ERROR_OBJECT(src, "Unsupported caps: %" GST_PTR_FORMAT, caps);
    return FALSE;
}

static gboolean gst_zedxonesrc_unlock(GstBaseSrc *bsrc) {
    GstZedXOneSrc *src = GST_ZED_X_ONE_SRC(bsrc);

    GST_TRACE_OBJECT(src, "gst_zedxonesrc_unlock");

    src->stop_requested = TRUE;

    return TRUE;
}

static gboolean gst_zedxonesrc_unlock_stop(GstBaseSrc *bsrc) {
    GstZedXOneSrc *src = GST_ZED_X_ONE_SRC(bsrc);

    GST_TRACE_OBJECT(src, "gst_zedxonesrc_unlock_stop");

    src->stop_requested = FALSE;

    return TRUE;
}

static GstFlowReturn gst_zedxonesrc_fill(GstPushSrc *psrc, GstBuffer *buf) {
    GstZedXOneSrc *src = GST_ZED_X_ONE_SRC(psrc);

    GST_TRACE_OBJECT(src, "gst_zedxonesrc_fill");

    GstMapInfo minfo;
    GstClock *clock;
    GstClockTime clock_time;

    static int temp_ugly_buf_index = 0;

    if (!src->is_started) {
        src->acq_start_time = gst_clock_get_time(gst_element_get_clock(GST_ELEMENT(src)));

        src->is_started = TRUE;
    }

    // ----> Check if a new frame is available
    auto start = std::chrono::system_clock::now();
    while (!src->zed->isNewFrame()) {
        auto end = std::chrono::system_clock::now();
        auto elapsed = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
        if (elapsed.count() > src->cam_timeout_msec) {
            GST_ELEMENT_ERROR(src, RESOURCE, FAILED, ("Camera timeout. Disconnected?"), (NULL));
            return GST_FLOW_ERROR;
        }
    }
    // <---- Check if a new frame is available

    // ----> Clock update
    clock = gst_element_get_clock(GST_ELEMENT(src));
    clock_time = gst_clock_get_time(clock);
    gst_object_unref(clock);
    // <---- Clock update

    // Memory mapping
    if (FALSE == gst_buffer_map(buf, &minfo, GST_MAP_WRITE)) {
        GST_ELEMENT_ERROR(src, RESOURCE, FAILED, ("Failed to map buffer for writing"), (NULL));
        return GST_FLOW_ERROR;
    }

    // ----> Check memory size
    gsize data_size = static_cast<gsize>(src->zed->getWidth() * src->zed->getHeight() *
                                         src->zed->getNumberOfChannels());
    if (minfo.size != data_size) {
        GST_ELEMENT_ERROR(src, RESOURCE, FAILED, ("ZED X One Data size mismatch!"), (NULL));
        return GST_FLOW_ERROR;
    }
    // <---- Check memory size

    // ----> Memory copy
    memcpy(minfo.data, src->zed->getPixels(), minfo.size);
    // <---- Memory copy

    // ----> Camera controls
    int res;

    // COLOR SATURATION
    float sat = src->zed->getColorSaturation();
    if (fabs(sat - src->color_saturation) > 0.5f) {
        res = src->zed->setColorSaturation(src->color_saturation);
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND, ("Failed to set Color saturation: %d", res),
                              (NULL));
        }
    }

    // DENOISING
    float den = src->zed->getDenoisingValue();
    if (fabs(den - src->denoising) > 0.1f) {
        res = src->zed->setDenoisingValue(src->denoising);
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND, ("Failed to set Denoising: %d", res),
                              (NULL));
        }
    }

    // EXPOSURE COMPENSATION
    float exp_comp = src->zed->getExposureCompensation();
    if (fabs(exp_comp - src->exposure_compensation) > 0.1f) {
        res = src->zed->setExposureCompensation(src->exposure_compensation);
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND,
                              ("Failed to set Exposure Compensation: %d", res), (NULL));
        }
    }

    // SHARPENING
    float sharp = src->zed->getSharpening();
    if (fabs(sharp - src->sharpening) > 0.1f) {
        res = src->zed->setSharpening(src->sharpening);
        if (res != 0) {
            GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND, ("Failed to set Image Sharpening: %d", res),
                              (NULL));
        }
    }

    // EXPOSURE
    if (src->auto_exposure == FALSE) {
        gint exp = static_cast<gint>(src->zed->getFrameExposureTime());
        if (abs(exp - src->manual_exposure_usec) > 10) {
            if (src->zed->setManualTimeExposure((uint64_t) src->manual_exposure_usec) != 0) {
                GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND, ("Failed to set Manual Exposure"),
                                  (NULL));
            }
            GST_INFO("Forced manual exposure value. Expected %d, was %d", src->manual_exposure_usec,
                     exp);
        }
    }

    // DIGITAL GAIN
    if (src->auto_digital_gain == FALSE) {
        float dig_gain = src->zed->getDigitalFrameGain();
        if (fabs(dig_gain - src->manual_digital_gain_value) > 5.0) {
            if (src->zed->setManualDigitalGainReal(src->manual_digital_gain_value) != 0) {
                GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND, ("Failed to set Manual Digital Gain"),
                                  (NULL));
            }
            GST_INFO("Forced manual digital gain value. Expected %d, was %g",
                     src->manual_digital_gain_value, dig_gain);
        }
    }

    // WHITE BALANCE
    if (src->auto_wb == FALSE) {
        gint wb = static_cast<int>(src->zed->getManualWhiteBalance());
        if (abs(wb - src->manual_wb) > 5.0) {
            if (src->zed->setManualWhiteBalance(src->manual_wb) != 0) {
                GST_ELEMENT_ERROR(src, RESOURCE, NOT_FOUND, ("Failed to set Manual White Balance"),
                                  (NULL));
            }
            GST_INFO("Forced manual white balance value. Expected %d, was %d", src->manual_wb, wb);
        }
    }
    // <---- Camera controls

    // // ----> Info metadata
    // sl::CameraInformation cam_info = src->zed->getCameraInformation();
    // ZedInfo info;
    // info.cam_model = (gint) cam_info.camera_model;
    // info.stream_type = src->stream_type;
    // info.grab_single_frame_width = cam_info.camera_configuration.resolution.width;
    // info.grab_single_frame_height = cam_info.camera_configuration.resolution.height;
    // if (info.grab_single_frame_height == 752 || info.grab_single_frame_height == 1440 ||
    //     info.grab_single_frame_height == 2160 || info.grab_single_frame_height == 2484) {
    //     info.grab_single_frame_height /= 2;   // Only half buffer size if the stream is composite
    // }
    // // <---- Info metadata

    // // ----> Sensors metadata
    // ZedSensors sens;
    // if (src->zed->getCameraInformation().camera_model != sl::MODEL::ZED) {
    //     sens.sens_avail = TRUE;
    //     sens.imu.imu_avail = TRUE;

    //     sl::SensorsData sens_data;
    //     src->zed->getSensorsData(sens_data, sl::TIME_REFERENCE::IMAGE);

    //     sens.imu.acc[0] = sens_data.imu.linear_acceleration.x;
    //     sens.imu.acc[1] = sens_data.imu.linear_acceleration.y;
    //     sens.imu.acc[2] = sens_data.imu.linear_acceleration.z;
    //     sens.imu.gyro[0] = sens_data.imu.angular_velocity.x;
    //     sens.imu.gyro[1] = sens_data.imu.angular_velocity.y;
    //     sens.imu.gyro[2] = sens_data.imu.angular_velocity.z;

    //     if (src->zed->getCameraInformation().camera_model != sl::MODEL::ZED_M) {
    //         sens.mag.mag_avail = TRUE;
    //         sens.mag.mag[0] = sens_data.magnetometer.magnetic_field_calibrated.x;
    //         sens.mag.mag[1] = sens_data.magnetometer.magnetic_field_calibrated.y;
    //         sens.mag.mag[2] = sens_data.magnetometer.magnetic_field_calibrated.z;
    //         sens.env.env_avail = TRUE;

    //         float temp;
    //         sens_data.temperature.get(sl::SensorsData::TemperatureData::SENSOR_LOCATION::BAROMETER,
    //                                   temp);
    //         sens.env.temp = temp;
    //         sens.env.press = sens_data.barometer.pressure * 1e-2;

    //         float tempL, tempR;
    //         sens_data.temperature.get(
    //             sl::SensorsData::TemperatureData::SENSOR_LOCATION::ONBOARD_LEFT, tempL);
    //         sens_data.temperature.get(
    //             sl::SensorsData::TemperatureData::SENSOR_LOCATION::ONBOARD_RIGHT, tempR);
    //         sens.temp.temp_avail = TRUE;
    //         sens.temp.temp_cam_left = tempL;
    //         sens.temp.temp_cam_right = tempR;
    //     } else {
    //         sens.mag.mag_avail = FALSE;
    //         sens.env.env_avail = FALSE;
    //         sens.temp.temp_avail = FALSE;
    //     }
    // } else {
    //     sens.sens_avail = FALSE;
    //     sens.imu.imu_avail = FALSE;
    //     sens.mag.mag_avail = FALSE;
    //     sens.env.env_avail = FALSE;
    //     sens.temp.temp_avail = FALSE;
    // }
    // // <---- Sensors metadata metadata

    // ----> Timestamp meta-data
    GST_BUFFER_TIMESTAMP(buf) =
        GST_CLOCK_DIFF(gst_element_get_base_time(GST_ELEMENT(src)), clock_time);
    GST_BUFFER_DTS(buf) = GST_BUFFER_TIMESTAMP(buf);
    GST_BUFFER_OFFSET(buf) = temp_ugly_buf_index++;
    // <---- Timestamp meta-data

    // guint64 offset = GST_BUFFER_OFFSET(buf);
    // GstZedSrcMeta *meta = gst_buffer_add_zed_src_meta(buf, info, pose, sens,
    //                                                   src->object_detection | src->body_tracking,
    //                                                   obj_count, obj_data, offset);

    // Buffer release
    gst_buffer_unmap(buf, &minfo);
    // gst_buffer_unref(buf); // NOTE(Walter) do not uncomment to not crash

    if (src->stop_requested) {
        return GST_FLOW_FLUSHING;
    }

    return GST_FLOW_OK;
}

static gboolean plugin_init(GstPlugin *plugin) {
    GST_DEBUG_CATEGORY_INIT(gst_zedxonesrc_debug, "zedxonesrc", 0,
                            "debug category for zedxonesrc element");
    gst_element_register(plugin, "zedxonesrc", GST_RANK_NONE, gst_zedxonesrc_get_type());

    return TRUE;
}

GST_PLUGIN_DEFINE(GST_VERSION_MAJOR, GST_VERSION_MINOR, zedxonesrc, "Zed X One camera source",
                  plugin_init, GST_PACKAGE_VERSION, GST_PACKAGE_LICENSE, GST_PACKAGE_NAME,
                  GST_PACKAGE_ORIGIN)
