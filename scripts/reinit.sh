#!/bin/bash

# Check if current directory is a Git repository
if [ ! -d ".git" ]; then
  echo "Error: This directory is not a Git repository."
  exit 1
fi

# Ask for confirmation
read -p "Are you sure you want to reinitialize Git history and remove all previous commits? (y/n): " confirm
if [ "$confirm" != "y" ]; then
  echo "Aborted."
  exit 1
fi

# Backup current .git directory (optional)
if [ -d ".git" ]; then
  echo "Backing up current Git repository to .git.backup"
  mv .git .git.backup
fi

# Remove the .git directory to reinitialize
rm -rf .git

# Initialize a new Git repository
git init

# Add all files and commit them as the first commit
git add .
git commit -m "Initial commit - reinitialized history"

# Set the remote repository (optional)
read -p "Do you want to set the remote origin? (y/n): " set_remote
if [ "$set_remote" = "y" ]; then
  read -p "Enter the remote repository URL: " remote_url
  git remote add origin "$remote_url"
  echo "Remote origin set to $remote_url"
else
  echo "No remote repository set."
fi

# Optional: Push the new commit to remote repository (force push to overwrite history)
read -p "Do you want to push the new commit to the remote repository? (y/n): " push_confirm
if [ "$push_confirm" = "y" ]; then
  git push -u origin master --force
  echo "Pushed new history to remote repository."
else
  echo "Skipping push to remote."
fi

echo "Git history reinitialized."