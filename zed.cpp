#include <sl/Camera.hpp>

int main(int argc, char **argv) {
    // Create a ZED camera object

    std::cout << "HELLO WORLD" << std::endl;

    sl::Camera zed;

    // Set configuration parameters
    sl::InitParameters init_params;
    init_params.camera_resolution = sl::RESOLUTION::HD720; // Set the resolution
    init_params.camera_fps = 30; // Set the FPS

    // Open the camera
    sl::ERROR_CODE err = zed.open(init_params);
    if (err != sl::ERROR_CODE::SUCCESS) {
        std::cout << "Failed to open camera" << std::endl;
        return 1;
    }

    // Capture images in a loop
    sl::Mat image;
    while (true) {
        // Grab a new image
        if (zed.grab() == sl::ERROR_CODE::SUCCESS) {
            // Retrieve the left image
            zed.retrieveImage(image, sl::VIEW::LEFT);
            // Display the image using OpenCV or other display methods
            // ...
        }
    }

    // Close the camera
    zed.close();
    return 0;
}
