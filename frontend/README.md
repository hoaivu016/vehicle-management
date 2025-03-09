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

### Bước 1: Đẩy mã nguồn lên GitHub

```bash
git add .
git commit -m "Chuẩn bị triển khai lên Vercel"
git push origin main
```

### Bước 2: Kết nối với Vercel

1. Đăng nhập vào [Vercel](https://vercel.com)
2. Chọn "Import Project"
3. Chọn repository từ GitHub
4. Cấu hình triển khai:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Root Directory: `frontend` (nếu cấu trúc dự án của bạn là monorepo)

### Bước 3: Cấu hình biến môi trường

Thêm các biến môi trường sau vào cấu hình Vercel:

```
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

### Bước 4: Triển khai

Nhấn nút "Deploy" và đợi quá trình triển khai hoàn tất.

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
