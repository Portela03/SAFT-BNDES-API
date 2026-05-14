@echo off
setlocal

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0.mvn\wrapper\maven-wrapper.ps1" %*
set "EXIT_CODE=%ERRORLEVEL%"
exit /b %EXIT_CODE%

