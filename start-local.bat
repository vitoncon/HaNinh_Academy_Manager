@echo off
echo ⚠️ Kiểm tra Backend có đang chạy không...
timeout /t 2 /nobreak >nul

start cmd /k "cd /d %~dp0Haninh_Server && npm run dev"
timeout /t 5 /nobreak >nul

start cmd /k "cd /d %~dp0Haninh_Client && npm run dev"

echo ✅ Đã khởi động Backend và Frontend local
echo 🌐 Frontend: http://localhost:4200
echo 🔧 Backend: http://localhost:10093
pause

