#!/bin/bash -e

# Example pipeline to acquire a stream with optimized resolution and framerate for the connected camera with RGB, 
# Depth and Object Detection information and displaying the data on screen

# 1) Start `zedsrc` to acquire RGB and depth with automatic resolution and FPS enabling MULTI_CLASS_BOX_ACCURATE detection.
# 2) Define `zeddemux` object named `demux` to demux the `zedsrc` composite stream creating two single streams: RGB and Depth.
# 3) Draw Object Detection overlays and render it using the `fpsdisplaysink` sink plugin.
# 4) Display the depth stream with FPS info using the `fpsdisplaysink` sink plugin.

gst-launch-1.0 \
zedsrc stream-type=4 od-enabled=true od-detection-model=2 ! \
zeddemux name=demux \
demux.src_left ! queue ! zedodoverlay ! queue ! autovideoconvert ! fpsdisplaysink \
demux.src_aux ! queue ! autovideoconvert ! fpsdisplaysink

