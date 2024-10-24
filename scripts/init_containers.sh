#!/bin/bash
# run this on jetson to install hashirama platform

#sudo apt-get install -y nvidia-container-toolkit
git clone --depth 1 https://github.com/doomemacs/doomemacs ~/.config/emacs
~/.config/emacs/bin/doom install
#sudo apt-get install -y nvidia-container-toolkit
sudo ln -s /home/adnan/hashirama/infra/caddy/Caddyfile /etc/caddy/Caddyfile
#immich


#etc


#tailscale

#nix ??


#mkdir unreal
# wget ->
# unzip
#


# bootstraps a server like tailscale, ollama, etc
#
#
#



curl -fsSL https://ollama.com/install.sh | sh

curl -fsSL https://tailscale.com/install.sh | sh


# docker pull ollama/ollama
# docker run -it --gpus all ollama/ollama

# List of package paths
packages=(
    "packages/llm/ollama"
    "packages/llm/llama_cpp"
    "packages/llm/llama-factory"
    "packages/llm/exllama"
    "packages/vlm/llama-vision"
)

# Store the initial directory
initial_dir=$(pwd)

# Build each container
for package in "${packages[@]}"; do
    echo "-----------------------------------------"
    echo "Building container for $package"
    
    # Check if the directory exists
    if [ ! -d "$package" ]; then
        echo "Error: Directory $package does not exist. Skipping..."
        continue
    fi
    
    # Change to the package directory
    cd "$initial_dir/$package" || { echo "Error: Unable to change to directory $package. Skipping..."; continue; }

    # Check if a build script exists
    if [ -f "build.sh" ]; then
        echo "Found build.sh, executing..."
        chmod +x build.sh
        ./build.sh
    elif [ -f "Dockerfile" ]; then
        # Build the Docker image
        image_name="${package##*/}"
        echo "No build.sh found. Building Docker image: $image_name"
        docker build -t "$image_name" .
    else
        echo "No build script or Dockerfile found in $package. Skipping..."
    fi

    # Return to the initial directory
    cd "$initial_dir" || { echo "Error: Unable to return to initial directory. Exiting..."; exit 1; }
done

echo "-----------------------------------------"
echo "Container build process completed."
