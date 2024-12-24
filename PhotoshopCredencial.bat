@echo off
:: Developer for Matr3
:: Ruta de instalación de Photoshop 2022
set PHOTOSHOP_PATH="F:\photoshop\Adobe Photoshop 2025\Photoshop.exe"

:: Ruta del script ExtendScript
set SCRIPT_PATH="F:\Tarjetas\procesarTarjetas.jsx"

:: Ejecutar Photoshop con el script
%PHOTOSHOP_PATH% -r %SCRIPT_PATH%

pause
