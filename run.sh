#!/bin/bash

# Run script for PLU101 Portfolio Website
# Starts a local Python HTTP server for development

echo "=========================================="
echo "PLU101 Portfolio - Development Server"
echo "=========================================="
echo

# Default port
PORT=${1:-8000}

# Function to open browser (optional)
open_browser() {
    sleep 2
    if command -v open &> /dev/null; then
        # macOS
        open "http://localhost:$PORT"
    elif command -v xdg-open &> /dev/null; then
        # Linux
        xdg-open "http://localhost:$PORT"
    elif command -v start &> /dev/null; then
        # Windows (if running in Git Bash or similar)
        start "http://localhost:$PORT"
    fi
}

# Check if Python is available
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    # Check if it's Python 3
    if python -c "import sys; exit(0 if sys.version_info[0] == 3 else 1)" 2>/dev/null; then
        PYTHON_CMD="python"
    else
        echo "✗ Python 3 is required but Python 2 was found."
        echo "Please install Python 3 from https://www.python.org/"
        exit 1
    fi
else
    echo "✗ Python not found!"
    echo
    echo "Please install Python 3 from:"
    echo "  - https://www.python.org/downloads/"
    echo "  - Or using Homebrew: brew install python"
    exit 1
fi

echo "✓ Using $PYTHON_CMD ($(${PYTHON_CMD} --version))"
echo

# Update blog index before starting server
if [ -f "blog/generate-index.py" ]; then
    echo "Updating blog index..."
    cd blog
    $PYTHON_CMD generate-index.py
    cd ..
    echo "✓ Blog index updated"
    echo
fi

echo "Starting development server..."
echo "📂 Serving files from: $(pwd)"
echo "🌐 Server URL: http://localhost:$PORT"
echo "📱 Mobile access: http://$(hostname -I 2>/dev/null | awk '{print $1}' || echo 'YOUR-IP'):$PORT"
echo
echo "Press Ctrl+C to stop the server"
echo "=========================================="
echo

# Start browser in background (optional, comment out if not desired)
open_browser &

# Start the Python HTTP server
$PYTHON_CMD -m http.server $PORT
