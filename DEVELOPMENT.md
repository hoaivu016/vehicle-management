¬# Hướng Dẫn Phát Triển

## Mục Lục
1. [Quy Trình Phát Triển](#quy-trình-phát-triển)
2. [Chuẩn Bị Môi Trường](#chuẩn-bị-môi-trường)
3. [Quy Tắc Coding](#quy-tắc-coding)
4. [Kiểm Tra Chất Lượng](#kiểm-tra-chất-lượng)
5. [Quy Trình Review](#quy-trình-review)

## Quy Tắc Coding

### 1. TypeScript
- Sử dụng strict mode
- Định nghĩa types đầy đủ
- Tránh sử dụng any
- Sử dụng interface cho objects
- Sử dụng type cho unions/intersections
- Tổ chức types theo module
- Export có chọn lọc để tránh conflicts

### 2. Components
- Mỗi component một thư mục riêng
- Tách logic và UI
- Sử dụng TypeScript props interface
- Viết tests đầy đủ
- Tuân thủ cấu trúc:
  ```
  ComponentName/
  ├── index.tsx
  ├── types.ts
  ├── styles.module.css
  └── __tests__/
      └── index.test.tsx
  ```

### 3. Naming Conventions
- PascalCase cho components (VehicleList.tsx)
- camelCase cho functions và variables
- UPPERCASE cho constants
- kebab-case cho file CSS modules
- Đặt tên rõ ràng và có ý nghĩa

### 4. Import/Export
- Sử dụng absolute imports với @/
- Export default cho components
- Named exports cho utilities và hooks
- Tránh circular dependencies
- Tổ chức imports theo nhóm:
  ```typescript
  // External imports
  import React from 'react';
  
  // Internal imports
  import { useVehicles } from '@/hooks/useVehicles';
  
  // Type imports
  import type { Vehicle } from '@/types/vehicle';
  
  // Style imports
  import styles from './styles.module.css';
  ```

### 5. State Management
- Sử dụng React Context cho state toàn cục
- Tránh prop drilling quá 3 cấp
- Sử dụng local state cho UI state đơn giản
- Tổ chức state theo module/feature

### 6. Performance
- Sử dụng React.memo cho components tốn nhiều tài nguyên
- Tối ưu re-renders với useMemo và useCallback
- Lazy loading cho components lớn
- Code splitting theo routes
- Tối ưu hóa images và assets

### 7. Error Handling
- Xử lý lỗi một cách nhất quán
- Sử dụng Error Boundary cho client-side errors
- Logging lỗi có cấu trúc
- Hiển thị thông báo lỗi thân thiện với người dùng

### 8. Security
- Validate tất cả input từ user
- Sanitize data trước khi render
- Không để lộ thông tin nhạy cảm trong logs
- Sử dụng HTTPS cho tất cả API calls

### 9. Accessibility
- Sử dụng semantic HTML
- Đảm bảo keyboard navigation
- Thêm ARIA labels khi cần thiết
- Đảm bảo contrast ratio phù hợp
- Hỗ trợ screen readers

### 10. Documentation
- Comment cho logic phức tạp
- JSDoc cho functions/components quan trọng
- Cập nhật README.md khi thêm features mới
- Tài liệu hóa các breaking changes

### 11. Testing
- Unit tests cho utils và hooks
- Integration tests cho components
- E2E tests cho critical flows
- Test coverage tối thiểu 80%
- Mock data phải gần với production

### 12. API
- RESTful conventions
- Versioning cho APIs
- Rate limiting
- Caching strategy
- Error responses chuẩn hóa

### 13. Commit
- Commit message theo Conventional Commits
- Mỗi commit một chức năng cụ thể
- Không commit trực tiếp vào main branch
- Squash commits trước khi merge

## Kiểm Tra Chất Lượng

### 1. Trước Khi Commit
```bash
# Kiểm tra TypeScript
npm run type-check

# Kiểm tra linting
npm run lint

# Chạy tests
npm run test

# Format code
npm run format
```

### 2. Continuous Integration
- GitHub Actions workflow
- Kiểm tra types
- Chạy tests
- Kiểm tra linting
- Kiểm tra build

## Quy Trình Review

### 1. Self Review
- Kiểm tra code style
- Đảm bảo không có console.log
- Kiểm tra types đầy đủ
- Đảm bảo tests pass
- Kiểm tra tính đồng bộ với ARCHITECTURE.md

### 2. Peer Review
- Tạo Pull Request
- Chờ ít nhất 1 approval
- Fix comments
- Merge khi đã được approve

### 3. Post Merge
- Delete branch
- Verify deployment
- Monitor errors
- Update documentation 