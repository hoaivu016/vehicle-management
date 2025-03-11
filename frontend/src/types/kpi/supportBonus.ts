import { StaffTeam } from '../staff/staff';

// Interface cho thông tin thưởng các phòng ban hỗ trợ
export interface SupportDepartmentBonus {
  id?: string;
  team: StaffTeam;      // Phòng ban (thay vì department: string)
  bonusAmount: number;  // Số tiền thưởng
  isActive: boolean;    // Trạng thái kích hoạt
}

// Enum cho các loại thưởng
export enum BonusType {
  SALES_KPI = 1,           // Thưởng KPI kinh doanh
  DEPARTMENT_KPI = 2,      // Thưởng KPI phòng ban
  SUPPORT_BONUS = 3,       // Thưởng phòng ban hỗ trợ
  MANAGEMENT_BONUS = 4     // Thưởng ban quản lý
}

// Interface cho thông tin cảnh báo
export interface AlertInfo {
  show: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

// Enum cho mức độ cảnh báo
export enum AlertSeverity {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
} 