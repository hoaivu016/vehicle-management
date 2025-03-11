// Định nghĩa enum cho các trạng thái của nhân viên
export enum StaffStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ON_LEAVE = 'on_leave',
  SUSPENDED = 'suspended',
  TERMINATED = 'terminated'
}

// Định nghĩa enum cho các đội nhóm
export enum StaffTeam {
  SALES = 'sales',
  SALES_1 = 'sales_1',
  SALES_2 = 'sales_2',
  SALES_3 = 'sales_3',
  MANAGEMENT = 'management',
  ACCOUNTING = 'accounting',
  SUPPORT = 'support',
  TECHNICAL = 'technical',
  OTHER = 'other'
}

// Định nghĩa enum cho các vai trò
export enum StaffRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
  TEAM_LEADER = 'team_leader',
  TRAINEE = 'trainee',
  INTERN = 'intern'
}

// Interface cho đối tượng nhân viên
export interface Staff {
  id: string;
  name: string;
  code?: string;
  phone?: string;
  email?: string;
  team: StaffTeam;
  role: StaffRole;
  status: StaffStatus;
  joinDate: string | Date;
  leaveDate?: string | Date;
  terminationDate?: string | Date;
  salary?: number;
  commissionRate?: number;
  address?: string;
  notes?: string;
  note?: string;
  vehiclesSold?: number;
  totalCommission?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  avatar?: string;
}

// Interface cho thống kê nhân viên
export interface StaffStatistics {
  totalStaff: number;
  activeStaff: number;
  inactiveStaff: number;
  salesTeam: number;
  managementTeam: number;
  supportTeam: number;
  technicalTeam: number;
}

/**
 * Tính toán tổng hoa hồng cho nhân viên
 * @param vehiclesSold - Số lượng xe đã bán
 * @param commissionRate - Tỷ lệ hoa hồng (%)
 * @returns Tổng số tiền hoa hồng
 */
export const calculateTotalCommission = (vehiclesSold: number = 0, commissionRate: number = 0): number => {
  // Giả sử giá trị trung bình của mỗi xe là 500 triệu đồng
  const averageVehicleValue = 500000000;
  
  // Tính tổng hoa hồng: số xe * giá trị trung bình * tỷ lệ hoa hồng
  return vehiclesSold * averageVehicleValue * (commissionRate / 100);
};

/**
 * Tạo ID ngẫu nhiên cho nhân viên
 * @returns ID cho nhân viên mới
 */
export const generateStaffId = (): string => {
  return 'staff_' + Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9);
}; 