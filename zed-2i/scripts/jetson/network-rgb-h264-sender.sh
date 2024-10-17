#!/bin/bash -e

# Example pipeline to acquire a stream and send it on local network with H264 encoding

# install x264enc: `sudo apt-get install gstreamer1.0-libav x264 gstreamer1.0-plugins-ugly`

gst-launch-1.0 zedsrc ! timeoverlay ! tee name=split has-chain=true ! \
 queue ! autovideoconvert ! fpsdisplaysink \
 split. !  queue max-size-time=0 max-size-bytes=0 max-size-buffers=0 ! autovideoconvert ! \
 x264enc byte-stream=true tune=zerolatency speed-preset=ultrafast bitrate=3000 ! \
 h264parse ! rtph264pay config-interval=-1 pt=96 ! queue ! \
 udpsink clients=127.0.0.1:5000 max-bitrate=3000000 sync=false async=false
