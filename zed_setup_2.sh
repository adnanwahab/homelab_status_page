echo "Checking GStreamer plugin path..."
GST_PLUGIN_PATH_ADDITION="/usr/local/zed/lib/gstreamer-1.0"
if [[ ":$GST_PLUGIN_PATH:" != *":$GST_PLUGIN_PATH_ADDITION:"* ]]; then
    export GST_PLUGIN_PATH="$GST_PLUGIN_PATH_ADDITION:$GST_PLUGIN_PATH"
fi
echo "GST_PLUGIN_PATH is set to: $GST_PLUGIN_PATH"

# Verify the ZED GStreamer plugin
echo "Verifying ZED GStreamer plugin..."
gst-inspect-1.0 zedsrc

if [ $? -eq 0 ]; then
    echo "ZED GStreamer plugin successfully installed."
else
    echo "ZED GStreamer plugin not found or not installed correctly."
    echo "Checking for the plugin file..."
    if [ -f "/usr/local/zed/lib/gstreamer-1.0/libgstzedsrc.so" ]; then
        echo "Plugin file found. Ensure that the GST_PLUGIN_PATH is correctly set in your environment."
    else
        echo "Plugin file not found. The ZED SDK installation might not have included the GStreamer plugin."
    fi
fi

echo "Script finished."