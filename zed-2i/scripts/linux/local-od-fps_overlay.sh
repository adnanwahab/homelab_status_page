#!/bin/bash -e

# Example pipeline to acquire a stream at 720p resolution with RGB, Depth and Object Detection information and 
# displaying the data on screen

# 1) Start `zedsrc` to acquire RGB and depth at 720p resolution enabling Skeleton Tracking (FAST).
# 2) Define `zeddemux` object named `demux` to demux the `zedsrc` composite stream creating two single streams: RGB and Depth.
# 3) Draw Object Detection overlays and render it using the `fpsdisplaysink` sink plugin.
# 4) Display the depth stream with FPS info using the `fpsdisplaysink` sink plugin.

gst-launch-1.0 \
zedsrc stream-type=4 bt-enabled=true bt-detection-model=0 ! \
zeddemux name=demux \
demux.src_left ! queue ! zedodoverlay ! queue ! autovideoconvert ! fpsdisplaysink \
demux.src_aux ! queue ! autovideoconvert ! fpsdisplaysink
