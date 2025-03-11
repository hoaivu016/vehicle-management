// Định nghĩa enum cho các trạng thái của nhân viên
export enum StaffStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TERMINATED = 'TERMINATED'
}

// Định nghĩa enum cho các đội nhóm
export enum StaffTeam {
  SALES = 'SALES',
  SALES_1 = 'SALES_1',
  SALES_2 = 'SALES_2',
  SALES_3 = 'SALES_3',
  MANAGEMENT = 'MANAGEMENT',
  SUPPORT = 'SUPPORT',
  TECHNICAL = 'TECHNICAL',
  OTHER = 'OTHER'
}

// Định nghĩa enum cho các vai trò
export enum StaffRole {
  STAFF = 'STAFF',
  MANAGER = 'MANAGER'
}

// Interface cho đối tượng nhân viên
export interface Staff {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  team: string | null;
  role: string | null;
  status: string | null;
  joinDate: Date;
  leaveDate: Date | null;
  commissionRate: number | null;
  baseSalary: number | null;
  created_at: string;
  updated_at: string;
}

// Interface cho thống kê nhân viên
export interface StaffStatistics {
  totalStaff: number;
  activeStaff: number;
  inactiveStaff: number;
  terminatedStaff: number;
  totalSalary: number;
  totalCommission: number;
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
export const generateStaffId = (staffList: Staff[], name: string): string => {
  // Lấy 2 chữ cái đầu của họ và tên
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase();

  // Lấy số thứ tự tiếp theo
  const existingIds = staffList
    .map(staff => parseInt(staff.id.replace(/[^\d]/g, ''), 10))
    .filter(id => !isNaN(id));
  const nextNumber = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

  // Tạo ID mới theo format: NV + số thứ tự + initials
  return `NV${String(nextNumber).padStart(2, '0')}${initials}`;
};

export interface StaffHistory {
  id: string;
  staffId: string;
  fromStatus: StaffStatus;
  toStatus: StaffStatus;
  changedAt: Date;
  changedBy: string;
  notes?: string;
}

export interface KpiTarget {
  id: string;
  staffId: string;
  targetMonth: Date | null;
  salesTarget: number | null;
  profitTarget: number | null;
  actualSales: number | null;
  actualProfit: number | null;
  achievementRate: number | null;
  created_at: string;
  updated_at: string;
}

export interface SupportDepartmentBonus {
  id: string;
  department: string;
  bonusMonth: Date | null;
  bonusAmount: number | null;
  achievementRate: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
} 