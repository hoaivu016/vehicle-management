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
  
  # Kiểm tra thư mục public có đầy đủ các file cần thiết không
  echo "Checking public directory for necessary files..."
  if [ ! -s "public/favicon.ico" ] || [ ! -s "public/logo192.png" ] || [ ! -s "public/logo512.png" ]; then
    echo "Warning: One or more icon files are missing or empty. Attempting to use placeholders..."
    # Tạo file nếu chúng không tồn tại hoặc rỗng
    if [ ! -s "public/favicon.ico" ]; then
      echo "Creating placeholder favicon.ico..."
      echo "This is a placeholder favicon" > public/favicon.ico
    fi
    if [ ! -s "public/logo192.png" ]; then
      echo "Creating placeholder logo192.png..."
      echo "This is a placeholder logo192" > public/logo192.png
    fi
    if [ ! -s "public/logo512.png" ]; then
      echo "Creating placeholder logo512.png..."
      echo "This is a placeholder logo512" > public/logo512.png
    fi
  fi
  
  # Kiểm tra file robots.txt
  if [ ! -f "public/robots.txt" ]; then
    echo "Creating robots.txt..."
    echo "# https://www.robotstxt.org/robotstxt.html" > public/robots.txt
    echo "User-agent: *" >> public/robots.txt
    echo "Disallow:" >> public/robots.txt
  fi

  # Hiển thị nội dung thư mục public
  echo "==== Public directory contents ===="
  ls -la public/
  echo "=================================="
  
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
    echo "==== Build directory static contents ===="
    if [ -d "build/static" ]; then
      ls -la build/static
    else
      echo "Warning: No static directory found in build!"
    fi
    echo "=================================="
  else
    echo "Error: Build directory not found after build process."
    exit 1
  fi
else
  echo "Error: Frontend directory not found!"
  exit 1
fi 