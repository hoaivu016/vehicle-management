#!/bin/bash

# Đảm bảo chúng ta đang ở thư mục gốc của dự án
cd "$(dirname "$0")"

# Kiểm tra xem Vercel CLI đã được cài đặt chưa
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI chưa được cài đặt. Đang cài đặt..."
    npm install -g vercel
fi

# Chuẩn bị môi trường
echo "Chuẩn bị triển khai lên Vercel..."

# Di chuyển vào thư mục frontend
cd frontend

# Triển khai lên Vercel
echo "Đang triển khai..."
vercel --prod

echo "Hoàn tất!" 