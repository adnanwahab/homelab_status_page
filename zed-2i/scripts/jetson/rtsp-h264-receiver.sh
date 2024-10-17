#!/bin/bash -e

# Example pipeline to start an RTSP client on the same machine of the server

HOST_IPS=(`hostname -I`)
export SERVER_IP=${HOST_IPS[0]}

gst-launch-1.0 rtspsrc location=rtsp://${SERVER_IP}:8554/zed-stream latency=0 ! decodebin ! fpsdisplaysink

