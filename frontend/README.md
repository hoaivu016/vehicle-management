# Hệ thống Quản lý Phương tiện

Hệ thống quản lý phương tiện toàn diện cho doanh nghiệp mua bán xe.

## Tính năng

- Quản lý danh sách xe (nhập, xuất, đặt cọc, bán)
- Quản lý nhân viên và hoa hồng
- Thống kê doanh thu, lợi nhuận
- Báo cáo hiệu suất bán hàng
- Đồng bộ dữ liệu qua Supabase
- Hoạt động offline với đồng bộ khi có kết nối internet

## Triển khai lên Vercel

Để triển khai ứng dụng này lên Vercel, bạn nên triển khai trực tiếp thư mục `frontend` này, không phải thư mục gốc của dự án.

### Cách triển khai đúng

1. Đăng nhập vào Vercel: https://vercel.com
2. Tạo dự án mới
3. Import repository từ GitHub
4. **Quan trọng**: Trong cài đặt "Root Directory", chọn thư mục `frontend`
5. Framework Preset: Chọn "Create React App"
6. Build Command: Để trống (sẽ sử dụng mặc định: `npm run build`)
7. Output Directory: Để trống (sẽ sử dụng mặc định: `build`)
8. Bấm "Deploy"

## Biến môi trường

Đảm bảo thiết lập các biến môi trường sau trong Vercel:

- `REACT_APP_SUPABASE_URL`: URL của Supabase project
- `REACT_APP_SUPABASE_ANON_KEY`: Khóa Anonymous của Supabase

## Cấu hình Supabase cho đồng bộ dữ liệu

### Tạo bảng trong Supabase

1. Đăng nhập vào [Supabase](https://app.supabase.io)
2. Chọn dự án của bạn
3. Vào mục "Table Editor"
4. Tạo các bảng sau:
   - `vehicles`: Lưu thông tin xe
   - `staff`: Lưu thông tin nhân viên
   - `kpi_targets`: Lưu mục tiêu KPI
   - `support_bonuses`: Lưu thông tin hoa hồng hỗ trợ
   - `sync_logs`: Lưu log đồng bộ dữ liệu

### Bảo mật và quyền truy cập

1. Vào mục "Authentication" > "Policies"
2. Cấu hình RLS (Row Level Security) để đảm bảo chỉ người dùng được phép mới có thể đọc/ghi dữ liệu

## Phát triển

### Cài đặt

```bash
npm install
```

### Chạy ứng dụng trong môi trường phát triển

```bash
npm start
```

### Build ứng dụng

```bash
npm run build
```

## Hỗ trợ

Nếu bạn gặp vấn đề với ứng dụng, vui lòng liên hệ: [Thông tin liên hệ]
