#!/usr/bin/env bash
# Launcher for homelab_status_page build.sh, run.sh, and autotag

ROOT="$(dirname "$(readlink -f "$0")")"
COMMAND=$1

shift;
# curl ifconfig.me

if [ "$COMMAND" = "kentbeck" ] || [ "$COMMAND" = "build.sh" ]; then
    bun run ~/homelab_status_page/web-ui/js/helpers/Kent_Beck_robusteness.js
elif [ "$COMMAND" = "web" ] || [ "$COMMAND" = "web-ui" ]; then
    bun run ~/homelab_status_page/web-ui/my-app/src/index.js
elif [ "$COMMAND" = "web-docker" ]; then
    docker run -p 3000:3000 homelab_status_page
elif [ "$COMMAND" = "show" ]; then
    #$ROOT/build.sh --show "$@"
    echo "Running run.sh..."
elif [ "$COMMAND" = "update" ]; then
    echo "Running install.sh..."
elif [ "$COMMAND" = "data" ]; then
    echo $ROOT/data
elif [ "$COMMAND" = "replit" ]; then
    echo "Running install..."
elif [ "$COMMAND" = "bootstrap" ]; then
    echo "Running bootstrap..."
    bash ~/homelab_status_page/scripts/_bootstrap.sh

elif [ "$COMMAND" = "claude" ]; then
    echo "Running bootstrap..."
    bash ~/homelab_status_page/scripts/claude.js

elif [ "$COMMAND" = "anthropic" ]; then
    echo "Running bootstrap..."

elif [ "$COMMAND" = "test" ]; then
    echo "Running bootstrap..."
    bash ~/homelab_status_page/scriptts/test.js
elif [ "$COMMAND" = "restart-blog" ]; then
    echo "Running restart-blog..."
    #bash ~/homelab_status_page/scripts/_bootstrap.sh
    bash ~/homelab_status_page/scripts/restart-blog.sh
else
    echo 'default PARAM - no toher requests currently - restarting blag for fun !?!?!'
    echo 'homelab > Invalid command'
    echo ''
    echo '   * build [PACKAGES]'
    echo '   * run OPTIONS [CONTAINER:TAG] CMD'
    echo '   * list [PACKAGES|*'
    echo '   * show [PACKAGES]*'
    echo '   * autotag [CONTAINER]'
    echo '   * update (runs git pull)'
    echo '   * root (prints repo path)'
    echo '   * data (prints data path)'
    echo '   * install'
    echo '   * bootstrap'
    echo '   * restart-blog (default)'
    echo ''
    echo 'Run "homelab <CMD> --help" for more info.'
    echo "this command does not exist, should i create a magic spell we can work and cast together oner? "    
    exit 1
fi
