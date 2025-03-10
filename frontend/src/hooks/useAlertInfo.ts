import { useState } from 'react';

// Kiểu thông báo
export type AlertSeverity = 'success' | 'info' | 'warning' | 'error';

// Interface cho thông tin thông báo
export interface AlertInfo {
  message: string;
  severity: AlertSeverity;
  open: boolean;
}

// Giá trị mặc định
const defaultAlertInfo: AlertInfo = {
  message: '',
  severity: 'info',
  open: false
};

/**
 * Custom hook để quản lý thông báo trong ứng dụng
 * @returns Các giá trị và hàm để quản lý thông báo
 */
export const useAlertInfo = () => {
  // State cho thông báo
  const [alertInfo, setAlertInfo] = useState<AlertInfo>(defaultAlertInfo);

  // Hiển thị thông báo
  const showAlert = (message: string, severity: AlertSeverity = 'info') => {
    setAlertInfo({
      message,
      severity,
      open: true
    });
  };

  // Hiển thị thông báo thành công
  const showSuccess = (message: string) => {
    showAlert(message, 'success');
  };

  // Hiển thị thông báo lỗi
  const showError = (message: string) => {
    showAlert(message, 'error');
  };

  // Hiển thị thông báo cảnh báo
  const showWarning = (message: string) => {
    showAlert(message, 'warning');
  };

  // Hiển thị thông báo thông tin
  const showInfo = (message: string) => {
    showAlert(message, 'info');
  };

  // Đóng thông báo
  const closeAlert = () => {
    setAlertInfo(prev => ({
      ...prev,
      open: false
    }));
  };

  return {
    alertInfo,
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    closeAlert
  };
}; 