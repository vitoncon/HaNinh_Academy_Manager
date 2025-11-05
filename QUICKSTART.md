# 🚀 Quick Start - Deploy Lên Docker

## Bước 1: Kiểm Tra Docker

### Windows (PowerShell):
```powershell
.\setup-check.ps1
```

### Linux/Mac:
```bash
chmod +x setup-check.sh
./setup-check.sh
```

Nếu chưa có Docker:
- **Windows/Mac**: Cài [Docker Desktop](https://docs.docker.com/get-docker/)
- **Linux**: `sudo apt install docker docker-compose`

## Bước 2: Tạo file .env

### Windows (PowerShell):
```powershell
.\create-env.ps1
```

### Linux/Mac:
```bash
chmod +x create-env.sh
./create-env.sh
```

### Sau đó sửa file .env:
1. Mở `Haninh_Server/.env` - Điền password MySQL
2. Mở `.env` (root) - Đổi tất cả passwords

## Bước 3: Build và Deploy

```bash
# Build tất cả images
docker-compose build

# Start services
docker-compose up -d

# Xem logs
docker-compose logs -f
```

## Bước 4: Kiểm Tra

```bash
# Kiểm tra containers đang chạy
docker ps

# Kiểm tra frontend
# Mở browser: http://localhost

# Kiểm tra backend
curl http://localhost:10093/api/health

# Xem logs từng service
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mysql
```

## Bước 5: Access Application

- 🌐 **Frontend**: http://localhost
- 🔌 **Backend API**: http://localhost:10093
- 🗄️ **MySQL**: localhost:3306

## Troubleshooting

### Container không start?
```bash
# Xem logs lỗi
docker-compose logs

# Restart service
docker-compose restart

# Rebuild và restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Database connection error?
```bash
# Kiểm tra MySQL đang chạy
docker exec -it haninh_mysql mysql -u haninh_user -p

# Kiểm tra logs backend
docker exec -it haninh_backend sh
# Inside: npm run migrate:latest
```

### Frontend không load?
```bash
# Check nginx logs
docker exec -it haninh_frontend nginx -t

# Restart frontend
docker-compose restart frontend
```

## Các Lệnh Hữu Ích

```bash
# Stop tất cả
docker-compose down

# Stop và xóa data (CAUTION!)
docker-compose down -v

# Rebuild một service
docker-compose build frontend
docker-compose up -d frontend

# Backup database
docker exec haninh_mysql mysqldump -u haninh_user -p haninh_academy > backup.sql

# Restore database
docker exec -i haninh_mysql mysql -u haninh_user -p haninh_academy < backup.sql
```

## 🔄 Update Code

```bash
# 1. Pull latest code
git pull

# 2. Rebuild
docker-compose build --no-cache

# 3. Restart
docker-compose down
docker-compose up -d
```

