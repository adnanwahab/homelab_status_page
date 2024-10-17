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
    gstzedodoverlay.cpp
    )
    
set(HEADERS
    gstzedodoverlay.h
    )

set(libname gstzedodoverlay)

message( " * ${libname} plugin added")

include_directories(${OpenCV_INCLUDE_DIRS})
link_directories(${LIBRARY_INSTALL_DIR})
link_directories(${OpenCV_LINK_DIRECTORIES})

add_library (${libname} MODULE
    ${SOURCES}
    ${HEADERS}
    )

if(UNIX)
    message("   ${libname}: OS Unix")
    add_definitions(-std=c++11 -Wno-deprecated-declarations -Wno-write-strings)
endif(UNIX)

if (CMAKE_BUILD_TYPE EQUAL "DEBUG")
    message("   ${libname}: Debug mode")
    add_definitions(-g)
else()
    message("   ${libname}: Release mode")
    add_definitions(-O2)
endif()

add_dependencies (${libname} gstzedmeta)

if (WIN32)
    target_link_libraries (${libname} LINK_PUBLIC
        ${GLIB2_LIBRARIES}
        ${GOBJECT_LIBRARIES}
        ${GSTREAMER_LIBRARY}
        ${GSTREAMER_BASE_LIBRARY}
        ${GSTREAMER_VIDEO_LIBRARY}
        gstzedmeta
        ${OpenCV_LIBRARIES}
        )
else()
    target_link_libraries (${libname} LINK_PUBLIC
        ${GLIB2_LIBRARIES}
        ${GOBJECT_LIBRARIES}
        ${GSTREAMER_LIBRARY}
        ${GSTREAMER_BASE_LIBRARY}
        ${GSTREAMER_VIDEO_LIBRARY}
        ${CMAKE_CURRENT_BINARY_DIR}/../gst-zed-meta/libgstzedmeta.so
        ${OpenCV_LIBRARIES}
        )
endif()


if (WIN32)
    install (FILES $<TARGET_PDB_FILE:${libname}> DESTINATION ${PDB_INSTALL_DIR} COMPONENT pdb OPTIONAL)
endif ()
install(TARGETS ${libname} LIBRARY DESTINATION ${PLUGIN_INSTALL_DIR})
