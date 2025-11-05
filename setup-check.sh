#!/bin/bash

echo "🔍 Checking Docker Installation..."

# Check Docker
if command -v docker &> /dev/null; then
    echo "✅ Docker is installed: $(docker --version)"
else
    echo "❌ Docker is NOT installed"
    echo "👉 Install from: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check Docker Compose
if command -v docker-compose &> /dev/null; then
    echo "✅ Docker Compose is installed: $(docker-compose --version)"
else
    echo "❌ Docker Compose is NOT installed"
    echo "👉 Install from: https://docs.docker.com/compose/install/"
    exit 1
fi

# Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js is installed: $(node --version)"
else
    echo "⚠️  Node.js is not installed (optional for local dev)"
fi

echo ""
echo "📋 Checking Required Files..."

# Check Docker files
files=("Haninh_Client/Dockerfile" "Haninh_Server/Dockerfile" "docker-compose.yml")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file NOT found"
    fi
done

echo ""
echo "💡 Next Steps:"
echo "1. Create .env files (see SETUP_GUIDE.md)"
echo "2. Run: docker-compose build"
echo "3. Run: docker-compose up -d"

