# 🚀 Hướng Dẫn Setup và Deploy

## 📋 Định Nghĩa API và Config

### 1. Backend API URL (Frontend)
- **File**: `Haninh_Client/src/app.config.ts`
- **Dòng 30**: `API_BASE_URL: 'http://localhost:10093'`
- **Trong production**: Đổi thành domain của bạn
  ```typescript
  { provide: API_BASE_URL, useValue: 'https://api.yourdomain.com' }
  ```

### 2. Database Config (Backend)
- **File**: `Haninh_Server/src/db/config.db.ts`
- Sử dụng environment variables:
  - `DB_HOST` - MySQL host
  - `DB_USER_NAME` - MySQL user  
  - `DB_USER_PASS` - MySQL password
  - `DB_NAME` - Database name
  - `DB_PORT` - MySQL port (3306)

### 3. Tạo file .env cho Backend

Trong folder `Haninh_Server/`, tạo file `.env`:

```bash
cd Haninh_Server
cat > .env << 'EOF'
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER_NAME=root
DB_USER_PASS=your_mysql_password
DB_NAME=haninh_academy_manager

# Server Configuration  
PORT=10093
NODE_ENV=production

# JWT Secret (phải có ít nhất 32 ký tự)
JWT_SECRET=your_secure_jwt_secret_key_here_change_this_in_production
EOF
```

## 🐳 Deploy với Docker

### Bước 1: Tạo file .env cho Docker

Trong **root folder** (nơi có docker-compose.yml), tạo file `.env`:

```bash
# Database
MYSQL_ROOT_PASSWORD=rootpassword123
MYSQL_DATABASE=haninh_academy
MYSQL_USER=haninh_user
MYSQL_PASSWORD=secure_password_123

# Backend (từ .env của backend server)
JWT_SECRET=your_very_secure_jwt_secret_key_here
NODE_ENV=production

# CORS (optional)
CORS_ORIGIN=http://localhost,https://yourdomain.com
```

### Bước 2: Update API URL cho Production

Sửa `Haninh_Client/src/app.config.ts`:

```typescript
// Development
{ provide: API_BASE_URL, useValue: 'http://localhost:10093' }

// Production  
{ provide: API_BASE_URL, useValue: 'https://your-domain.com' }
```

### Bước 3: Build và Deploy

```bash
# 1. Build images
docker-compose build

# 2. Start services
docker-compose up -d

# 3. Check logs
docker-compose logs -f

# 4. Check containers
docker ps
```

## 🗄️ Database Setup

### Với Docker (đã tự động)
- Database tự động tạo khi start MySQL container
- Tên database: `haninh_academy`
- User: `haninh_user`
- Password: lấy từ .env file

### Migrations

```bash
# Auto run migrations khi start container
# Hoặc manual:
docker exec -it haninh_backend npm run migrate:latest
```

## 📝 Credentials Mặc Định (Development)

### Database
- **Host**: localhost
- **Port**: 3306
- **Database**: haninh_academy_manager
- **User**: root (hoặc haninh_user)
- **Password**: (check .env file)

### Backend
- **URL**: http://localhost:10093
- **JWT Secret**: lấy từ .env

### Frontend  
- **URL**: http://localhost
- **API Endpoint**: http://localhost:10093

## ⚙️ Environment Variables Summary

### Backend (.env trong Haninh_Server/)
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER_NAME=root
DB_USER_PASS=your_password
DB_NAME=haninh_academy_manager
PORT=10093
JWT_SECRET=your_secret
NODE_ENV=production
```

### Docker (.env trong root)
```env
MYSQL_ROOT_PASSWORD=...
MYSQL_DATABASE=haninh_academy
MYSQL_USER=haninh_user
MYSQL_PASSWORD=...
JWT_SECRET=...
```

## ✅ Checklist Trước Khi Deploy Production

- [ ] Đổi tất cả passwords trong .env
- [ ] Update API_BASE_URL trong app.config.ts
- [ ] Check CORS settings
- [ ] Test database connection
- [ ] Run migrations
- [ ] Test tất cả features
- [ ] Backup database
- [ ] Setup SSL/HTTPS

## 🔗 URLs

- **Frontend**: http://your-domain.com
- **Backend API**: http://your-domain.com:10093  
- **Swagger Docs**: http://your-domain.com:10093/api-docs

