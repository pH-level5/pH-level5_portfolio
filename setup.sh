#!/bin/bash

# Setup script for PLU101 Portfolio Website
# This script prepares the development environment

echo "=========================================="
echo "PLU101 Portfolio - Development Setup"
echo "=========================================="
echo

# Check if Python is installed
if command -v python3 &> /dev/null; then
    echo "✓ Python 3 is installed: $(python3 --version)"
elif command -v python &> /dev/null; then
    echo "✓ Python is installed: $(python --version)"
else
    echo "✗ Python is not installed!"
    echo
    echo "Please install Python from https://www.python.org/downloads/"
    echo "Or using Homebrew: brew install python"
    exit 1
fi

echo

# Check if the blog index generation works
echo "Checking blog system..."
if [ -f "blog/generate-index.py" ]; then
    echo "✓ Blog index generator found"
    cd blog
    if command -v python3 &> /dev/null; then
        python3 generate-index.py
    else
        python generate-index.py
    fi
    cd ..
    echo "✓ Blog index updated"
else
    echo "ℹ Blog index generator not found (optional)"
fi

echo

# Ensure proper directory structure
echo "Verifying directory structure..."
directories=("assets" "assets/css" "assets/js" "blog" "blog/posts")

for dir in "${directories[@]}"; do
    if [ -d "$dir" ]; then
        echo "✓ $dir/ exists"
    else
        echo "✗ $dir/ missing - creating..."
        mkdir -p "$dir"
        echo "✓ Created $dir/"
    fi
done

echo
echo "=========================================="
echo "Setup completed successfully!"
echo "=========================================="
echo
echo "Next steps:"
echo "1. Run './run.sh' to start the development server"
echo "2. Open http://localhost:8000 in your browser"
echo "3. Edit files and refresh to see changes"
echo
