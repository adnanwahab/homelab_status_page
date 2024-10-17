# FindNVTegraRelease.cmake - CMake module to parse /etc/nv_tegra_release

function(FindNVTegraRelease)
  if (EXISTS "/etc/nv_tegra_release")
    # Read the contents of "/etc/nv_tegra_release" into a variable
    file(READ "/etc/nv_tegra_release" NV_TEGRA_RELEASE_CONTENTS)

    # Define a regular expression pattern to match the version information
    set(VERSION_REGEX "# R([0-9]+) \\(release\\), REVISION: ([0-9]+)\\.([0-9]+)")

    # Match the version information using the regular expression
    string(REGEX MATCH "${VERSION_REGEX}" MATCHED_VERSION "${NV_TEGRA_RELEASE_CONTENTS}")

    # Extract the release version and revision from the matched string
    if (MATCHED_VERSION)
        set(L4T_FOUND TRUE PARENT_SCOPE)
        set(L4T_RELEASE ${CMAKE_MATCH_1} PARENT_SCOPE)
        set(L4T_REVISION ${CMAKE_MATCH_2} PARENT_SCOPE)
        set(L4T_PATCH ${CMAKE_MATCH_3} PARENT_SCOPE)
    else()
        set(L4T_FOUND FALSE PARENT_SCOPE)
    endif()
  else()
    set(L4T_FOUND FALSE PARENT_SCOPE)
  endif()
endfunction()

