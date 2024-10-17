#!/bin/bash -e

# Example pipeline to resize HD1080 RGB and depth stream to VGA resolution for display purpose remuxing the Object 
# Detection metadata as input for `zedodoverlay`

# 1) Define a `zeddatamux` object named `mux` to be used to recompose the RGB+metadata stream to be used to render 
#    the result of Object Detection using `zedoddisplaysink`. The `videoscale` filter indeed removes ZED metadata
#    from the RGB stream and the `zeddatamux` adds them back
# 2) Start `zedsrc` to acquire RGB and depth at HD1080 resolution stream enabling Object Tracking
# 3) Define `zeddemux` object named `demux` to demux the `zedsrc` composite stream creating three single streams: RGB, Depth and Data.
# 4) Rescale the Depth stream to VGA resolution and render it using `fpsdisplaysink`.
# 5) Set the data stream from `demux` as input on the data sink of `mux`.
# 6) Rescale the RGB stream to VGA resolution and set it as input on the video sink of `mux`.
# 7) Set the source of the muxer as input for `zedodoverlay` to draw Object Detection overlays
# 8) Convert the stream RGB stream with Object Detection overlay and display it using `fpsdisplaysink`.

gst-launch-1.0 \
zeddatamux name=mux \
zedsrc stream-type=4 od-detection-model=0 od-enabled=true ! \
zeddemux stream-data=true is-depth=true name=demux \
demux.src_aux ! queue ! autovideoconvert ! videoscale ! video/x-raw,width=672,height=376 ! queue ! fpsdisplaysink \
demux.src_data ! mux.sink_data \
demux.src_left ! queue ! videoscale ! video/x-raw,width=672,height=376 ! mux.sink_video \
mux.src ! queue ! zedodoverlay ! queue ! \
autovideoconvert ! fpsdisplaysink
