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
    gstzedmeta.cpp
    )
    
set(HEADERS
    gstzedmeta.h
    )

set(libname gstzedmeta)

message( " * ${libname} library added")

add_library (${libname} SHARED
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

if(WIN32)
    set(CMAKE_SHARED_LIBRARY_PREFIX "")
    set(CMAKE_STATIC_LIBRARY_PREFIX "")
endif()

target_link_libraries (${libname} LINK_PUBLIC
    ${GLIB2_LIBRARIES}
    ${GOBJECT_LIBRARIES}
    ${GSTREAMER_LIBRARY}
    ${GSTREAMER_BASE_LIBRARY}
    ${GSTREAMER_VIDEO_LIBRARY}
)

set_target_properties(${libname} PROPERTIES
    PUBLIC_HEADER "${HEADERS}"
)

if (WIN32)
    install (FILES $<TARGET_PDB_FILE:${libname}> DESTINATION ${PDB_INSTALL_DIR} COMPONENT pdb OPTIONAL)
endif ()

install( TARGETS ${libname}
    LIBRARY DESTINATION ${LIBRARY_INSTALL_DIR}
    PUBLIC_HEADER DESTINATION ${INCLUDE_INSTALL_DIR}
)
