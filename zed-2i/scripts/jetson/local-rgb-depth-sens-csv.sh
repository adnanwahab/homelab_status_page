#!/bin/bash -e

# Example pipeline to acquire a stream at default resolution with RGB, Depth and Sensor Data and save them to a CSV file for logging

# 1) Start `zedsrc` to acquire RGB and depth at default resolution
# 2) Define `zeddemux` object named `demux` to demux the `zedsrc` composite stream creating three single streams: RGB, Depth and data.
# 3) Display RGB left stream with FPS info
# 4) Display Depth stream with FPS info.
# 5) Save the sensor data in the home folder to CSV file named `test_csv.csv` replacing eventual existing data

gst-launch-1.0 \
zedsrc stream-type=4 depth-mode=3 ! \
zeddemux stream-data=TRUE name=demux \
demux.src_left ! queue ! autovideoconvert ! fpsdisplaysink \
demux.src_aux ! queue ! autovideoconvert ! fpsdisplaysink \
demux.src_data ! queue ! zeddatacsvsink location="${HOME}/test_csv.csv" append=FALSE
