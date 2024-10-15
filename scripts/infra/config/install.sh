#!/usr/bin/env sh


# tailscale
# 1pw
#

curl -fsSL https://deno.land/install.sh | sh

sudo apt install curl

sudo -s \
curl -sS https://downloads.1password.com/linux/keys/1password.asc | \
gpg --dearmor --output /usr/share/keyrings/1password-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/1password-archive-keyring.gpg] https://downloads.1password.com/linux/debian/$(dpkg --print-architecture) stable main" |
tee /etc/apt/sources.list.d/1password.list
mkdir -p /etc/debsig/policies/AC2D62742012EA22/
curl -sS https://downloads.1password.com/linux/debian/debsig/1password.pol | \
tee /etc/debsig/policies/AC2D62742012EA22/1password.pol
mkdir -p /usr/share/debsig/keyrings/AC2D62742012EA22
curl -sS https://downloads.1password.com/linux/keys/1password.asc | \
gpg --dearmor --output /usr/share/debsig/keyrings/AC2D62742012EA22/debsig.gpg
apt update && apt install 1password-cli



curl -fsSL https://tailscale.com/install.sh | sh

sudo snap install xcaddy

xcaddy build --with $(jq '.plugins[].name' caddy-plugins.json | paste -sd "," -)
