#!/bin/bash

# Hiển thị phiên bản Node và NPM
echo "==== Node and NPM versions ===="
node -v
npm -v
echo "======================================"

# Hiển thị cấu trúc thư mục hiện tại để debug
echo "==== Current directory structure ===="
ls -la
echo "======================================"

# Đặt NODE_ENV=production để tối ưu hóa quá trình build
export NODE_ENV=production
echo "NODE_ENV set to: $NODE_ENV"

# Kiểm tra thư mục frontend có tồn tại không
if [ -d "frontend" ]; then
  echo "Frontend directory found. Proceeding with build..."
  cd frontend
  
  # Hiển thị cấu trúc thư mục frontend
  echo "==== Frontend directory structure ===="
  ls -la
  echo "======================================"
  
  # Kiểm tra package.json
  if [ -f "package.json" ]; then
    echo "package.json found in frontend directory."
  else
    echo "Error: package.json not found in frontend directory!"
    exit 1
  fi
  
  # Kiểm tra biến môi trường cần thiết
  if [ -f ".env" ]; then
    echo "Found .env file, will be used for build."
  else
    echo "Warning: No .env file found, creating a basic one."
    echo "REACT_APP_SUPABASE_URL=your_supabase_url" > .env
    echo "REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key" >> .env
  fi
  
  # Cài đặt dependencies
  echo "Installing dependencies..."
  npm install
  
  # Build ứng dụng trực tiếp bằng npx react-scripts build để tránh vòng lặp
  echo "Building application using npx react-scripts build..."
  CI=false npx react-scripts build
  
  # Kiểm tra kết quả build
  if [ -d "build" ]; then
    echo "Build successful. Build directory created."
    echo "==== Build directory contents ===="
    ls -la build
    echo "=================================="
  else
    echo "Error: Build directory not found after build process."
    exit 1
  fi
else
  echo "Error: Frontend directory not found!"
  exit 1
fi 