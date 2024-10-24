
 op item list --vault=personal --tags=api --format json

# Symlink each category into a data folder in the root of this git repo
#chmod +x scripts/*
# ln -s ~/derp/actions ~/homelab_status_page/data/actions
# ln -s ~/derp/cartoons ~/homelab_status_page/data/cartoons
# ln -s ~/derp/comics ~/homelab_status_page/data/comics
# ln -s ~/derp/embeddings ~/homelab_status_page/data/embeddings
# ln -s ~/derp/intermediate_representation ~/homelab_status_page/data/intermediate_representation
# ln -s ~/derp/logs ~/homelab_status_page/data/logs

# ln -s ~/derp/sensor_data ~/homelab_status_page/data/sensor_data

#!/bin/bash

# Script to clone and build specified Jetson containers

# Check if Git is installed
# if ! command -v git &> /dev/null
# then
#     echo "Git is not installed. Please install Git before running this script."
#     exit
# fi

# # Check if Docker is installed
# if ! command -v docker &> /dev/null
# then
#     echo "Docker is not installed. Please install Docker before running this script."
#     exit
# fi

# # Clone or update the jetson-containers repository
# if [ ! -d "jetson-containers" ]; then
#     echo "Cloning jetson-containers repository..."
#     git clone https://github.com/dusty-nv/jetson-containers.git
# else
#     echo "Updating jetson-containers repository..."
#     cd jetson-containers
#     git pull
#     cd ..
# fi


#cd jetson-containers

# List of package paths
# packages=(
#     "packages/llm/ollama"
#     "packages/llm/llama_cpp"
#     "packages/llm/llama-factory"
#     "packages/llm/exllama"
#     "packages/vlm/llama-vision"
# )

# # Build each container
# for package in "${packages[@]}"; do
#     echo "-----------------------------------------"
#     echo "Building container for $package"
#     cd "$package"

#     # Check if a build script exists
#     if [ -f "build.sh" ]; then
#         echo "Found build.sh, executing..."
#         chmod +x build.sh
#         ./build.sh
#     elif [ -f "Dockerfile" ]; then
#         # Build the Docker image
#         image_name="${package##*/}"
#         echo "No build.sh found. Building Docker image: $image_name"
#         docker build -t "$image_name" .
#     else
#         echo "No build script or Dockerfile found in $package. Skipping..."
#     fi

#     cd - > /dev/null
# done

# echo "All containers have been built."

# https://github.com/dusty-nv/jetson-inference


#cp ~/homelab_status_page/scripts/homelab_status_page.sh /usr/local/bin/homelab_status_page.sh

#docker
#bun 
#caddy 
#portainer
#immich
# Gitea
# meilisearch
# matrix synpase -> irc (discord + slack ) -dont need apps 
# pii
# paperless-ngx

#observable not grafana 

# make yoyrown 

    # bookstack
    # zulip 
    # huginn
    # authelia 
      # 

# divide - install.sh + bootstrap.sh -blah;adlgapsdok
# merge scripts - make them good -> infra  -> levels + shipfast jam stack shit


# To install a new plugin in Caddy, you need to build Caddy from source with the desired plugin included.
# Here is a step-by-step guide to do this:

# Step 1: Install Go
# Caddy requires Go to be installed on your system. You can install it using the following commands:
# sudo apt update
# sudo apt install -y golang-go

# Step 2: Set up Go environment
# It's a good practice to set up a Go workspace. Add the following lines to your ~/.bashrc or ~/.zshrc:
# export GOPATH=$HOME/go
# export PATH=$PATH:$GOPATH/bin
# source ~/.bashrc

# Step 3: Get xcaddy
# xcaddy is a command-line tool to build Caddy with plugins.
# go install github.com/caddyserver/xcaddy/cmd/xcaddy@latest

# Step 4: Build Caddy with the plugin
# Use xcaddy to build Caddy with the desired plugin. Replace 'github.com/your/plugin' with the actual plugin repository.
# xcaddy build --with github.com/your/plugin

# Step 5: Replace existing Caddy binary
# Once built, replace the existing Caddy binary with the new one.
# sudo mv ./caddy /usr/bin/caddy

# Step 6: Verify installation
# Verify that the plugin is installed by running:
# caddy list-modules | grep your-plugin

# Note: Ensure that the plugin you want to install is compatible with your version of Caddy.
# xcaddy build --with github.com/abiosoft/caddy-exec

#caddy add-package github.com/abiosoft/caddy-exec
# caddy add-package github.com/caddy-dns/porkbun





# run this on jetson to install hashirama platform + desktop

#sudo apt-get install -y nvidia-container-toolkit
#git clone --depth 1 https://github.com/doomemacs/doomemacs ~/.config/emacs
###~/.config/emacs/bin/doom install
#sudo apt-get install -y nvidia-container-toolkit
#sudo ln -s /home/adnan/hashirama/infra/caddy/Caddyfile /etc/caddy/Caddyfile
#immich

# sudo apt update
# sudo apt install docker.io
# sudo systemctl start docker
# sudo systemctl enable docker
# sudo usermod -aG docker $USER

#find / -name Caddyfile 2>/dev/null
#ls -la /etc/caddy/
#sudo rm /etc/caddy/Caddyfile
#sudo ln -s /home/adnan/homelab_status_page/scripts/infra/caddy/Caddyfile /etc/caddy/Caddyfile

#caddy


#### cleanup after this line

#NOTE TODO -> sync all passwords + keys + secrets + etc

#Update Docker's daemon.json to set the default runtime to nvidia
# if [ -f /etc/docker/daemon.json ]; then
#     sudo jq '. + {"runtimes": {"nvidia": {"path": "nvidia-container-runtime", "runtimeArgs": []}}, "default-runtime": "nvidia"}' /etc/docker/daemon.json | sudo tee /etc/docker/daemon.json.tmp
#     sudo mv /etc/docker/daemon.json.tmp /etc/docker/daemon.json
# else
#     echo '{"runtimes": {"nvidia": {"path": "nvidia-container-runtime", "runtimeArgs": []}}, "default-runtime": "nvidia"}' | sudo tee /etc/docker/daemon.json
# fi


# # Add data-root configuration to Docker's daemon.json
# if [ -f /etc/docker/daemon.json ]; then
#     sudo jq '. + {"data-root": "/mnt/docker"}' /etc/docker/daemon.json | sudo tee /etc/docker/daemon.json.tmp
#     sudo mv /etc/docker/daemon.json.tmp /etc/docker/daemon.json
# else
#     echo '{"data-root": "/mnt/docker"}' | sudo tee /etc/docker/daemon.json
# fi


# # Restart Docker to apply changes

# git clone https://github.com/dusty-nv/jetson-containers

# sudo systemctl restart docker
# bash jetson-containers/install.sh


# hello() {
#     echo "hello"
#     curl -fsSL https://bun.sh/install | bash
#     source /home/adnan/.bashrc

# }

# install_rustdesk() {
#     # Update package list and install dependencies
#     sudo apt-get update
#     sudo apt-get install -y wget gdebi-core

#     # Download the RustDesk .deb package
#     wget https://github.com/rustdesk/rustdesk/releases/download/1.1.9/rustdesk-1.1.9.deb

#     # Install the RustDesk package
#     sudo gdebi -n rustdesk-1.1.9.deb

#     # Clean up the downloaded .deb file
#     rm rustdesk-1.1.9.deb

#     echo "RustDesk installation completed."
# }

# # Call the function to install RustDesk
# install_rustdesk


# #sudo docker run --runtime nvidia -it --rm --network=host dustynv/l4t-pytorch:r36.2.0

# #et
# #tailscale

# #nix ??
# #_wahab

# #mkdir unreal
# # wget ->
# # unzip
# #
# # https://zed.dev/docs/remote-development adnan@jetson-orin:~$ zed

# # bootstraps a server like tailscale, ollama, etc

# # docker pull ollama/ollama
# # docker run -it --gpus all ollama/ollama
# sudo apt-get update && sudo apt-get install v4l2loopback-dkms


# adnan@jetson-orin:~$ docker run --runtime nvidia --rm -it \
#     --gpus all \
#     --device /dev/video0 \
#     --device /dev/video1 \
#     dustynv/jupyterlab:r36.2.0


# run this on jetson to install hashirama platform

#sudo apt-get install -y nvidia-container-toolkit
#git clone --depth 1 https://github.com/doomemacs/doomemacs ~/.config/emacs
###~/.config/emacs/bin/doom install
#sudo apt-get install -y nvidia-container-toolkit
#sudo ln -s /home/adnan/hashirama/infra/caddy/Caddyfile /etc/caddy/Caddyfile
#immich

# sudo apt update
# sudo apt install docker.io
# sudo systemctl start docker
# sudo systemctl enable docker
# sudo usermod -aG docker $USER
# passowrd nviida

#Update Docker's daemon.json to set the default runtime to nvidia
# if [ -f /etc/docker/daemon.json ]; then
#     sudo jq '. + {"runtimes": {"nvidia": {"path": "nvidia-container-runtime", "runtimeArgs": []}}, "default-runtime": "nvidia"}' /etc/docker/daemon.json | sudo tee /etc/docker/daemon.json.tmp
#     sudo mv /etc/docker/daemon.json.tmp /etc/docker/daemon.json
# else
#     echo '{"runtimes": {"nvidia": {"path": "nvidia-container-runtime", "runtimeArgs": []}}, "default-runtime": "nvidia"}' | sudo tee /etc/docker/daemon.json
# fi


# # Add data-root configuration to Docker's daemon.json
# if [ -f /etc/docker/daemon.json ]; then
#     sudo jq '. + {"data-root": "/mnt/docker"}' /etc/docker/daemon.json | sudo tee /etc/docker/daemon.json.tmp
#     sudo mv /etc/docker/daemon.json.tmp /etc/docker/daemon.json
# else
#     echo '{"data-root": "/mnt/docker"}' | sudo tee /etc/docker/daemon.json
# fi


# Restart Docker to apply changes

# git clone https://github.com/dusty-nv/jetson-containers

# sudo systemctl restart docker
# bash jetson-containers/install.sh


# hello() {
#     echo "hello"
#     curl -fsSL https://bun.sh/install | bash
#     source /home/adnan/.bashrc

# }

# install_rustdesk() {
#     # Update package list and install dependencies
#     sudo apt-get update
#     sudo apt-get install -y wget gdebi-core

#     # Download the RustDesk .deb package
#     wget https://github.com/rustdesk/rustdesk/releases/download/1.1.9/rustdesk-1.1.9.deb

#     # Install the RustDesk package
#     sudo gdebi -n rustdesk-1.1.9.deb

#     # Clean up the downloaded .deb file
#     rm rustdesk-1.1.9.deb

#     echo "RustDesk installation completed."
# }

# Call the function to install RustDesk
#install_rustdesk


#sudo docker run --runtime nvidia -it --rm --network=host dustynv/l4t-pytorch:r36.2.0

#et
#tailscale

#nix ??
#_wahab

#mkdir unreal
# wget ->
# unzip
#
# https://zed.dev/docs/remote-development adnan@jetson-orin:~$ zed

# bootstraps a server like tailscale, ollama, etc

# docker pull ollama/ollama
# docker run -it --gpus all ollama/ollama
#sudo apt-get update && sudo apt-get install v4l2loopback-dkms


# adnan@jetson-orin:~$ docker run --runtime nvidia --rm -it \
#     --gpus all \
#     --device /dev/video0 \
#     --device /dev/video1 \
#     dustynv/jupyterlab:r36.2.0

# divide - install.sh + bootstrap.sh -blah;adlgapsdok
# merge scripts - make them good -> infra  -> levels + shipfast jam stack shit


# To install a new plugin in Caddy, you need to build Caddy from source with the desired plugin included.
# Here is a step-by-step guide to do this:

# Step 1: Install Go
# Caddy requires Go to be installed on your system. You can install it using the following commands:
# sudo apt update
# sudo apt install -y golang-go

# Step 2: Set up Go environment
# It's a good practice to set up a Go workspace. Add the following lines to your ~/.bashrc or ~/.zshrc:
# export GOPATH=$HOME/go
# export PATH=$PATH:$GOPATH/bin
# source ~/.bashrc

# Step 3: Get xcaddy
# xcaddy is a command-line tool to build Caddy with plugins.
# go install github.com/caddyserver/xcaddy/cmd/xcaddy@latest

# Step 4: Build Caddy with the plugin
# Use xcaddy to build Caddy with the desired plugin. Replace 'github.com/your/plugin' with the actual plugin repository.
# xcaddy build --with github.com/your/plugin

# Step 5: Replace existing Caddy binary
# Once built, replace the existing Caddy binary with the new one.
# sudo mv ./caddy /usr/bin/caddy

# Step 6: Verify installation
# Verify that the plugin is installed by running:
# caddy list-modules | grep your-plugin

# Note: Ensure that the plugin you want to install is compatible with your version of Caddy.
# xcaddy build --with github.com/abiosoft/caddy-exec

#caddy add-package github.com/abiosoft/caddy-exec
# caddy add-package github.com/caddy-dns/porkbun





# run this on jetson to install hashirama platform + desktop

#sudo apt-get install -y nvidia-container-toolkit
#git clone --depth 1 https://github.com/doomemacs/doomemacs ~/.config/emacs
###~/.config/emacs/bin/doom install
#sudo apt-get install -y nvidia-container-toolkit
#sudo ln -s /home/adnan/hashirama/infra/caddy/Caddyfile /etc/caddy/Caddyfile
#immich

# sudo apt update
# sudo apt install docker.io
# sudo systemctl start docker
# sudo systemctl enable docker
# sudo usermod -aG docker $USER

#find / -name Caddyfile 2>/dev/null
#ls -la /etc/caddy/
#sudo rm /etc/caddy/Caddyfile
#sudo ln -s /home/adnan/homelab_status_page/scripts/infra/caddy/Caddyfile /etc/caddy/Caddyfile

#caddy


#### cleanup after this line

#NOTE TODO -> sync all passwords + keys + secrets + etc

#Update Docker's daemon.json to set the default runtime to nvidia
# if [ -f /etc/docker/daemon.json ]; then
#     sudo jq '. + {"runtimes": {"nvidia": {"path": "nvidia-container-runtime", "runtimeArgs": []}}, "default-runtime": "nvidia"}' /etc/docker/daemon.json | sudo tee /etc/docker/daemon.json.tmp
#     sudo mv /etc/docker/daemon.json.tmp /etc/docker/daemon.json
# else
#     echo '{"runtimes": {"nvidia": {"path": "nvidia-container-runtime", "runtimeArgs": []}}, "default-runtime": "nvidia"}' | sudo tee /etc/docker/daemon.json
# fi


# # Add data-root configuration to Docker's daemon.json
# if [ -f /etc/docker/daemon.json ]; then
#     sudo jq '. + {"data-root": "/mnt/docker"}' /etc/docker/daemon.json | sudo tee /etc/docker/daemon.json.tmp
#     sudo mv /etc/docker/daemon.json.tmp /etc/docker/daemon.json
# else
#     echo '{"data-root": "/mnt/docker"}' | sudo tee /etc/docker/daemon.json
# fi


# # Restart Docker to apply changes

# git clone https://github.com/dusty-nv/jetson-containers

# sudo systemctl restart docker
# bash jetson-containers/install.sh


# hello() {
#     echo "hello"
#     curl -fsSL https://bun.sh/install | bash
#     source /home/adnan/.bashrc

# }

# install_rustdesk() {
#     # Update package list and install dependencies
#     sudo apt-get update
#     sudo apt-get install -y wget gdebi-core

#     # Download the RustDesk .deb package
#     wget https://github.com/rustdesk/rustdesk/releases/download/1.1.9/rustdesk-1.1.9.deb

#     # Install the RustDesk package
#     sudo gdebi -n rustdesk-1.1.9.deb

#     # Clean up the downloaded .deb file
#     rm rustdesk-1.1.9.deb

#     echo "RustDesk installation completed."
# }

# # Call the function to install RustDesk
# install_rustdesk


# #sudo docker run --runtime nvidia -it --rm --network=host dustynv/l4t-pytorch:r36.2.0

# #et
# #tailscale

# #nix ??
# #_wahab

# #mkdir unreal
# # wget ->
# # unzip
# #
# # https://zed.dev/docs/remote-development adnan@jetson-orin:~$ zed

# # bootstraps a server like tailscale, ollama, etc

# # docker pull ollama/ollama
# # docker run -it --gpus all ollama/ollama
# sudo apt-get update && sudo apt-get install v4l2loopback-dkms


# adnan@jetson-orin:~$ docker run --runtime nvidia --rm -it \
#     --gpus all \
#     --device /dev/video0 \
#     --device /dev/video1 \
#     dustynv/jupyterlab:r36.2.0



# Function to install and run Portainer
# l


# Call the functions to install Portainer and configure Caddy
#install_portainer




# run this on jetson to install hashirama platform

#sudo apt-get install -y nvidia-container-toolkit
#git clone --depth 1 https://github.com/doomemacs/doomemacs ~/.config/emacs
###~/.config/emacs/bin/doom install
#sudo apt-get install -y nvidia-container-toolkit
#sudo ln -s /home/adnan/hashirama/infra/caddy/Caddyfile /etc/caddy/Caddyfile
#immich

# sudo apt update
# sudo apt install docker.io
# sudo systemctl start docker
# sudo systemctl enable docker
# sudo usermod -aG docker $USER
# passowrd nviida

#Update Docker's daemon.json to set the default runtime to nvidia
# if [ -f /etc/docker/daemon.json ]; then
#     sudo jq '. + {"runtimes": {"nvidia": {"path": "nvidia-container-runtime", "runtimeArgs": []}}, "default-runtime": "nvidia"}' /etc/docker/daemon.json | sudo tee /etc/docker/daemon.json.tmp
#     sudo mv /etc/docker/daemon.json.tmp /etc/docker/daemon.json
# else
#     echo '{"runtimes": {"nvidia": {"path": "nvidia-container-runtime", "runtimeArgs": []}}, "default-runtime": "nvidia"}' | sudo tee /etc/docker/daemon.json
# fi


# # Add data-root configuration to Docker's daemon.json
# if [ -f /etc/docker/daemon.json ]; then
#     sudo jq '. + {"data-root": "/mnt/docker"}' /etc/docker/daemon.json | sudo tee /etc/docker/daemon.json.tmp
#     sudo mv /etc/docker/daemon.json.tmp /etc/docker/daemon.json
# else
#     echo '{"data-root": "/mnt/docker"}' | sudo tee /etc/docker/daemon.json
# fi


# Restart Docker to apply changes

# git clone https://github.com/dusty-nv/jetson-containers

# sudo systemctl restart docker
# bash jetson-containers/install.sh


# hello() {
#     echo "hello"
#     curl -fsSL https://bun.sh/install | bash
#     source /home/adnan/.bashrc

# }

# install_rustdesk() {
#     # Update package list and install dependencies
#     sudo apt-get update
#     sudo apt-get install -y wget gdebi-core

#     # Download the RustDesk .deb package
#     wget https://github.com/rustdesk/rustdesk/releases/download/1.1.9/rustdesk-1.1.9.deb

#     # Install the RustDesk package
#     sudo gdebi -n rustdesk-1.1.9.deb

#     # Clean up the downloaded .deb file
#     rm rustdesk-1.1.9.deb

#     echo "RustDesk installation completed."
# }

# # Call the function to install RustDesk
# install_rustdesk


#sudo docker run --runtime nvidia -it --rm --network=host dustynv/l4t-pytorch:r36.2.0

#et
#tailscale

#nix ??
#_wahab

#mkdir unreal
# wget ->
# unzip
#
# https://zed.dev/docs/remote-development adnan@jetson-orin:~$ zed

# bootstraps a server like tailscale, ollama, etc

# docker pull ollama/ollama
# docker run -it --gpus all ollama/ollama
#sudo apt-get update && sudo apt-get install v4l2loopback-dkms


# adnan@jetson-orin:~$ docker run --runtime nvidia --rm -it \
#     --gpus all \
#     --device /dev/video0 \
#     --device /dev/video1 \
#     dustynv/jupyterlab:r36.2.0

