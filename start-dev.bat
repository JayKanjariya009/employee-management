@echo off
echo Starting Employee Management System...
echo.
echo Installing dependencies if needed...
call npm run install-all
echo.
echo Starting both frontend and backend servers...
echo Frontend will be available at: http://localhost:3000
echo Backend will be available at: http://localhost:8000
echo.
echo Press Ctrl+C to stop both servers
echo.
call npm run dev