// Re-export Staff interface từ types
import { Staff, StaffStatus, StaffTeam, StaffRole, StaffStatistics, generateStaffId } from '../types/staff/staff';

export { Staff, StaffStatus, StaffTeam, StaffRole, StaffStatistics, generateStaffId };

// Các hàm tiện ích liên quan đến nhân viên
export const calculateCommission = (staff: Staff, salesAmount: number): number => {
  // Logic tính toán hoa hồng dựa trên vai trò và đội nhóm
  let commissionRate = staff.commissionRate;
  
  // Điều chỉnh tỷ lệ dựa vào vai trò
  if (staff.role === StaffRole.MANAGER) {
    commissionRate += 0.01; // Thêm 1% cho quản lý
  }
  
  return salesAmount * commissionRate;
};

// Tính tổng hoa hồng
export const calculateTotalCommission = (vehiclesSold: number, commissionRate: number): number => {
  return vehiclesSold * commissionRate;
}; 