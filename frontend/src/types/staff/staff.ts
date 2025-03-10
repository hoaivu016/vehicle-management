// Định nghĩa enum cho các trạng thái của nhân viên
export enum StaffStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ON_LEAVE = 'on_leave',
  TERMINATED = 'terminated'
}

// Định nghĩa enum cho các đội nhóm
export enum StaffTeam {
  SALES = 'sales',
  MANAGEMENT = 'management',
  SUPPORT = 'support',
  TECHNICAL = 'technical'
}

// Định nghĩa enum cho các vai trò
export enum StaffRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
  TRAINEE = 'trainee'
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
  salary?: number;
  address?: string;
  notes?: string;
  vehiclesSold?: number;
  totalCommission?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
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