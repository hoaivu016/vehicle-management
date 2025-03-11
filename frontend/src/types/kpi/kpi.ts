// Định nghĩa enum cho loại mục tiêu KPI
export enum KpiTargetType {
  INDIVIDUAL = 'individual', // KPI cho cá nhân
  DEPARTMENT = 'department', // KPI cho phòng ban
  MANAGEMENT = 'management'  // KPI cho quản lý
}

// Interface cho mục tiêu KPI
export interface KpiTarget {
  id: string;
  name: string;
  targetType: KpiTargetType; // Loại mục tiêu
  targetId: string;          // ID của phòng ban hoặc nhân viên
  targetName: string;        // Tên của phòng ban hoặc nhân viên
  targetValue: number;       // Giá trị mục tiêu
  actualValue?: number;      // Giá trị thực tế đạt được
  unit: string;              // Đơn vị (xe, tiền, ...)
  bonusPerUnit: number;      // Tiền thưởng cho mỗi đơn vị
  period: {                 
    month: number;           // Tháng áp dụng
    year: number;            // Năm áp dụng
  };
  completion?: number;       // Phần trăm hoàn thành
  bonus?: number;            // Tổng tiền thưởng
}

// Interface cho thông tin cài đặt KPI
export interface KpiSetting {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Interface cho thống kê KPI
export interface KpiStatistics {
  totalKpis: number;
  completedKpis: number;
  inProgressKpis: number;
  averageCompletion: number;
}

/**
 * Tính tỷ lệ hoàn thành KPI
 * @param targetValue - Giá trị mục tiêu
 * @param actualValue - Giá trị thực tế
 * @returns Tỷ lệ phần trăm hoàn thành
 */
export const calculateKpiCompletion = (targetValue: number, actualValue: number = 0): number => {
  if (targetValue <= 0) return 0;
  return Math.min(100, Math.round((actualValue / targetValue) * 100));
};

/**
 * Tính tiền thưởng cho nhân viên kinh doanh
 * @param kpi - Thông tin KPI và kết quả thực tế
 * @returns Số tiền thưởng
 */
export const calculateSalesBonus = (
  kpi: KpiTarget,
  commissionRate: number = 0.5
): number => {
  const { actualValue = 0, targetValue, bonusPerUnit } = kpi;
  const completion = calculateKpiCompletion(targetValue, actualValue);
  
  // Nếu hoàn thành dưới 70%, chỉ được 70% tiền thưởng
  const bonusMultiplier = completion >= 70 ? 1 : 0.7;
  
  // Tính tiền thưởng: số lượng * tiền thưởng/đơn vị * hệ số hoàn thành
  return Math.round(actualValue * bonusPerUnit * bonusMultiplier);
}; 