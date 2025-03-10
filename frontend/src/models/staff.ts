// Re-export Staff interface từ types
import { Staff, StaffStatus, StaffTeam, StaffRole, StaffStatistics } from '../types/staff/staff';

export { Staff, StaffStatus, StaffTeam, StaffRole, StaffStatistics };

// Các hàm tiện ích liên quan đến nhân viên có thể được thêm vào đây
export const calculateCommission = (staff: Staff, salesAmount: number): number => {
  // Logic tính toán hoa hồng dựa trên vai trò và đội nhóm
  let commissionRate = 0;
  
  // Tỷ lệ hoa hồng dựa vào đội nhóm
  switch (staff.team) {
    case StaffTeam.SALES:
      commissionRate = 0.05; // 5% cho đội kinh doanh
      break;
    case StaffTeam.MANAGEMENT:
      commissionRate = 0.02; // 2% cho đội quản lý
      break;
    case StaffTeam.SUPPORT:
      commissionRate = 0.01; // 1% cho đội hỗ trợ
      break;
    default:
      commissionRate = 0;
  }
  
  // Điều chỉnh tỷ lệ dựa vào vai trò
  if (staff.role === StaffRole.MANAGER) {
    commissionRate += 0.01; // Thêm 1% cho quản lý
  }
  
  return salesAmount * commissionRate;
}; 