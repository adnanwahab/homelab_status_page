# #!/bin/bash

# # Update system and install GStreamer
# echo "Updating system and installing GStreamer..."
# sudo apt update
# sudo apt install -y gstreamer1.0-tools gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly

# # Check if ZED SDK is installed
# ZED_DIR="/usr/local/zed"
# if [ -d "$ZED_DIR" ]; then
#     echo "ZED SDK found at $ZED_DIR"
# else
#     echo "ZED SDK not found, please install the ZED SDK before proceeding."
#     exit 1
# fi

# # Reinstall the ZED SDK with GStreamer plugin (if available)
# ZED_SDK_RUN="$HOME/Downloads/ZED_SDK_Tegra_L4T36.3_v4.2.1.zstd.run"
# if [ -f "$ZED_SDK_RUN" ]; then
#     echo "Reinstalling ZED SDK..."
#     chmod +x "$ZED_SDK_RUN"
#     sudo "$ZED_SDK_RUN" --quiet -- --accept_license --install_gst=yes
# else
#     echo "ZED SDK installer not found in ~/Downloads. Please download it and try again."
#     exit 1
# fi

# # Check if GStreamer plugin path is set
# echo "Checking GStreamer plugin path..."
# export GST_PLUGIN_PATH=/usr/local/zed/resources/gstreamer:$GST_PLUGIN_PATH

# # Verify the ZED GStreamer plugin
# echo "Verifying ZED GStreamer plugin..."
# gst-inspect-1.0 zedsrc

# if [ $? -eq 0 ]; then
#     echo "ZED GStreamer plugin successfully installed."
# else
#     echo "ZED GStreamer plugin not found or not installed correctly."
# fi

# echo "Script finished."
# sudo apt update
# sudo apt upgrade

# sudo apt install nvidia-cuda-dev=11.5.1-1ubuntu1
# wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin
# sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600
# sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/3bf863cc.pub
# sudo add-apt-repository "deb https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/ /"
# sudo apt update

# sudo apt install nvidia-cuda-toolkit

# sudo apt remove --purge nvidia-cuda-toolkit nvidia-cuda-dev
# sudo apt autoremove
# sudo apt clean
# sudo apt update
# sudo apt install nvidia-cuda-toolkit


# sudo apt install aptitude
# sudo aptitude install nvidia-cuda-toolkit


# apt-cache policy nvidia-cuda-toolkit nvidia-cuda-dev


# ... existing code ...

# Install CUDA toolkit for Jetson
# echo "Installing CUDA toolkit for Jetson..."
# sudo apt update
# sudo apt install -y nvidia-jetpack

# # Set up CUDA environment variables
# echo "Setting up CUDA environment variables..."
# echo 'export PATH=/usr/local/cuda/bin${PATH:+:${PATH}}' >> ~/.bashrc
# echo 'export LD_LIBRARY_PATH=/usr/local/cuda/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}' >> ~/.bashrc
# source ~/.bashrc

# # Verify CUDA installation
# echo "Verifying CUDA installation..."
# nvcc --version

# # ... existing code ...

# # Update compiler flags
# echo "Updating compiler flags..."
# export CPATH=$CPATH:/usr/local/cuda/include
# export LIBRARY_PATH=$LIBRARY_PATH:/usr/local/cuda/lib64

# echo "Script finished. Please restart your terminal or run 'source ~/.bashrc' to apply changes."


# # ... existing code ...

# # Install CUDA toolkit for Jetson
# echo "Installing CUDA toolkit for Jetson..."
# sudo apt update
# sudo apt install -y nvidia-jetpack

# # Set up CUDA environment variables
# echo "Setting up CUDA environment variables..."
# echo 'export PATH=/usr/local/cuda/bin${PATH:+:${PATH}}' >> ~/.bashrc
# echo 'export LD_LIBRARY_PATH=/usr/local/cuda/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}' >> ~/.bashrc

# Add CUDA include and library paths
# echo 'export CPATH=$CPATH:/usr/local/cuda/include' >> ~/.bashrc
# echo 'export LIBRARY_PATH=$LIBRARY_PATH:/usr/local/cuda/lib64' >> ~/.bashrc

# # Source the updated .bashrc
# source ~/.bashrc

# # Verify CUDA installation
# echo "Verifying CUDA installation..."
# if command -v nvcc &> /dev/null; then
#     nvcc --version
# else
#     echo "CUDA installation not found in PATH. Please check your installation."
# fi

# # Create a symbolic link for cuda.h if it doesn't exist
# if [ ! -f /usr/local/cuda/include/cuda.h ]; then
#     echo "Creating symbolic link for cuda.h..."
#     sudo ln -s /usr/lib/cuda/include/cuda.h /usr/local/cuda/include/cuda.h
# fi

# echo "Script finished. Please restart your terminal or run 'source ~/.bashrc' to apply changes."

# ... existing code ...

# Add ZED SDK library path to LD_LIBRARY_PATH
echo 'export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/zed/lib' >> ~/.bashrc

# Add ZED SDK binary path to PATH
echo 'export PATH=$PATH:/usr/local/zed/bin' >> ~/.bashrc

# Source the updated .bashrc
source ~/.bashrc

# Verify ZED SDK installation
echo "Verifying ZED SDK installation..."
if [ -d "/usr/local/zed" ]; then
    echo "ZED SDK found in /usr/local/zed"
    ls -l /usr/local/zed/lib | grep "libsl_"
else
    echo "ZED SDK not found in /usr/local/zed. Please check your installation."
fi

# ... existing code ...

echo "Script finished. Please restart your terminal or run 'source ~/.bashrc' to apply changes."
sudo find / -name "libsl_core.so*" 2>/dev/null
g++ zed.cpp -o zed_example -I/usr/local/zed/include -L/usr/local/zed/lib -lsl_zed -lsl_ai -lGL -lGLEW -lGLU -lglut -lpthread
#g++ zed.cpp -o zed_example -I/usr/local/zed/include -L/usr/local/zed/lib -lsl_zed_static -lsl_ai -lGL -lGLEW -lGLU -lglut -lpthread


#    export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/zed/lib

#       echo 'export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/zed/lib' >> ~/.bashrc
#    source ~/.bashrc


# rust desk a zed tool