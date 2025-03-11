/**
 * Các hàm định dạng cho ứng dụng
 */

/**
 * Định dạng số thành dạng tiền tệ (VND)
 * @param value - Giá trị cần định dạng
 * @param showSymbol - Có hiển thị ký hiệu tiền tệ hay không
 * @returns Chuỗi đã định dạng
 */
export const formatCurrency = (value: number | undefined | null, showSymbol = true): string => {
  if (value === undefined || value === null) return '-';
  
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  return formatter.format(value);
};

/**
 * Định dạng số
 * @param value - Giá trị cần định dạng
 * @returns Chuỗi đã định dạng
 */
export const formatNumber = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '-';
  
  const formatter = new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  return formatter.format(value);
};

/**
 * Phân tích chuỗi đã định dạng và chuyển về số
 * @param formattedValue - Chuỗi đã định dạng
 * @returns Giá trị số
 */
export const parseFormattedNumber = (formattedValue: string): number => {
  if (!formattedValue) return 0;
  
  // Loại bỏ tất cả ký tự không phải số, ngoại trừ dấu thập phân
  const numericValue = formattedValue.replace(/[^\d.-]/g, '');
  
  // Xử lý chuỗi số lớn
  if (numericValue.length > 15) {
    console.warn('Số quá lớn, có thể gây mất độ chính xác:', numericValue);
  }
  
  // Chuyển đổi thành số
  return parseFloat(numericValue) || 0;
};

/**
 * Định dạng ngày tháng
 * @param date - Ngày cần định dạng (string, Date hoặc undefined)
 * @param format - Định dạng hiển thị, mặc định là 'dd/MM/yyyy'
 * @returns Chuỗi ngày đã định dạng
 */
export const formatDate = (
  date: string | Date | undefined | null,
  format = 'dd/MM/yyyy'
): string => {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return '-';
    }
    
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    
    // Áp dụng định dạng
    let formattedDate = format
      .replace('dd', day)
      .replace('MM', month)
      .replace('yyyy', year.toString())
      .replace('yy', year.toString().slice(-2));
    
    return formattedDate;
  } catch (error) {
    console.error('Lỗi định dạng ngày:', error);
    return '-';
  }
};

/**
 * Định dạng phần trăm
 * @param value - Giá trị phần trăm
 * @param decimalPlaces - Số chữ số thập phân
 * @returns Chuỗi phần trăm đã định dạng
 */
export const formatPercent = (value: number | undefined | null, decimalPlaces = 1): string => {
  if (value === undefined || value === null) return '-';
  
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'percent',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });
  
  return formatter.format(value / 100);
}; 