# Cấu Trúc Thư Mục Dự Án Quản Lý Kho Xe

## Tổng Quan
Cấu trúc thư mục được thiết kế để đáp ứng các yêu cầu chi tiết của dự án quản lý kho xe, tuân thủ các nguyên tắc phát triển hiện đại và dễ dàng mở rộng.

## Chi Tiết Cấu Trúc

```
vehicle-management/
├── frontend/                # Ứng dụng giao diện người dùng
│   ├── src/
│   │   ├── modules/          # Nhóm chức năng lớn
│   │   │   ├── vehicles/     # Quản lý xe
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── services/
│   │   │   │   └── utils/
│   │   │   │
│   │   │   ├── reports/      # Báo cáo chi tiết
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── services/
│   │   │   │   └── utils/
│   │   │   │
│   │   │   ├── users/        # Quản lý người dùng
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── services/
│   │   │   │   └── utils/
│   │   │   │
│   │   │   └── payroll/      # Quản lý lương và nhân sự
│   │   │       ├── components/
│   │   │       ├── hooks/
│   │   │       ├── services/
│   │   │       └── utils/
│   │   │
│   │   ├── types/            # Định nghĩa kiểu dữ liệu
│   │   │   ├── common/
│   │   │   ├── vehicles/
│   │   │   ├── users/
│   │   │   ├── reports/
│   │   │   └── payroll/
│   │   │
│   │   ├── lib/              # Thư viện dùng chung
│   │   │   ├── auth/
│   │   │   ├── api/
│   │   │   └── database/
│   │   │
│   │   ├── utils/            # Các hàm tiện ích
│   │   │   ├── formatters/
│   │   │   ├── validators/
│   │   │   └── calculations/
│   │   │
│   │   ├── app/              # Cấu trúc ứng dụng
│   │   │   ├── routes/
│   │   │   ├── layouts/
│   │   │   └── pages/
│   │   │
│   │   └── styles/           # Styles toàn cục
│   │       ├── themes/
│   │       ├── global/
│   │       └── components/
│   │
│   ├── public/               # Tài nguyên tĩnh
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   └── config/               # Cấu hình frontend
│       ├── .env
│       ├── tsconfig.json
│       └── webpack.config.js
│
├── backend/                  # Ứng dụng máy chủ
│   ├── src/
│   │   ├── modules/          # Các module nghiệp vụ
│   │   │   ├── vehicles/
│   │   │   ├── reports/
│   │   │   ├── users/
│   │   │   └── payroll/
│   │   │
│   │   ├── types/            # Kiểu dữ liệu backend
│   │   ├── services/         # Các dịch vụ nghiệp vụ
│   │   ├── controllers/      # Điều khiển API
│   │   ├── middlewares/      # Middleware xử lý
│   │   └── utils/            # Tiện ích chung
│   │
│   └── config/               # Cấu hình backend
│       ├── .env
│       └── database.ts
│
├── docs/                     # Tài liệu dự án
│   ├── api/
│   └── user-guide/
│
├── scripts/                  # Các script hỗ trợ
│   ├── database/
│   └── deployment/
│
└── tests/                    # Thư mục kiểm thử
    ├── unit/
    ├── integration/
    └── e2e/
```

## Nguyên Tắc Thiết Kế

1. **Modular**: Mỗi module độc lập và dễ dàng mở rộng
2. **Separation of Concerns**: Tách biệt logic, UI và dữ liệu
3. **Type Safety**: Sử dụng TypeScript để đảm bảo an toàn kiểu
4. **Scalability**: Cấu trúc linh hoạt để phát triển dự án

## Mục Đích Từng Thư Mục

- `frontend/modules/`: Chứa logic nghiệp vụ frontend
- `backend/modules/`: Chứa logic nghiệp vụ backend
- `types/`: Định nghĩa kiểu dữ liệu cho toàn bộ ứng dụng
- `lib/`: Các thư viện dùng chung và kết nối hệ thống
- `utils/`: Các hàm tiện ích dùng chung
- `public/`: Tài nguyên tĩnh
- `tests/`: Các bộ kiểm thử
- `docs/`: Tài liệu dự án
- `scripts/`: Các script hỗ trợ

## Ghi Chú
- Cấu trúc này có thể điều chỉnh theo nhu cầu thực tế
- Luôn tuân thủ các nguyên tắc clean code
- Ưu tiên tính modularity và khả năng mở rộng 