#!/bin/bash -e

# Example pipeline to acquire a stream at default resolution with RGB and Depth info
# displaying the results on screen with FPS information
# 1) Start `zedsrc` to acquire RGB left and depth streams
# 2) Demux the composite left/depth stream
# 3) Render left stream with FPS info
# 4) Render depth stream with FPS info

gst-launch-1.0 \
zedsrc stream-type=4 depth-mode=3 ! queue ! \
zeddemux name=demux \
demux.src_left ! queue ! autovideoconvert ! fpsdisplaysink \
demux.src_aux ! queue ! autovideoconvert ! fpsdisplaysink
