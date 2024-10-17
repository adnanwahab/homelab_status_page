#!/bin/bash -e

# Example pipeline to acquire a stream and send it on local network with H264 encoding

# install x264enc: `sudo apt-get install x264 gstreamer1.0-plugins-ugly`

gst-launch-1.0 udpsrc port=5000 ! application/x-rtp,clock-rate=90000,payload=96 ! \
 queue ! rtph264depay ! h264parse ! avdec_h264 ! \
 queue ! autovideoconvert ! fpsdisplaysink


