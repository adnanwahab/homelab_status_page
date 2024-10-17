#!/bin/bash -e

# Example pipeline to acquire a stream and render it using OpenGL sink

gst-launch-1.0 zedsrc ! nv3dsink
