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

set(SOURCES
    zed-rtsp-launch.cpp
    )
    
#set(HEADERS
#    )

include_directories(${CMAKE_CURRENT_SOURCE_DIR}/include)
include_directories(${GSTRTSPSERVER_INCLUDE_DIRS})

link_directories(${LIBRARY_INSTALL_DIR})
link_directories(${GSTRTSPSERVER_LIBRARY_DIRS})

set(appname gst-zed-rtsp-launch)

message( " * ${appname} RTSP server application")

add_executable(${appname}
    ${SOURCES}
#    ${HEADERS}
    )

if(UNIX)
    message("   ${appname}: OS Unix")
    add_definitions(-std=c++11 -Wno-deprecated-declarations -Wno-write-strings -pthread)
endif(UNIX)

if (CMAKE_BUILD_TYPE EQUAL "DEBUG")
    message("   ${appname}: Debug mode")
    add_definitions(-g)
else()
    message("   ${appname}: Release mode")
    add_definitions(-O2)
endif()

if (WIN32)
    target_link_libraries (${appname} LINK_PUBLIC
        ${GLIB2_LIBRARIES}
        ${GOBJECT_LIBRARIES}
        ${GSTREAMER_LIBRARY}
        ${GSTREAMER_BASE_LIBRARY}
        ${GSTRTSPSERVER_LIBRARY_DIRS }
        )
else()
    target_link_libraries (${appname} LINK_PUBLIC
        -L/usr/lib/x86_64-linux-gnu/gstreamer-1.0/libgstrtspclientsink.so
        ${GLIB2_LIBRARIES}
        ${GOBJECT_LIBRARIES}        
        ${GSTREAMER_LIBRARY}
        ${GSTRTSPSERVER_LIBRARIES}
        ${GSTREAMER_BASE_LIBRARY}
        -lgstrtsp-1.0 )
endif()

if (WIN32)
  install (FILES $<TARGET_PDB_FILE:${appname}> DESTINATION ${PDB_INSTALL_DIR} COMPONENT pdb OPTIONAL)
endif ()
install(TARGETS ${appname} RUNTIME DESTINATION ${EXE_INSTALL_DIR}) 
