:: Example pipeline to acquire a stream at 720p resolution with RGB and Object Detection information and 
:: displaying the results using `zedoddisplaysink`

:: 1) Start `zedsrc` to acquire RGB enabling Object Detection (MULTI-CLASS)
:: 2) Add Object Detection overlays to the frame
:: 3) Convert the stream and display it with FPS information

gst-launch-1.0 ^
zedsrc stream-type=0 od-enabled=true od-detection-model=0 ! queue ! ^
zedodoverlay ! queue ! ^
autovideoconvert ! fpsdisplaysink
