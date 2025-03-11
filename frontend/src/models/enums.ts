// Các enum cho dự án quản lý xe

// Trạng thái xe
export enum VehicleStatus {
  AVAILABLE = 'AVAILABLE',  // Có sẵn để bán
  PENDING = 'PENDING',      // Đang trong quá trình giao dịch
  SOLD = 'SOLD',            // Đã bán
  RESERVED = 'RESERVED',    // Đã đặt cọc
  MAINTENANCE = 'MAINTENANCE',  // Đang bảo trì
  UNAVAILABLE = 'UNAVAILABLE'   // Không có sẵn vì lý do khác
}

// Loại xe
export enum VehicleType {
  SEDAN = 'SEDAN',
  SUV = 'SUV',
  HATCHBACK = 'HATCHBACK',
  TRUCK = 'TRUCK',
  VAN = 'VAN',
  COUPE = 'COUPE',
  CONVERTIBLE = 'CONVERTIBLE',
  OTHER = 'OTHER'
}

// Tình trạng xe
export enum VehicleCondition {
  NEW = 'NEW',          // Mới
  USED = 'USED',        // Đã qua sử dụng
  CERTIFIED = 'CERTIFIED'  // Đã qua kiểm định
}

// Phòng ban của nhân viên
export enum StaffTeam {
  SALES = 'SALES',          // Bán hàng
  SALES_1 = 'SALES_1',      // Nhóm bán hàng 1
  SALES_2 = 'SALES_2',      // Nhóm bán hàng 2
  SALES_3 = 'SALES_3',      // Nhóm bán hàng 3
  TECHNICAL = 'TECHNICAL',  // Kỹ thuật
  MANAGEMENT = 'MANAGEMENT',  // Quản lý
  ACCOUNTING = 'ACCOUNTING',  // Kế toán
  SUPPORT = 'SUPPORT',      // Hỗ trợ
  OTHER = 'OTHER'          // Khác
}

// Vai trò của nhân viên
export enum StaffRole {
  ADMIN = 'ADMIN',        // Quản trị viên
  MANAGER = 'MANAGER',    // Quản lý
  TEAM_LEADER = 'TEAM_LEADER',  // Trưởng nhóm
  STAFF = 'STAFF',        // Nhân viên
  INTERN = 'INTERN',      // Thực tập sinh
  TRAINEE = 'TRAINEE'     // Học việc
}

// Trạng thái nhân viên
export enum StaffStatus {
  ACTIVE = 'ACTIVE',      // Đang làm việc
  INACTIVE = 'INACTIVE',  // Không hoạt động
  ON_LEAVE = 'ON_LEAVE',  // Nghỉ phép
  SUSPENDED = 'SUSPENDED', // Đình chỉ 
  TERMINATED = 'TERMINATED'  // Đã nghỉ việc
}

// Loại thanh toán
export enum PaymentType {
  FULL = 'FULL',       // Thanh toán đầy đủ
  DEPOSIT = 'DEPOSIT', // Đặt cọc
  INSTALLMENT = 'INSTALLMENT', // Trả góp
  REFUND = 'REFUND'    // Hoàn tiền
}

// Loại KPI
export enum KpiType {
  SALES = 'SALES',       // KPI bán hàng
  REVENUE = 'REVENUE',   // KPI doanh thu
  CUSTOMER = 'CUSTOMER', // KPI khách hàng
  SERVICE = 'SERVICE',   // KPI dịch vụ
  OTHER = 'OTHER'        // KPI khác
}

// Đối tượng áp dụng KPI
export enum KpiTargetType {
  INDIVIDUAL = 'INDIVIDUAL',   // Cá nhân
  TEAM = 'TEAM',              // Nhóm
  DEPARTMENT = 'DEPARTMENT',  // Phòng ban
  COMPANY = 'COMPANY'        // Toàn công ty
}

// Chu kỳ KPI
export enum KpiPeriod {
  MONTHLY = 'MONTHLY',    // Hàng tháng
  QUARTERLY = 'QUARTERLY', // Hàng quý
  YEARLY = 'YEARLY',      // Hàng năm
  CUSTOM = 'CUSTOM'       // Tùy chỉnh
}

// Trạng thái KPI
export enum KpiStatus {
  ACTIVE = 'ACTIVE',      // Đang hoạt động
  COMPLETED = 'COMPLETED', // Đã hoàn thành
  CANCELLED = 'CANCELLED', // Đã hủy
  PENDING = 'PENDING'     // Đang chờ
} 