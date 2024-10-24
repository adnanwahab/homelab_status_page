

https://github.com/dustynv/jetson-containers
https://github.com/observablheq/runtime
https://github.com/livekit/client-sdk-js
https://github.com/bazelbuild/bazel



[
  {
    "name": "GoLang",
    "repo": "https://github.com/golang/go",
    "dependencies": [
      {
        "name": "gc (Go compiler)",
        "description": "Go compiler toolchain"
      },
      {
        "name": "gccgo",
        "description": "Alternative Go compiler based on GCC"
      },
      {
        "name": "cmd/compile",
        "description": "Go compiler internal package with SSA and IR components"
      },
      {
        "name": "CGO",
        "description": "Allows Go programs to call C code"
      },
      {
        "name": "Go Runtime",
        "description": "Includes garbage collection, goroutines, and channels"
      }
    ]
  },
  {
    "name": "Node.js",
    "repo": "https://github.com/nodejs/node",
    "dependencies": [
      {
        "name": "V8 Engine",
        "description": "JavaScript engine by Google"
      },
      {
        "name": "libuv",
        "description": "Provides event loop and asynchronous I/O"
      },
      {
        "name": "c-ares",
        "description": "A C library for asynchronous DNS requests"
      },
      {
        "name": "OpenSSL",
        "description": "Handles TLS and cryptographic operations"
      },
      {
        "name": "HTTP Parser",
        "description": "Parses HTTP requests and responses"
      },
      {
        "name": "zlib",
        "description": "Handles data compression"
      }
    ]
  },
  {
    "name": "Docker",
    "repo": "https://github.com/moby/moby",
    "dependencies": [
      {
        "name": "runc",
        "description": "CLI tool for running containers"
      },
      {
        "name": "containerd",
        "description": "Manages container lifecycle"
      },
      {
        "name": "libnetwork",
        "description": "Provides container networking"
      },
      {
        "name": "BuildKit",
        "description": "Optimizes Docker build process"
      },
      {
        "name": "aufs and overlayfs",
        "description": "Filesystems for container storage"
      }
    ]
  },
  {
    "name": "Kubernetes",
    "repo": "https://github.com/kubernetes/kubernetes",
    "dependencies": [
      {
        "name": "etcd",
        "description": "Distributed key-value store for cluster data"
      },
      {
        "name": "containerd",
        "description": "Manages containers in Kubernetes"
      },
      {
        "name": "CoreDNS",
        "description": "DNS for Kubernetes services"
      },
      {
        "name": "cAdvisor",
        "description": "Monitors container resource usage"
      },
      {
        "name": "Flannel or Calico",
        "description": "Networking plugins for pod networking"
      }
    ]
  },
  {
    "name": "Slurm",
    "repo": "https://github.com/SchedMD/slurm",
    "dependencies": [
      {
        "name": "MySQL or MariaDB",
        "description": "Database for job and cluster data"
      },
      {
        "name": "PMIx",
        "description": "Process management standard"
      },
      {
        "name": "Munge",
        "description": "Authentication system for users and hosts"
      },
      {
        "name": "hwloc",
        "description": "Manages hardware topology"
      }
    ]
  },
  {
    "name": "Java (OpenJDK)",
    "repo": "https://github.com/openjdk/jdk",
    "dependencies": [
      {
        "name": "JVM",
        "description": "Java Virtual Machine for running Java applications"
      },
      {
        "name": "javac",
        "description": "Java compiler"
      },
      {
        "name": "JRE libraries",
        "description": "Standard libraries for utilities, networking, and I/O"
      },
      {
        "name": "HotSpot",
        "description": "Default JVM for memory management and garbage collection"
      }
    ]
  }
]
https://github.com/scverse/scanpy


pytorch or tinygrad

//this is the list of deps to sort by prtioity
{
"pytorch": [],
"tinygrad": [],

}
