

print("Starting ZED camera")

import pyzed.sl as sl
# Create a Camera object
# zed = sl.Camera()
# exit()
# # Set initialization parameters
# init_params = sl.InitParameters()
# init_params.camera_resolution = sl.RESOLUTION.HD720
# init_params.camera_fps = 30

# # Open the camera
# if zed.open(init_params) != sl.ERROR_CODE.SUCCESS:
#     print("Error opening camera")
#     exit()

# # Capture images in a loop
# image = sl.Mat()
# while True:
#     if zed.grab() == sl.ERROR_CODE.SUCCESS:
#         # Retrieve the left image
#         zed.retrieve_image(image, sl.VIEW.LEFT)
#         # Process and display image
#         # ...

# # Close the camera
# zed.close()
