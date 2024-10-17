#!/bin/bash -e

# Example pipeline to acquire a ZED X One stream and render it displaying the current FPS using default values for each parameter

gst-launch-1.0 zedxonesrc ! queue ! autovideoconvert ! queue ! fpsdisplaysink
