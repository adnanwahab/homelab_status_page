:: Example pipeline to acquire a stream at default resolution with RGB and Skeleton Tracking information and 
:: displaying the results

:: 1) Start `zedsrc` to acquire RGB enabling Skeleton Tracking (ACCURATE).
:: 2) Add detected skeleton overlays to the frame
:: 3) Convert the stream and display it with FPS information

gst-launch-1.0 ^
zedsrc stream-type=0 od-enabled=true od-detection-model=2 ! queue ! ^
zedodoverlay ! queue ! ^
autovideoconvert ! fpsdisplaysink
