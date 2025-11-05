# 🚀 Hướng Dẫn Deploy Lên Server Docker

## 📋 Checklist Trước Khi Deploy

### 1. Kiểm Tra Code
- [ ] Đã xóa tất cả `console.log` trong production code
- [ ] Đã test tất cả chức năng
- [ ] Không có lỗi linter
- [ ] Đã cập nhật API endpoints trong client

### 2. Chuẩn Bị Environment Variables

Tạo file `.env` trong root project:

```env
# Database
MYSQL_ROOT_PASSWORD=rootpassword123
MYSQL_DATABASE=haninh_academy
MYSQL_USER=haninh_user
MYSQL_PASSWORD=secure_password_123

# Backend
JWT_SECRET=your_very_secure_jwt_secret_key_here
NODE_ENV=production

# CORS (if needed)
CORS_ORIGIN=http://localhost,https://yourdomain.com
```

## 🐳 Build và Deploy

### Bước 1: Build Images

```bash
# Build tất cả images
docker-compose build

# Hoặc build từng service
docker-compose build frontend
docker-compose build backend
```

### Bước 2: Start Services

```bash
# Start tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f

# Xem logs từng service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mysql
```

### Bước 3: Kiểm Tra

```bash
# Kiểm tra containers đang chạy
docker ps

# Kiểm tra logs
docker-compose logs

# Kiểm tra database connection
docker exec -it haninh_mysql mysql -u haninh_user -p haninh_academy
```

## 📦 Các Lệnh Docker Hữu Ích

```bash
# Stop tất cả services
docker-compose down

# Stop và xóa volumes (CAUTION: xóa data)
docker-compose down -v

# Rebuild và restart
docker-compose up -d --build

# Xem status
docker-compose ps

# Enter vào container
docker exec -it haninh_backend sh
docker exec -it haninh_frontend sh

# Xem logs realtime
docker-compose logs -f --tail=100
```

## 🔧 Troubleshooting

### Lỗi Database Connection

```bash
# Kiểm tra MySQL đang chạy
docker-compose logs mysql

# Test connection
docker exec -it haninh_backend sh
# Trong container:
mysql -h mysql -u haninh_user -p
```

### Lỗi Backend Build

```bash
# Rebuild từ đầu
docker-compose build --no-cache backend
docker-compose up -d backend
```

### Lỗi Frontend Build

```bash
# Rebuild frontend
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

### Database Migration

```bash
# Run migrations
docker exec -it haninh_backend npm run migrate:latest

# Rollback migrations
docker exec -it haninh_backend npm run migrate:rollback
```

## 🌐 Access Application

- **Frontend**: http://localhost hoặc http://your-server-ip
- **Backend API**: http://localhost:10093 hoặc http://your-server-ip:10093
- **MySQL**: localhost:3306

## 🔐 Security Notes

1. **Đổi tất cả passwords** trong production
2. **Sử dụng HTTPS** với reverse proxy (nginx traefik)
3. **Backup database** định kỳ
4. **Monitor logs** để phát hiện lỗi

## 📊 Monitoring

```bash
# Xem resource usage
docker stats

# Xem disk usage
docker system df

# Clean up unused resources
docker system prune -a
```

## 🔄 Update Application

```bash
# 1. Pull latest code
git pull

# 2. Rebuild images
docker-compose build --no-cache

# 3. Restart services
docker-compose down
docker-compose up -d

# 4. Run migrations (if needed)
docker exec -it haninh_backend npm run migrate:latest
```

## 📝 Backup Database

```bash
# Backup
docker exec haninh_mysql mysqldump -u haninh_user -p haninh_academy > backup_$(date +%Y%m%d).sql

# Restore
docker exec -i haninh_mysql mysql -u haninh_user -p haninh_academy < backup.sql
```

