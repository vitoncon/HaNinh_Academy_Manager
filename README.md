# 🎓 HaNinh Academy Manager

Hệ thống quản lý học viên và khóa học cho trung tâm HaNinh Academy.

## 📁 Cấu Trúc Project

```
.
├── Haninh_Client/          # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── features/    # Modules chính
│   │   │   ├── pages/       # Dashboard, etc
│   │   │   └── shared/      # Shared components
│   └── Dockerfile
│
├── Haninh_Server/           # Node.js Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routers/
│   │   └── middlewares/
│   └── Dockerfile
│
└── docker-compose.yml       # Docker orchestration
```

## 🚀 Quick Start

### Requirements
- Node.js 20+
- Docker & Docker Compose
- MySQL 8.0+

### Local Development

```bash
# 1. Start database
cd Haninh_Server
npm install
# Update database config in src/db/config.db.ts

# 2. Start backend
cd Haninh_Server
npm run dev

# 3. Start frontend (in new terminal)
cd Haninh_Client
npm install
npm start
```

### Production Deploy

```bash
# 1. Tạo file .env
cp .env.example .env
# Edit .env với credentials của bạn

# 2. Build và start
docker-compose build
docker-compose up -d

# 3. Run migrations
docker exec -it haninh_backend npm run migrate:latest

# 4. Access
# Frontend: http://localhost
# Backend: http://localhost:10093
```

Xem chi tiết trong [DEPLOY.md](./DEPLOY.md)

## 🎯 Features

### Dashboard
- ✅ Tổng quan thống kê (học viên, doanh thu, lớp học)
- ✅ Biểu đồ phân bố lớp học theo khóa
- ✅ Tình trạng thanh toán
- ✅ Học viên mới đăng ký
- ✅ Lớp học sắp khai giảng

### Module Quản Lý
- 👥 Quản lý học viên
- 📚 Quản lý khóa học
- 🏫 Quản lý lớp học
- 👨‍🏫 Quản lý giáo viên
- 💰 Quản lý phí
- 📜 Quản lý chứng chỉ
- 📅 Lịch học
- 📊 Kết quả học tập

## 🛠️ Tech Stack

### Frontend
- Angular 20
- PrimeNG
- Tailwind CSS
- Chart.js
- RxJS

### Backend
- Node.js
- Express
- TypeScript
- Knex.js
- MySQL

## 📝 Scripts

### Client
```bash
npm start          # Dev server
npm run build      # Production build
npm test           # Run tests
```

### Server
```bash
npm run dev        # Dev mode
npm run build      # Build TypeScript
npm start          # Production mode
npm run migrate:latest   # Run migrations
```

## 🔐 Environment Variables

Xem file `.env.example` để cấu hình đầy đủ.

## 📞 Support

Nếu có vấn đề, kiểm tra:
- [DEPLOY.md](./DEPLOY.md) - Hướng dẫn deploy
- [Haninh_Server/readme.md](./Haninh_Server/readme.md) - Backend docs
- [Haninh_Client/README.md](./Haninh_Client/README.md) - Frontend docs

## 📄 License

ISC

