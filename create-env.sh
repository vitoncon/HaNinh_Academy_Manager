#!/bin/bash

echo "📝 Creating .env files..."

# Create .env for Haninh_Server
cat > Haninh_Server/.env << 'EOF'
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
EOF

echo "✅ Created Haninh_Server/.env"

# Create .env for Docker in root
cat > .env << 'EOF'
# Database
MYSQL_ROOT_PASSWORD=rootpassword123
MYSQL_DATABASE=haninh_academy
MYSQL_USER=haninh_user
MYSQL_PASSWORD=secure_password_123

# Backend
JWT_SECRET=your_very_secure_jwt_secret_key_here_change_this_in_production
NODE_ENV=production
EOF

echo "✅ Created .env in root"
echo ""
echo "⚠️  IMPORTANT: Edit these files and change the passwords and JWT_SECRET!"
echo "   - Haninh_Server/.env"
echo "   - .env"

