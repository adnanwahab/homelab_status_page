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

set( SOURCES
    gstzeddemux.cpp
    )
    
set( HEADERS
    gstzeddemux.h
    )

set(libname gstzeddemux)

message( " * ${libname} plugin added")

link_directories(${LIBRARY_INSTALL_DIR})

add_library( ${libname} MODULE
    ${SOURCES}
    ${HEADERS}
    )

if(UNIX)
    message("   ${libname}: OS Unix")
    add_definitions(-std=c++11 -Wno-deprecated-declarations)
endif(UNIX)

if (CMAKE_BUILD_TYPE EQUAL "DEBUG")
    message("   ${libname}: Debug mode")
    add_definitions(-g)
else()
    message("   ${libname}: Release mode")
    add_definitions(-O2)
endif()

add_dependencies (${libname} gstzedmeta)

if(WIN32)
    target_link_libraries (${libname} LINK_PUBLIC
        ${GLIB2_LIBRARIES}
        ${GOBJECT_LIBRARIES}
        ${GSTREAMER_LIBRARY}
        ${GSTREAMER_BASE_LIBRARY}
        ${GSTREAMER_VIDEO_LIBRARY}
        gstzedmeta
        )
else()
    target_link_libraries (${libname} LINK_PUBLIC
        ${GLIB2_LIBRARIES}
        ${GOBJECT_LIBRARIES}
        ${GSTREAMER_LIBRARY}
        ${GSTREAMER_BASE_LIBRARY}
        ${GSTREAMER_VIDEO_LIBRARY}
        ${CMAKE_CURRENT_BINARY_DIR}/../gst-zed-meta/libgstzedmeta.so
        )
endif()

if(WIN32)
  install (FILES $<TARGET_PDB_FILE:${libname}> DESTINATION ${PDB_INSTALL_DIR} COMPONENT pdb OPTIONAL)
endif ()
install(TARGETS ${libname} LIBRARY DESTINATION ${PLUGIN_INSTALL_DIR})
