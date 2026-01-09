@echo off
set PORT=3000
echo Stopping process on port %PORT%...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":%PORT%" ^| find "LISTENING"') do (
  taskkill /f /pid %%a
  echo Process %%a killed.
)
echo Done.
pause
