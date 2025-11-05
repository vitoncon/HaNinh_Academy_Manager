# PowerShell version for Windows

Write-Host "🔍 Checking Docker Installation..." -ForegroundColor Cyan

# Check Docker
if (Get-Command docker -ErrorAction SilentlyContinue) {
    $dockerVersion = docker --version
    Write-Host "✅ Docker is installed: $dockerVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Docker is NOT installed" -ForegroundColor Red
    Write-Host "👉 Install from: https://docs.docker.com/get-docker/" -ForegroundColor Yellow
    exit 1
}

# Check Docker Compose
if (Get-Command docker-compose -ErrorAction SilentlyContinue) {
    $composeVersion = docker-compose --version
    Write-Host "✅ Docker Compose is installed: $composeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Docker Compose is NOT installed" -ForegroundColor Red
    Write-Host "👉 Install from: https://docs.docker.com/compose/install/" -ForegroundColor Yellow
    exit 1
}

# Check Node.js
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "⚠️  Node.js is not installed (optional for local dev)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Checking Required Files..." -ForegroundColor Cyan

# Check Docker files
$files = @(
    "Haninh_Client\Dockerfile",
    "Haninh_Server\Dockerfile", 
    "docker-compose.yml"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✅ $file exists" -ForegroundColor Green
    } else {
        Write-Host "❌ $file NOT found" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "💡 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create .env files (see SETUP_GUIDE.md)" -ForegroundColor Yellow
Write-Host "2. Run: docker-compose build" -ForegroundColor Yellow
Write-Host "3. Run: docker-compose up -d" -ForegroundColor Yellow

