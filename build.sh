#!/bin/bash

# Hiển thị cấu trúc thư mục hiện tại để debug
echo "==== Current directory structure ===="
ls -la
echo "======================================"

# Kiểm tra thư mục frontend có tồn tại không
if [ -d "frontend" ]; then
  echo "Frontend directory found. Proceeding with build..."
  cd frontend
  
  # Cài đặt dependencies
  echo "Installing dependencies..."
  npm install
  
  # Build ứng dụng
  echo "Building application..."
  npm run build
  
  # Kiểm tra kết quả build
  if [ -d "build" ]; then
    echo "Build successful. Build directory created."
  else
    echo "Error: Build directory not found after build process."
    exit 1
  fi
else
  echo "Error: Frontend directory not found!"
  exit 1
fi 