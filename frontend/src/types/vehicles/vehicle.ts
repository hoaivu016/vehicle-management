// Enum trạng thái xe với màu sắc và mô tả
export enum VehicleStatus {
  IN_STOCK = 'Trong kho',
  DEPOSITED = 'Đặt cọc',
  BANK_DEPOSITED = 'Đặt cọc ngân hàng',
  OFFSET = 'Đóng đối ứng',
  SOLD = 'Đã bán'
}

// Interface lịch sử trạng thái
export interface StatusHistory {
  fromStatus: VehicleStatus;
  toStatus: VehicleStatus;
  changedAt: Date;
  changedBy: string;
  notes?: string;
}

// Interface thanh toán
export interface PaymentInfo {
  amount: number;
  date: Date;
  type: 'DEPOSIT' | 'BANK_DEPOSIT' | 'OFFSET' | 'FULL_PAYMENT';
  notes?: string;
}

// Interface nhân viên bán
export interface SaleStaff {
  id: string;        // Mã nhân viên
  name: string;      // Tên nhân viên
  team: string;      // Team/nhóm
  expectedCommission: number; // Hoa hồng dự kiến
}

// Interface chi phí
export interface CostInfo {
  id: string;
  amount: number;
  date: Date;
  description: string;
}

// Interface xe được mở rộng
export interface Vehicle {
  id: string;
  name: string;
  color: string;
  manufacturingYear: number;
  odo: number;
  status: VehicleStatus;
  statusHistory: StatusHistory[];
  storageTime: number;
  cost: number;
  costs: CostInfo[];  // Danh sách chi phí chi tiết
  debt: number;
  profit: number;
  payments: PaymentInfo[];
  saleStaff: SaleStaff;
  purchasePrice: number;
  salePrice: number;
  importDate: Date;
  exportDate?: Date;
  note: string;
  sellingPrice?: number;
  importPrice?: number;
  imageUrl?: string; // Đường dẫn hình ảnh
  selectedImage?: string; // Hình ảnh đã chọn (có thể là base64 hoặc đường dẫn)
}

// Thêm interface FormVehicle để sử dụng trong các form
export interface FormVehicle extends Omit<Vehicle, 'id' | 'statusHistory' | 'storageTime' | 'cost' | 'debt' | 'profit' | 'saleStaff' | 'costs' | 'payments'> {
  id?: string;
  imageUrl?: string;
  selectedImage?: string;
  saleStaffId?: string;
}

// Hàm tạo mã xe tự động
export function generateVehicleId(vehicles: Vehicle[]): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const sequence = String(vehicles.length + 1).padStart(3, '0');
  return `${day}${month}_${sequence}`;
}

// Hàm tính lợi nhuận
export function calculateProfit(vehicle: Partial<Vehicle>): number {
  const purchasePrice = vehicle.purchasePrice || 0;
  const salePrice = vehicle.salePrice || 0;
  const cost = vehicle.cost || 0;
  const debt = vehicle.debt || 0;
  
  // Tính lợi nhuận: Giá bán - Giá mua - Chi phí
  const profit = salePrice - purchasePrice - cost;
  
  // Log để kiểm tra việc tính toán
  console.log('Profit Calculation:', {
    purchasePrice,
    salePrice,
    cost,
    debt,
    profit
  });
  
  return profit;
}

// Hàm tính thời gian lưu kho
export function calculateStorageTime(importDate: Date, exportDate?: Date): number {
  // Đảm bảo importDate là đối tượng Date
  const importDateTime = importDate instanceof Date 
    ? importDate 
    : new Date(importDate);
  
  // Sử dụng ngày hiện tại nếu không có ngày xuất
  const exportDateTime = exportDate instanceof Date 
    ? exportDate 
    : new Date(exportDate || Date.now());

  // Tránh các giá trị không hợp lệ
  if (isNaN(importDateTime.getTime()) || isNaN(exportDateTime.getTime())) {
    return 0;
  }

  // Tính toán thời gian lưu kho
  const timeDiff = exportDateTime.getTime() - importDateTime.getTime();
  return Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24))); // Chuyển đổi sang ngày, đảm bảo không âm
}

// Hàm tạo cảnh báo thời gian lưu kho
export function generateStorageTimeWarning(storageTime: number): {
  level: 'normal' | 'warning' | 'danger';
  message: string;
} {
  if (storageTime < 15) {
    return {
      level: 'normal',
      message: `Thời gian lưu kho: ${storageTime} ngày (Bình thường)`
    };
  }
  
  if (storageTime >= 15 && storageTime <= 25) {
    return {
      level: 'warning',
      message: `Cảnh báo: Thời gian lưu kho ${storageTime} ngày đang ở mức độ cảnh báo`
    };
  }
  
  return {
    level: 'danger',
    message: `NGUY HIỂM: Thời gian lưu kho ${storageTime} ngày quá lâu`
  };
}

// Mở rộng hàm getStorageTimeColor để hỗ trợ cảnh báo
export function getStorageTimeColor(storageTime: number): string {
  const warning = generateStorageTimeWarning(storageTime);
  
  switch (warning.level) {
    case 'normal': return 'default';
    case 'warning': return '#FFA500';
    case 'danger': return '#FF0000';
    default: return 'default';
  }
}

// Hàm kiểm tra khả năng chuyển trạng thái
export function canChangeStatus(
  currentStatus: VehicleStatus, 
  newStatus: VehicleStatus
): boolean {
  // Log để kiểm tra
  console.log(`Kiểm tra chuyển trạng thái từ ${currentStatus} sang ${newStatus}`);
  
  // Không cho phép chuyển giữa Đặt cọc và Đặt cọc ngân hàng
  if ((currentStatus === VehicleStatus.DEPOSITED && newStatus === VehicleStatus.BANK_DEPOSITED) ||
      (currentStatus === VehicleStatus.BANK_DEPOSITED && newStatus === VehicleStatus.DEPOSITED)) {
    console.log('Không cho phép chuyển trực tiếp giữa Đặt cọc và Đặt cọc ngân hàng');
    return false;
  }
  
  switch (currentStatus) {
    case VehicleStatus.IN_STOCK:
      // Từ "Trong kho" có thể chuyển sang: "Đặt cọc", "Đặt cọc ngân hàng", "Đã bán"
      return [
        VehicleStatus.DEPOSITED, 
        VehicleStatus.BANK_DEPOSITED, 
        VehicleStatus.SOLD
      ].includes(newStatus);
    
    case VehicleStatus.DEPOSITED:
      // Từ "Đặt cọc" có thể chuyển sang: "Đã bán" hoặc "Trong kho" (hoàn cọc)
      return [
        VehicleStatus.SOLD,
        VehicleStatus.IN_STOCK
      ].includes(newStatus);
    
    case VehicleStatus.BANK_DEPOSITED:
      // Từ "Đặt cọc ngân hàng" có thể chuyển sang: "Đóng đối ứng", "Trong kho" (hoàn cọc)
      return [
        VehicleStatus.OFFSET,
        VehicleStatus.IN_STOCK
      ].includes(newStatus);
    
    case VehicleStatus.OFFSET:
      // Từ "Đóng đối ứng" chỉ có thể chuyển sang "Đã bán"
      return newStatus === VehicleStatus.SOLD;
    
    case VehicleStatus.SOLD:
      // Từ "Đã bán" không thể chuyển sang trạng thái khác
      return false;
    
    default:
      return false;
  }
}

// Hàm lấy màu sắc trạng thái
export function getStatusColor(status: VehicleStatus): string {
  switch (status) {
    case VehicleStatus.IN_STOCK: return 'rgba(76, 175, 80, 0.1)';
    case VehicleStatus.DEPOSITED: return 'rgba(255, 152, 0, 0.1)';
    case VehicleStatus.BANK_DEPOSITED: return 'rgba(33, 150, 243, 0.1)';
    case VehicleStatus.OFFSET: return 'rgba(156, 39, 176, 0.1)';
    case VehicleStatus.SOLD: return 'rgba(0, 150, 136, 0.1)';
    default: return '#6c757d';
  }
}

// Hàm lấy màu chữ trạng thái
export function getStatusTextColor(status: VehicleStatus): string {
  switch (status) {
    case VehicleStatus.IN_STOCK: return '#2E7D32';
    case VehicleStatus.DEPOSITED: return '#E67E22';
    case VehicleStatus.BANK_DEPOSITED: return '#1976D2';
    case VehicleStatus.OFFSET: return '#8E44AD';
    case VehicleStatus.SOLD: return '#00796B';
    default: return '#6c757d';
  }
}

// Hàm lấy màu viền trạng thái
export function getStatusBorderColor(status: VehicleStatus): string {
  switch (status) {
    case VehicleStatus.IN_STOCK: return 'rgba(76, 175, 80, 0.2)';
    case VehicleStatus.DEPOSITED: return 'rgba(255, 152, 0, 0.2)';
    case VehicleStatus.BANK_DEPOSITED: return 'rgba(33, 150, 243, 0.2)';
    case VehicleStatus.OFFSET: return 'rgba(156, 39, 176, 0.2)';
    case VehicleStatus.SOLD: return 'rgba(0, 150, 136, 0.2)';
    default: return '#6c757d';
  }
}

// Hàm tính toán công nợ
export function calculateDebt(
  salePrice: number, 
  payments: PaymentInfo[]
): number {
  // Tính tổng các khoản thanh toán
  const depositAmount = payments
    .filter(p => p.type === 'DEPOSIT')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const bankDepositAmount = payments
    .filter(p => p.type === 'BANK_DEPOSIT')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const offsetAmount = payments
    .filter(p => p.type === 'OFFSET')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const fullPaymentAmount = payments
    .filter(p => p.type === 'FULL_PAYMENT')
    .reduce((sum, p) => sum + p.amount, 0);
  
  // Tổng các khoản thanh toán = Đặt cọc + Đặt cọc ngân hàng + Tiền đối ứng + Thanh toán đầy đủ
  const totalPaid = depositAmount + bankDepositAmount + offsetAmount + fullPaymentAmount;
  
  // Tính công nợ: Giá bán - Tổng các khoản đã thanh toán
  // Không cho phép công nợ âm
  const debt = Math.max(0, salePrice - totalPaid);
  
  // Log chi tiết để kiểm tra việc tính toán
  console.log('Debt Calculation (Chi tiết):', {
    salePrice,
    totalPaid,
    depositAmount,
    bankDepositAmount,
    offsetAmount,
    fullPaymentAmount,
    debt
  });
  
  return debt;
}

// Hàm tính toán công nợ khi chuyển trạng thái
export function calculateDebtOnStatusChange(
  vehicle: Vehicle, 
  newStatus: VehicleStatus,
  paymentAmount: number = 0
): number {
  // Nếu về trạng thái Trong kho, reset công nợ về 0 và xóa toàn bộ thanh toán
  if (newStatus === VehicleStatus.IN_STOCK) {
    console.log('Reset công nợ về 0 và xóa toàn bộ thanh toán khi chuyển về trạng thái Trong kho');
    
    // Chú ý: Chúng ta không thực sự xóa thanh toán ở đây vì đây chỉ là hàm tính toán
    // Việc xóa thanh toán sẽ được thực hiện trong StatusChangeModal
    return 0;
  }
  
  // Nếu chuyển sang trạng thái Đã bán, reset công nợ về 0
  if (newStatus === VehicleStatus.SOLD) {
    console.log('Reset công nợ về 0 khi chuyển sang trạng thái Đã bán');
    return 0;
  }
  
  // Tạo bản sao của mảng thanh toán để không ảnh hưởng đến dữ liệu gốc
  const allPayments = [...vehicle.payments];
  
  // Nếu có thanh toán mới, thêm vào danh sách để tính toán
  if (paymentAmount > 0) {
    const paymentType = getPaymentType(vehicle.status, newStatus);
    const newPayment: PaymentInfo = {
      amount: paymentAmount,
      date: new Date(),
      type: paymentType,
      notes: `Thanh toán khi chuyển từ ${vehicle.status} sang ${newStatus}`
    };
    allPayments.push(newPayment);
  }
  
  // Tính toán công nợ dựa trên tất cả các khoản thanh toán
  const debt = calculateDebt(vehicle.salePrice, allPayments);
  
  // Chi tiết tính toán công nợ theo loại thanh toán
  const depositAmount = allPayments
    .filter(p => p.type === 'DEPOSIT')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const bankDepositAmount = allPayments
    .filter(p => p.type === 'BANK_DEPOSIT')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const offsetAmount = allPayments
    .filter(p => p.type === 'OFFSET')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const fullPaymentAmount = allPayments
    .filter(p => p.type === 'FULL_PAYMENT')
    .reduce((sum, p) => sum + p.amount, 0);
  
  // Tổng các khoản thanh toán
  const totalPaid = depositAmount + bankDepositAmount + offsetAmount + fullPaymentAmount;
  
  // Log chi tiết để kiểm tra việc tính toán
  console.log('Debt On Status Change (Chi tiết):', {
    vehicleId: vehicle.id,
    currentStatus: vehicle.status,
    newStatus,
    salePrice: vehicle.salePrice,
    totalPaid,
    depositAmount,
    bankDepositAmount,
    offsetAmount,
    fullPaymentAmount,
    paymentAmount,
    calculatedDebt: debt
  });
  
  return debt;
}

// Hàm xác định loại thanh toán
export function getPaymentType(
  fromStatus: VehicleStatus, 
  toStatus: VehicleStatus
): PaymentInfo['type'] {
  console.log(`Xác định loại thanh toán cho chuyển trạng thái: ${fromStatus} -> ${toStatus}`);
  
  // Từ Trong kho sang Đặt cọc => Thanh toán tiền đặt cọc
  if (fromStatus === VehicleStatus.IN_STOCK && toStatus === VehicleStatus.DEPOSITED) 
    return 'DEPOSIT';
  
  // Từ Trong kho sang Đặt cọc ngân hàng => Thanh toán tiền đặt cọc ngân hàng
  if (fromStatus === VehicleStatus.IN_STOCK && toStatus === VehicleStatus.BANK_DEPOSITED) 
    return 'BANK_DEPOSIT';
  
  // Từ Đặt cọc ngân hàng sang Đóng đối ứng => Thanh toán tiền đối ứng
  if (fromStatus === VehicleStatus.BANK_DEPOSITED && toStatus === VehicleStatus.OFFSET) 
    return 'OFFSET';
  
  // Bất kỳ trạng thái nào sang Đã bán => Thanh toán đầy đủ
  if (toStatus === VehicleStatus.SOLD) 
    return 'FULL_PAYMENT';
  
  // Mặc định là thanh toán tiền đặt cọc
  console.log('Không xác định được loại thanh toán cụ thể, sử dụng DEPOSIT');
  return 'DEPOSIT';
}

// Hàm tạo lịch sử trạng thái
export function createStatusHistory(
  fromStatus: VehicleStatus, 
  toStatus: VehicleStatus, 
  changedBy: string = 'System',
  notes?: string
): StatusHistory {
  return {
    fromStatus,
    toStatus,
    changedAt: new Date(),
    changedBy,
    notes
  };
} 