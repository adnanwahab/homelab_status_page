#!/bin/bash
# Display the Caddy service file
#echo "Displaying the Caddy service file..."
# cat /etc/systemd/system/caddy.service
# [Unit]
# Description=Caddy web server
# After=network.target
# [Service]
# Environment=HOME=/home/adnan
# ExecStart=/usr/local/bin/caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
# ExecReload=/usr/local/bin/caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
# Restart=on-failure
# [Install]
# WantedBy=multi-user.target
# Find the Caddy log file
#curl -I https://hashirama.blog
#curl ifconfig.me
# Function to check if Caddy is running

# admin dahboard to be public
# Check if the Caddyfile has good syntax
echo "Checking Caddyfile syntax..."
sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile || {
    echo "Caddyfile has syntax errors."
    exit 1
}


check_caddy_status() {
    if systemctl is-active --quiet caddy; then
        echo "Caddy is running."
    else
        echo "Error: Caddy is not running."
        sudo systemctl status caddy
        exit 1
    fi
}

# Check if Caddy is already running before stopping it
if systemctl is-active --quiet caddy; then
    echo "Stopping Caddy service..."
    sudo systemctl stop caddy
else
    echo "Caddy is not running, skipping stop."
fi

# Reload system daemon (only needed if you changed systemd unit files)
echo "Reloading system daemon (if necessary)..."
sudo systemctl daemon-reload

# Format Caddyfile
echo "Formatting Caddyfile..."
sudo caddy fmt --overwrite /etc/caddy/Caddyfile || {
    echo "Error formatting Caddyfile."
    exit 1
}

# Start Caddy service
echo "Starting Caddy service..."
sudo systemctl start caddy || {
    echo "Error starting Caddy service."
    exit 1
}

# Check Caddy status
echo "Checking Caddy status..."
check_caddy_status

# Enable Caddy service to start on boot (if not already enabled)
if systemctl is-enabled --quiet caddy; then
    echo "Caddy service already enabled on boot."
else
    echo "Enabling Caddy service to start on boot..."
    sudo systemctl enable caddy || {
        echo "Error enabling Caddy service."
        exit 1
    }
fi

# Reload Caddy configuration (optional, Caddy reloads on start by default)
echo "Reloading Caddy configuration..."
sudo caddy reload --config /etc/caddy/Caddyfile || {
    echo "Error reloading Caddy configuration."
    exit 1
}

# Final status check
echo "Performing final status check..."
check_caddy_status




echo "Checking Caddy logs..."
log_file=$(sudo find /var/log/caddy -name "caddy.log" 2>/dev/null)

if [ -n "$log_file" ]; then
    echo "Caddy log file found at: $log_file"
    # Optionally, you can add a command to display the last few lines of the log
    # sudo tail -n 20 "$log_file"
else
    echo "Caddy log file not found. Checking journalctl logs..."
    sudo journalctl -u caddy -n 50 --no-pager
fi

echo "Restart process completed."

# Display the Caddy service file (if needed for debugging)
# echo "Displaying the Caddy service file..."
# cat /etc/systemd/system/caddy.service

# Log file check: Caddy typically logs via systemd's journal, but you can check for file logs




# simple - reddit/homelab -> robotics -> symlink everything you need to run a JAM stack for robots using
# observable + vite press + thats it - zig + c++ in the brwoser using WASM + server side redering everything + SSR WebGPU for simulations + TAS for all games for robotics data
#


# echo "Creating symlink for homelab-status-page systemd service..."
# #sudo rm -f "/etc/systemd/system/homelab_status_page.service"
# sudo rm  "/etc/systemd/system/homelab_status_page.service"
# source_file="/home/adnan/homelab_status_page/scripts/infra/systemd/homelab_status_page.service"
# target_file="/etc/systemd/system/homelab_status_page.service"

# if [ -f "$source_file" ]; then
#     echo "Creating new symlink..."
#     sudo ln -s "$source_file" "$target_file"
#     echo "Symlink created successfully."
# else
#     echo "Source file $source_file not found. Cannot create symlink."
#     exit 1
# fi

# echo "Reloading systemd daemon..."
# sudo systemctl daemon-reload

# echo "Enabling homelab_status_page service..."
# sudo systemctl enable homelab_status_page.service

# echo "Starting homelab_status_page service..."
# if sudo systemctl start homelab_status_page.service; then
#     echo "homelab_status_page service started successfully."
# else
#     echo "Failed to start homelab_status_page service. Checking status..."
#     sudo systemctl status homelab_status_page.service
#     echo "Checking journal logs for more information..."
#     sudo journalctl -u homelab_status_page.service -n 50 --no-pager
# fi

#jetson containers -> systemD
#proxmox - DOCKERIZE FIGURE OUT - > FIRE RCRACK CRIU
# Portainer


#k8 after 50 GPUs (12+ tinyboxes)
# sudo systemctl daemon-reload
# sudo systemctl enable homelab_status_page.service
# sudo systemctl start homelab_status_page.service


#ln -s /usr/local/bin/homelab_status_page.sh ~/homelab_status_page/scripts/homelab_status_page.sh



# # Start Portainer service
# echo "Starting Portainer service..."
# if sudo systemctl start portainer; then
#     echo "Portainer service started successfully."
# else
#     echo "Failed to start Portainer service. Checking status..."
#     sudo systemctl status portainer
#     echo "Checking journal logs for more information..."
#     sudo journalctl -u portainer -n 50 --no-pager
# fi

# Check Portainer status
# echo "Checking Portainer status..."
# if systemctl is-active --quiet portainer; then
#     echo "Portainer is running."
# else
#     echo "Error: Portainer is not running."
#     sudo systemctl status portainer
#     exit 1
# fi