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

set(libname gstzedxonesrc)

add_subdirectory(lib)

set(SOURCES
  gstzedxonesrc.cpp
)
  
set(HEADERS
  gstzedxonesrc.h
)

link_directories(
  ${LIBRARY_INSTALL_DIR}
)

message( " * ${libname} plugin added")

add_library(${libname} MODULE
  ${SOURCES}
  ${HEADERS}
)

message("   ${libname}: OS Unix - L4T")

if (CMAKE_BUILD_TYPE EQUAL "DEBUG")
  message("   ${libname}: Debug mode")
  add_definitions(-g)
else()
  message("   ${libname}: Release mode")
  add_definitions(-O2)
endif()

add_dependencies (${libname} zedarguscapture)

target_link_libraries (
  ${libname} LINK_PUBLIC
  ${GLIB2_LIBRARIES}
  ${GOBJECT_LIBRARIES}
  ${GSTREAMER_LIBRARY}
  ${GSTREAMER_BASE_LIBRARY}
  ${GSTREAMER_VIDEO_LIBRARY}
  ${CMAKE_CURRENT_BINARY_DIR}/lib/libzedarguscapture.so  
)

install(TARGETS ${libname} LIBRARY DESTINATION ${PLUGIN_INSTALL_DIR})
