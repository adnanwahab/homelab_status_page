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


#Update Docker's daemon.json to set the default runtime to nvidia
if [ -f /etc/docker/daemon.json ]; then
    sudo jq '. + {"runtimes": {"nvidia": {"path": "nvidia-container-runtime", "runtimeArgs": []}}, "default-runtime": "nvidia"}' /etc/docker/daemon.json | sudo tee /etc/docker/daemon.json.tmp
    sudo mv /etc/docker/daemon.json.tmp /etc/docker/daemon.json
else
    echo '{"runtimes": {"nvidia": {"path": "nvidia-container-runtime", "runtimeArgs": []}}, "default-runtime": "nvidia"}' | sudo tee /etc/docker/daemon.json
fi


# Add data-root configuration to Docker's daemon.json
if [ -f /etc/docker/daemon.json ]; then
    sudo jq '. + {"data-root": "/mnt/docker"}' /etc/docker/daemon.json | sudo tee /etc/docker/daemon.json.tmp
    sudo mv /etc/docker/daemon.json.tmp /etc/docker/daemon.json
else
    echo '{"data-root": "/mnt/docker"}' | sudo tee /etc/docker/daemon.json
fi


# Restart Docker to apply changes

git clone https://github.com/dusty-nv/jetson-containers

sudo systemctl restart docker
bash jetson-containers/install.sh


hello() {
    echo "hello"
    curl -fsSL https://bun.sh/install | bash
    source /home/adnan/.bashrc 

}

install_rustdesk() {
    # Update package list and install dependencies
    sudo apt-get update
    sudo apt-get install -y wget gdebi-core

    # Download the RustDesk .deb package
    wget https://github.com/rustdesk/rustdesk/releases/download/1.1.9/rustdesk-1.1.9.deb

    # Install the RustDesk package
    sudo gdebi -n rustdesk-1.1.9.deb

    # Clean up the downloaded .deb file
    rm rustdesk-1.1.9.deb

    echo "RustDesk installation completed."
}

# Call the function to install RustDesk
install_rustdesk


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
sudo apt-get update && sudo apt-get install v4l2loopback-dkms


# adnan@jetson-orin:~$ docker run --runtime nvidia --rm -it \
#     --gpus all \
#     --device /dev/video0 \
#     --device /dev/video1 \
#     dustynv/jupyterlab:r36.2.0
