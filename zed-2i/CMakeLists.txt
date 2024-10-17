cmake_minimum_required(VERSION 3.10)


project(gst-plugins-zed)

################################################
## Generate symbols for IDE indexer (VSCode)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Default to C99
if(NOT CMAKE_C_STANDARD)
  set(CMAKE_C_STANDARD 99)
endif()

# Default to C++14
if(NOT CMAKE_CXX_STANDARD)
  set(CMAKE_CXX_STANDARD 14)
endif()

add_definitions(-Werror=return-type)

set(CMAKE_SHARED_MODULE_PREFIX "lib")
set(CMAKE_SHARED_LIBRARY_PREFIX "lib")

# add local cmake modules
list(APPEND CMAKE_MODULE_PATH ${CMAKE_SOURCE_DIR}/cmake/modules)

include(FindNVTegraRelease)
FindNVTegraRelease()

if(L4T_FOUND)
    message("Running on NVIDIA Jetson")
    message(" * Found L4T v${L4T_RELEASE}.${L4T_REVISION}.${L4T_PATCH}")
endif()

include(MacroLogFeature)

find_package(GStreamer REQUIRED COMPONENTS base)
macro_log_feature(GSTREAMER_FOUND "GStreamer" "Required to build ${proj_name}" "http://gstreamer.freedesktop.org/" TRUE "1.2.0")
macro_log_feature(GSTREAMER_BASE_LIBRARY_FOUND "GStreamer base library" "Required to build ${proj_name}" "http://gstreamer.freedesktop.org/" TRUE "1.2.0")

find_package(GStreamerPluginsBase COMPONENTS video)
macro_log_feature(GSTREAMER_VIDEO_LIBRARY_FOUND "GStreamer video library" "Required to build ${proj_name}" "http://gstreamer.freedesktop.org/" TRUE "1.2.0")

find_package(GLIB2 REQUIRED)
macro_log_feature(GLIB2_FOUND "GLib" "Required to build ${proj_name}" "http://www.gtk.org/" TRUE)

find_package(GObject REQUIRED)
macro_log_feature(GOBJECT_FOUND "GObject" "Required to build ${proj_name}" "http://www.gtk.org/" TRUE)

find_package(ZED 3)
macro_log_feature(ZED_FOUND "ZED SDK" "Required to build 'gstzed'" "https://www.stereolabs.com" FALSE "3")

find_package(CUDA ${ZED_CUDA_VERSION} EXACT)
macro_log_feature(CUDA_FOUND "Nvidia CUDA library" "Required to build 'gstzed'" "http://www.nvidia.com" FALSE "${ZED_CUDA_VERSION}")

find_package(OpenCV)
macro_log_feature(OpenCV_FOUND "OpenCV library" "Required to build 'gstzedodoverlay'" "http://www.opencv.org" FALSE)

if(NOT WIN32)
    pkg_check_modules(GSTRTSPSERVER gstreamer-rtsp-server-1.0>=1.14.5)
    macro_log_feature(GSTRTSPSERVER_FOUND "GSTREAMER RTSP SERVER library" "Required to build 'gstrtspserver'" "http://gstreamer.freedesktop.org/" FALSE  "1.14.5")
endif()

# Setup common environment
include_directories(
    .
    ${GSTREAMER_INCLUDE_DIR}
    ${GLIB2_INCLUDE_DIR}
)

# values used when registering plugins
add_definitions(-DGST_PACKAGE_VERSION="4.1")
add_definitions(-DGST_PACKAGE_LICENSE="LGPL")
add_definitions(-DGST_PACKAGE_ORIGIN="https://github.com/stereolabs/zed-gstreamer")
add_definitions(-DGST_PACKAGE_NAME="${CMAKE_PROJECT_NAME}")
add_definitions(-DPACKAGE="${CMAKE_PROJECT_NAME} package")

add_definitions(-Werror=return-type)

LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}/gstreamer-1.0


if(CMAKE_INSTALL_PREFIX_INITIALIZED_TO_DEFAULT)
    if(WIN32)
        get_filename_component(_PREFIX "${GSTREAMER_PLUGIN_DIR}/../../" REALPATH)
    else()
        # set(_PREFIX "/usr/lib")
        get_filename_component(_PREFIX "${GSTREAMER_PLUGIN_DIR}/../" REALPATH)
    endif ()
    set(CMAKE_INSTALL_PREFIX "${_PREFIX}"
        CACHE PATH "Common prefix for all installed files (e.g., plugins will be installed under CMAKE_INSTALL_PREFIX/gstreamer-1.0)" FORCE)
endif()

if(NOT LIBRARY_INSTALL_DIR)
    set(LIBRARY_INSTALL_DIR "${CMAKE_INSTALL_PREFIX}/"
        CACHE PATH "Location to install libraries (e.g., libgstklv-1.0-0.so/dll)")
endif()
if(NOT PLUGIN_INSTALL_DIR)
    if(WIN32)
        set(PLUGIN_INSTALL_DIR "${CMAKE_INSTALL_PREFIX}/lib/gstreamer-1.0/"
            CACHE PATH "Location to install plugins (e.g., libgstpylon.so/dll)")
    else()
        set(PLUGIN_INSTALL_DIR "${CMAKE_INSTALL_PREFIX}/gstreamer-1.0/"
            CACHE PATH "Location to install plugins (e.g., libgstpylon.so/dll)")
    endif()
endif()

if (WIN32 AND NOT PDB_INSTALL_DIR)
    set(PDB_INSTALL_DIR "${CMAKE_INSTALL_PREFIX}/lib/gstreamer-1.0/"
        CACHE PATH "Location to install PDB debug files (e.g., libgstpylon.pdb)")
endif()
if(NOT INCLUDE_INSTALL_DIR)
    if(WIN32)
        set(INCLUDE_INSTALL_DIR "${CMAKE_INSTALL_PREFIX}/include/gstreamer-1.0/gst/zed/"
            CACHE PATH "Location to install include headers" FORCE)
    else()
        get_filename_component(INC_PREFIX "${GSTREAMER_PLUGIN_DIR}/../../../" REALPATH)
        set(INCLUDE_INSTALL_DIR "${INC_PREFIX}/include/gstreamer-1.0/gst/zed/"
            CACHE PATH "Location to install include headers" FORCE)
    endif()
endif()
if(NOT EXE_INSTALL_DIR)
    if(WIN32)
        set(EXE_INSTALL_DIR "${CMAKE_INSTALL_PREFIX}/bin"
            CACHE PATH "Location to install executables" FORCE)
    else()
        set(EXE_INSTALL_DIR "/usr/bin"
            CACHE PATH "Location to install executables" FORCE)
    endif()
endif()

message("")
message("Plugin install dir:")
message(${PLUGIN_INSTALL_DIR})
message("")
message("Library install dir:")
message(${LIBRARY_INSTALL_DIR})
message("")
message("Include install dir:")
message(${INCLUDE_INSTALL_DIR})
message("")
message("Executable install dir:")
message(${EXE_INSTALL_DIR})
message("")

add_subdirectory(gst-zed-meta)
if(ZED_FOUND)
    add_subdirectory(gst-zed-src)
else()
    message( "ZED SDK not available. 'zedsrc' will not be installed")
endif()
if(L4T_FOUND) 
    if(${L4T_RELEASE} EQUAL "35")
        if(${L4T_REVISION} EQUAL "3" OR ${L4T_REVISION} EQUAL "4" )
            add_subdirectory(gst-zedxone-src)
        endif()
    elseif(${L4T_RELEASE} EQUAL "36")
        if(${L4T_REVISION} EQUAL "3")
            add_subdirectory(gst-zedxone-src)
        endif()
    endif()
endif()
add_subdirectory(gst-zed-demux)
add_subdirectory(gst-zed-data-mux)
add_subdirectory(gst-zed-data-csv-sink)
if(OpenCV_FOUND)
    add_subdirectory(gst-zed-od-overlay)
else()
    message( "OpenCV not available. 'gstzedodoverlay' will not be installed")
endif()
if(GSTRTSPSERVER_FOUND)
    add_subdirectory(gst-zed-rtsp-server)
else()
    message( "GstRTSPServer not available. 'gst-zed-rtsp-launch' will not be installed")
endif()

####################################################################
# USEFUL FILES
FILE(GLOB_RECURSE doc_files ${CMAKE_SOURCE_DIR}/*.md ${CMAKE_SOURCE_DIR}/*.rst)
add_custom_target("DOCS" SOURCES ${doc_files})
FILE(GLOB_RECURSE script_files ${CMAKE_SOURCE_DIR}/scripts/*)
add_custom_target("SCRIPTS" SOURCES ${script_files})
####################################################################

macro_display_feature_log()
