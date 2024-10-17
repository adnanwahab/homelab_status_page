:: Example pipeline to acquire a depth stream and render it displaying the current FPS using default values for each parameter

gst-launch-1.0 zedsrc stream-type=3 depth-mode=5 ! queue ! autovideoconvert ! queue ! fpsdisplaysink
