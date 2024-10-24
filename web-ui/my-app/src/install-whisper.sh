#!/bin/bash

echo "Installing Whisper with micromamba..."

# Check if micromamba is installed
if ! command -v micromamba &> /dev/null; then
    echo "Error: micromamba is not installed. Please install it first."
    exit 1
fi

# Create and activate environment
echo "Creating new environment 'whisper_env'..."
micromamba create -n whisper_env python=3.9 -y

# Source the micromamba shell script to enable activate command
eval "$(micromamba shell hook --shell bash)"

echo "Activating whisper_env..."
micromamba activate whisper_env

# Install dependencies
echo "Installing pip..."
micromamba install pip -y

echo "Installing Whisper..."
pip install git+https://github.com/openai/whisper.git

# Install PyTorch with CUDA support
echo "Installing PyTorch with CUDA support..."
micromamba install pytorch torchvision torchaudio -c pytorch -y

echo "Installation complete!"
echo "To transcribe an audio file, use:"
echo "whisper path_to_your_audio.mp3 --model small"

# Keep environment activated for user
exec $SHELL
