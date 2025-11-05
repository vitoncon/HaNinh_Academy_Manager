# PowerShell script for Windows

Write-Host "Creating .env files..." -ForegroundColor Cyan

# Create .env for Haninh_Server
$serverEnv = @"
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER_NAME=root
DB_USER_PASS=
DB_NAME=haninh_academy_manager

# Server Configuration
PORT=10093
NODE_ENV=production

# JWT Secret - CHANGE THIS!
JWT_SECRET=your_jwt_secret_key_change_this_in_production_minimum_32_chars
"@

$serverEnv | Out-File -FilePath "Haninh_Server.env" -Encoding utf8
Write-Host "Created Haninh_Server.env" -ForegroundColor Green

# Create .env for Docker in root
$rootEnv = @"
# Database
MYSQL_ROOT_PASSWORD=rootpassword123
MYSQL_DATABASE=haninh_academy
MYSQL_USER=haninh_user
MYSQL_PASSWORD=secure_password_123

# Backend
JWT_SECRET=your_very_secure_jwt_secret_key_here_change_this_in_production
NODE_ENV=production
"@

$rootEnv | Out-File -FilePath ".env" -Encoding utf8
Write-Host "Created .env in root" -ForegroundColor Green

Write-Host ""
Write-Host "IMPORTANT: Edit these files and change the passwords and JWT_SECRET!" -ForegroundColor Red
Write-Host "   - Haninh_Server.env (rename to .env)" -ForegroundColor Yellow
Write-Host "   - .env" -ForegroundColor Yellow
