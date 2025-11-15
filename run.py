#!/usr/bin/env python3
"""
PLU101 Portfolio Development Server
Cross-platform Python script to start a local HTTP server for development
"""

import http.server
import socketserver
import sys
import os
import subprocess
import threading
import time
import webbrowser
from pathlib import Path

def print_banner():
    """Print the server startup banner"""
    print("=" * 42)
    print("PLU101 Portfolio - Development Server")
    print("=" * 42)
    print()

def check_python_version():
    """Ensure we're running Python 3.6+"""
    if sys.version_info < (3, 6):
        print("✗ Python 3.6 or higher is required!")
        print(f"Current version: {sys.version}")
        sys.exit(1)
    print(f"✓ Using Python {sys.version.split()[0]}")

def update_blog_index():
    """Update the blog index if the generator exists"""
    blog_generator = Path("blog/generate-index.py")
    if blog_generator.exists():
        print("Updating blog index...")
        try:
            result = subprocess.run([sys.executable, str(blog_generator)], 
                                  cwd="blog", capture_output=True, text=True)
            if result.returncode == 0:
                print("✓ Blog index updated")
            else:
                print(f"⚠ Blog index update warning: {result.stderr.strip()}")
        except Exception as e:
            print(f"⚠ Could not update blog index: {e}")
        print()

def get_local_ip():
    """Get the local IP address for mobile access"""
    try:
        import socket
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
    except Exception:
        return "YOUR-LOCAL-IP"

def open_browser(port):
    """Open the browser after a short delay"""
    time.sleep(2)
    try:
        webbrowser.open(f"http://localhost:{port}")
    except Exception:
        pass  # Fail silently if browser can't be opened

def start_server(port=8000):
    """Start the HTTP server"""
    print_banner()
    check_python_version()
    print()
    
    # Update blog index
    update_blog_index()
    
    # Server info
    print("Starting development server...")
    print(f"📂 Serving files from: {os.getcwd()}")
    print(f"🌐 Server URL: http://localhost:{port}")
    print(f"📱 Mobile access: http://{get_local_ip()}:{port}")
    print()
    print("Press Ctrl+C to stop the server")
    print("=" * 42)
    print()
    
    # Start browser in background
    browser_thread = threading.Thread(target=open_browser, args=(port,))
    browser_thread.daemon = True
    browser_thread.start()
    
    # Create and start the server
    handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            print(f"Server started on port {port}")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\nShutting down server...")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"✗ Port {port} is already in use!")
            print("Try a different port: python run.py [port_number]")
        else:
            print(f"✗ Error starting server: {e}")
        sys.exit(1)

def main():
    """Main entry point"""
    # Get port from command line argument
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
            if not (1024 <= port <= 65535):
                print("Port must be between 1024 and 65535")
                sys.exit(1)
        except ValueError:
            print("Invalid port number. Using default port 8000.")
    
    start_server(port)

if __name__ == "__main__":
    main()
