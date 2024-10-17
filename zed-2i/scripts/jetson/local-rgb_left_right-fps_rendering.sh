#!/bin/bash -e

# Example pipeline to acquire a stream at default resolution with RGB Left and Right information and 
# displaying the results on screen with FPS information

# 1) Start `zedsrc` to acquire RGB left and right streams
# 2) Demux the composite left/right stream
# 3) Render left stream with FPS info
# 4) Render right stream with FPS info

gst-launch-1.0 \
zedsrc stream-type=2 ! queue ! \
zeddemux is-depth=false name=demux \
demux.src_left ! queue ! autovideoconvert ! fpsdisplaysink \
demux.src_aux ! queue ! autovideoconvert ! fpsdisplaysink
