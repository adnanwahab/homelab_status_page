LATEST CHANGES
==============

2024-04-23
----------
- Add new `zedxonesrc` element to get ZED X One color stream and control the camera

2024-04-05
----------
- Add ZED SDK v4.1 compatibility
- Add support to `NEURAL_PLUS` depth mode
- Add runtime update of Gain and Exposure. Thx @ryanppeters
- Add new property `positional-tracking-mode` to select `GEN_1` and `GEN_2`

ZED SDK v4.0.8
--------------

* Compatible with ZED SDK v4.0.y
* Add support for ZED X and ZED X Mini cameras
* Update `camera-resolution` and `camera-fps` parameters to match the new options
* Add new `jetson` script folder
* `sdk-verbose` is now an integer [0,1000] parameter
* `depth-stabilization` is now an integer [0,100] parameter
* Add new property `od-detection-filter-mode`
* Add new property `od-conf-person`
* Add new property `od-conf-vehicle`
* Add new property `od-conf-bag`
* Add new property `od-conf-animal`
* Add new property `od-conf-electronics`
* Add new property `od-conf-fruit-vegetables`
* Add new property `od-conf-electronics`
* Add new property `od-conf-sport`
* Change `sensing-mode` to `fill-mode`
* Add new property `bt-allow-red-prec`
* Add new property `bt-body-fitting`
* Add new property `bt-body-tracking`
* Add new property `bt-confidence `
* Add new property `bt-detection-model`
* Add new property `bt-enabled`
* Add new property `bt-format`
* Add new property `bt-image-sync`
* Add new property `bt-max-range`
* Add new property `bt-min-keypoints`
* Add new property `bt-prediction-timeout-s`
* Add new property `bt-smoothing`
* Change `aec-agc` to `ctrl-aec-agc`
* Change `aec-agc-roi-h` to `ctrl-aec-agc-roi-h`
* Change `aec-agc-roi-side` to `ctrl-aec-agc-roi-side`
* Change `aec-agc-roi-w` to `ctrl-aec-agc-roi-w`
* Change `aec-agc-roi-x` to `ctrl-aec-agc-roi-x`
* Change `aec-agc-roi-y` to `ctrl-aec-agc-roi-y`
* Change `brightness` to `ctrl-brightness`
* Change `contrast` to `ctrl-contrast`
* Change `exposure` to `ctrl-exposure`
* Change `gain` to `ctrl-gain`
* Change `gamma` to `ctrl-gamma`
* Change `hue` to `ctrl-hue`
* Change `led-status` to `ctrl-led-status`
* Change `saturation` to `ctrl-saturation`
* Change `sharpness` to `ctrl-sharpness`
* Change `whitebalance-auto` to `ctrl-whitebalance-auto`
* Change `whitebalance-temperature` to `ctrl-whitebalance-temperature`

ZED SDK v3.8
-------------

- Add support for Region of Interest [Thx @ryanppeters]
  * Add `roi` parameter
  * Add `roi-x` parameter
  * Add `roi-y` parameter
  * Add `roi-w` parameter
  * Add `roi-h` parameter
- Add `set-gravity-as-origin` property [Thx @ryanppeters] 
- Add `od-prediction-timeout-s` property [Thx @ryanppeters]
- Add `od-allow-reduced-precision-inference` property [Thx @ryanppeters]
- Add new field `frame_id` to `GstZedSrcMeta`  in order to track the meta/buffer throughout the GStreamer pipeline (when working with source code) [Thx @ryanppeters]
- Add support for new Object Detection models in `od-detection-model` (Person Head and Person Head ACCURATE)

ZED SDK v3.7
-------------

- Fix issue with texture confidence threshold invalidating the depth map
- Add support for NEURAL depth mode

ZED SDK v3.5
-------------

- Add compatibility fix for ZED SDK v3.5
- Add support for new camera model "ZED 2i"
- Improve Depth Handling and new `zedsrc` parameters
- Depth mode has now a default value of NONE.
  To disable the depth elaboration it is also necessary to disable the positional tracking and the object detection, 
  so the values of the relative activation options have been set to false as default.
  The zedsrc element now starts without performing any depth elaboration with the default settings. 
- Add new object detection models:
  * GST_ZEDSRC_OD_MULTI_CLASS_BOX_MEDIUM
  * GST_ZEDSRC_OD_HUMAN_BODY_MEDIUM
- Add support for object subclasses
- New Positional Tracking parameters
  * area-file-path
  * enable-area-memory
  * enable-imu-fusion
  * enable-pos
  * set-floor-as-origine-smoothing
  * initial-world-transform-x
  * initial-world-transform-y
  * initial-world-transform-z
  * initial-world-transform-roll
  * initial-world-transform-pitch
  * initial-world-transform-yaw
- New Runtime parameters
  * confidence-threshold
  * sensing-mode
  * texture-confidence-threshold
  * measure3D-reference-frame  
- New Object Detection parameters
  * od-max-range
  * od-body-fitting
- Change parameters names in `zedsrc` to match the names in the ZED SDK:
  * resolution -> camera-resolution
  * framerate -> camera-fps
  * camera-is-static -> set-as-static
  * object-detection-image-sync -> od-image-sync
  * object-detection-tracking -> od-enable-tracking
  * object-detection-confidence -> od-confidence

ZED SDK v3.4
-------------

- Add compatibility fix for ZED SDK v3.4
- Add support for UINT16 Depth map

ZED SDK v3.3 (2020-11-27)
--------------------------

- Add compatibility fix for ZED SDK v3.3
- Add support for multiple OD class
- Add support for MULTICLASS ACCURATE

Release v0.1 (2020-08-24)
--------------------------

- ZED GStreamer package for Linux and Windows
- zedsrc: acquires camera color image and depth map and pushes them in a GStreamer pipeline.
- zedmeta: GStreamer library to define and handle the ZED metadata (Positional Tracking data, Sensors data, Detected Object data, Detected Skeletons data).
- zeddemux: receives a composite zedsrc stream (color left + color right data or color left + depth map + metadata), processes the eventual depth data and pushes them in two separated new streams named src_left and src_aux. A third source pad is created for metadata to be externally processed.
- zeddatamux: receive a video stream compatible with ZED caps and a ZED Data Stream generated by the zeddemux and adds metadata to the video stream. This is useful if metadata are removed by a filter that does not automatically propagate metadata
- zeddatacsvsink: example sink plugin that receives ZED metadata, extracts the Positional Tracking and the Sensors Data and save them in a CSV file.
- zedodoverlay: example transform filter plugin that receives ZED combined stream with metadata, extracts Object Detection information and draws the overlays on the oncoming filter
- RTSP Server: application for Linux that instantiates an RTSP server from a text launch pipeline "gst-launch" like.
