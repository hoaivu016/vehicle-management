# Hệ Thống Quản Lý Kho Xe

## Giới Thiệu
Ứng dụng quản lý kho xe chuyên nghiệp, hỗ trợ quản lý thông tin xe, báo cáo và nhân sự.

## Công Nghệ Chính
- Frontend: React.js + TypeScript
- Backend: Supabase
- Database: PostgreSQL (Supabase)
- Xác Thực: Supabase Auth
- UI Framework: Material UI

## Cấu Trúc Dự Án
Xem chi tiết tại [STRUCTURE.md](STRUCTURE.md)

## Yêu Cầu Hệ Thống
- Node.js v16+
- npm v8+
- Tài khoản Supabase

## Cài Đặt

### Bước 1: Clone Dự Án
```bash
git clone https://github.com/hoaivu016/vehicle-management.git
cd vehicle-management
```

### Bước 2: Cài Đặt Dependencies
```bash
# Cài đặt dependencies cho frontend
cd frontend
npm install
```

### Bước 3: Cấu Hình Supabase
1. Tạo tài khoản tại [Supabase](https://supabase.io)
2. Tạo project mới
3. Tạo file `.env` trong thư mục `frontend` với nội dung:
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Bước 4: Khởi Động Ứng Dụng
```bash
# Trong thư mục frontend
npm start
```

## Đồng Bộ Dữ Liệu
Ứng dụng hỗ trợ làm việc offline và đồng bộ dữ liệu khi có kết nối internet:
- Dữ liệu được lưu trữ cục bộ khi offline
- Tự động đồng bộ mỗi 30 giây khi có kết nối
- Xử lý xung đột dựa trên thời gian cập nhật

## Triển Khai
Ứng dụng được cấu hình để triển khai lên Vercel:
```bash
# Đẩy code lên GitHub
git push origin main

# Vercel sẽ tự động triển khai từ GitHub
```

## Kiểm Tra Kết Nối
Ứng dụng có chức năng kiểm tra kết nối với Supabase. Nhấn nút "Kiểm tra kết nối" ở góc trên bên phải giao diện.

## Kiểm Thử
```bash
# Chạy unit tests
npm run test:unit

# Chạy integration tests
npm run test:integration

# Chạy end-to-end tests
npm run test:e2e
```

## Đóng Góp
Vui lòng đọc [DEVELOPMENT.md](DEVELOPMENT.md) trước khi đóng góp

## Giấy Phép
[Chỉ định giấy phép] 