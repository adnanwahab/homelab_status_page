#!/bin/bash -e

# Example pipeline to acquire a NEURAL depth stream and render it displaying the current FPS using default values for each parameter

gst-launch-1.0 zedsrc stream-type=3 depth-mode=4 ! queue ! autovideoconvert ! queue ! fpsdisplaysink
