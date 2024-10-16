#!/bin/bash

# Install necessary dependencies
echo "Installing required dependencies..."
sudo apt update
sudo apt install -y git cmake gstreamer1.0-dev gstreamer1.0-plugins-base gstreamer1.0-plugins-good libgstreamer-plugins-base1.0-dev

# Clone the zed-gstreamer repository
echo "Cloning ZED GStreamer plugin repository..."
git clone https://github.com/stereolabs/zed-gstreamer.git
cd zed-gstreamer/gst-zed-src

# Build the plugin
echo "Building the ZED GStreamer plugin..."
mkdir build
cd build
cmake ..
make

# Install the plugin
echo "Installing the ZED GStreamer plugin..."
sudo make install

# Verify installation
echo "Verifying the plugin installation..."
gst-inspect-1.0 zedsrc

# Optional: Set GST_PLUGIN_PATH if needed
echo "Setting GST_PLUGIN_PATH (if necessary)..."
export GST_PLUGIN_PATH=/usr/local/lib/gstreamer-1.0:$GST_PLUGIN_PATH

echo "Installation completed!"