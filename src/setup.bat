@echo off
echo ========================================
echo Kidspiration Setup Script
echo ========================================
echo.

echo [1/3] Cleaning previous installation...
if exist node_modules rmdir /s /q node_modules
if exist dist rmdir /s /q dist
echo ✓ Cleanup complete
echo.

echo [2/3] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ✗ Installation failed!
    pause
    exit /b %errorlevel%
)
echo ✓ Dependencies installed
echo.

echo [3/3] Starting development server...
echo ✓ Setup complete!
echo.
echo Opening http://localhost:3000 in your browser...
echo Press Ctrl+C to stop the server
echo.
call npm run dev
