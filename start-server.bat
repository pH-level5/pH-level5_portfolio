@echo off
echo ========================================
echo Starting Local Web Server
echo ========================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Starting Python HTTP Server on port 8000...
    echo.
    echo Open your browser to: http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server
    echo ========================================
    echo.
    python -m http.server 8000
    goto :end
)

REM Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Python not found. Trying Node.js...
    echo.
    echo Installing 'serve' package...
    npx serve
    goto :end
)

REM Neither found
echo ERROR: Neither Python nor Node.js found!
echo.
echo Please install one of the following:
echo   - Python: https://www.python.org/downloads/
echo   - Node.js: https://nodejs.org/
echo.
pause
goto :end

:end
