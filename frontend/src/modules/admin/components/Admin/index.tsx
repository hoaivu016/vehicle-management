import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Tabs, 
  Tab, 
  CircularProgress, 
  Alert, 
  Snackbar,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import Dashboard from '../Dashboard';
import StaffList from '../StaffList';
import StaffForm from '../StaffForm';
import CommissionConfig from '../CommissionConfig';
import { Staff } from '../../../../models/staff';
import { KpiTarget, SupportDepartmentBonus } from '../../../../models/kpi';
import { Vehicle } from '../../../../types/vehicles/vehicle';
import { AlertColor } from '@mui/material';

// Enum cho cấu trúc tab rõ ràng
enum AdminTab {
  DASHBOARD = 0,
  CONFIG = 1,
  STAFF = 2
}

interface AdminProps {
  staffList: Staff[];
  vehicles: Vehicle[];
  onAddStaff: (staffData: Partial<Staff>) => void;
  onEditStaff: (staffData: Partial<Staff>) => void;
  onDeleteStaff: (staffId: string) => void;
  kpiList: KpiTarget[];
  onSaveKpi: (kpi: KpiTarget[]) => void;
  supportBonusList: SupportDepartmentBonus[];
  onSaveSupportBonus: (bonus: SupportDepartmentBonus[]) => void;
  selectedMonth?: number;
  selectedYear?: number;
  onDateChange?: (month: number, year: number) => void;
}

// Component quản lý trang Admin
const Admin: React.FC<AdminProps> = ({
  staffList,
  vehicles,
  onAddStaff,
  onEditStaff,
  onDeleteStaff,
  kpiList,
  onSaveKpi,
  supportBonusList,
  onSaveSupportBonus,
  selectedMonth,
  selectedYear,
  onDateChange
}) => {
  // Theme và media query cho responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // State cho quản lý tab
  const [currentTab, setCurrentTab] = useState<AdminTab>(AdminTab.DASHBOARD);
  
  // State cho form nhân viên
  const [isStaffFormOpen, setIsStaffFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');
  
  // State cho thông báo
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  // Xử lý chuyển tab
  const handleTabChange = (event: React.SyntheticEvent, newValue: AdminTab) => {
    setCurrentTab(newValue);
  };

  // Xử lý chuyển tab trên mobile (BottomNavigation)
  const handleMobileTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(parseInt(newValue) as AdminTab);
  };
  
  // Xử lý mở form thêm nhân viên
  const handleOpenAddStaffForm = () => {
    setEditingStaff(null);
    setIsStaffFormOpen(true);
  };
  
  // Xử lý mở form chỉnh sửa nhân viên
  const handleOpenEditStaffForm = (staff: Staff) => {
    setEditingStaff(staff);
    setIsStaffFormOpen(true);
  };
  
  // Xử lý đóng form nhân viên
  const handleCloseStaffForm = () => {
    setIsStaffFormOpen(false);
    setEditingStaff(null);
  };
  
  // Xử lý thêm nhân viên mới
  const handleSubmitStaffForm = (staffData: Partial<Staff>) => {
    if (editingStaff && editingStaff.id) {
      // Nếu đang chỉnh sửa nhân viên
      onEditStaff({
        ...staffData,
        id: editingStaff.id
      });
      
      // Hiển thị thông báo
      setSnackbar({
        open: true,
        message: `Đã cập nhật thông tin nhân viên ${staffData.name}`,
        severity: 'success'
      });
    } else {
      // Nếu đang thêm nhân viên mới
      onAddStaff(staffData);
      
      // Hiển thị thông báo
      setSnackbar({
        open: true,
        message: `Đã thêm nhân viên ${staffData.name}`,
        severity: 'success'
      });
    }
    
    // Đóng form
    setIsStaffFormOpen(false);
    setEditingStaff(null);
  };
  
  // Xử lý xác nhận xóa nhân viên
  const handleDeleteStaff = (staffId: string, staffName: string) => {
    // Xóa nhân viên
    onDeleteStaff(staffId);
    
    // Hiển thị thông báo
    setSnackbar({
      open: true,
      message: `Đã xóa nhân viên ${staffName}`,
      severity: 'info'
    });
  };
  
  // Xử lý đóng snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  // Render component dựa trên tab được chọn
  const renderTabContent = () => {
    switch (currentTab) {
      case AdminTab.DASHBOARD:
        return (
          <Dashboard 
            staffList={staffList}
            vehicles={vehicles}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onDateChange={onDateChange}
            kpiList={kpiList}
          />
        );
      case AdminTab.CONFIG:
        return (
          <CommissionConfig 
            staffList={staffList}
            onSaveKpi={onSaveKpi}
            onSaveSupportBonus={onSaveSupportBonus}
            currentKpis={kpiList}
            currentSupportBonuses={supportBonusList}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onDateChange={onDateChange}
          />
        );
      case AdminTab.STAFF:
        return (
          <StaffList 
            staffList={staffList}
            vehicles={vehicles}
            onEdit={handleOpenEditStaffForm}
            onDelete={(staffId) => {
              // Tìm thông tin nhân viên để lấy tên
              const staff = staffList.find(s => s.id === staffId);
              if (staff) {
                handleDeleteStaff(staffId, staff.name);
              }
            }}
            onAdd={handleOpenAddStaffForm}
          />
        );
      default:
        return <Typography>Trang không tồn tại</Typography>;
    }
  };

  return (
    <Box>
      {/* Tabs với breakpoint để thay đổi hướng trên mobile */}
      <Paper sx={{ mb: 3, borderRadius: 1 }}>
        {isMobile ? (
          // Hiển thị tab trong Bottom Navigation cho mobile
          <BottomNavigation 
            value={currentTab.toString()} 
            onChange={handleMobileTabChange}
            showLabels
            sx={{ 
              width: '100%',
              borderRadius: 1
            }}
          >
            <BottomNavigationAction 
              label="Dashboard" 
              value={AdminTab.DASHBOARD.toString()} 
              icon={<DashboardIcon />} 
            />
            <BottomNavigationAction 
              label="Config" 
              value={AdminTab.CONFIG.toString()} 
              icon={<SettingsIcon />} 
            />
            <BottomNavigationAction 
              label="Nhân Viên" 
              value={AdminTab.STAFF.toString()} 
              icon={<PeopleIcon />} 
            />
          </BottomNavigation>
        ) : (
          // Tab thông thường cho desktop
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Dashboard" />
            <Tab label="Cấu Hình Hoa Hồng" />
            <Tab label="Quản Lý Nhân Viên" />
          </Tabs>
        )}
      </Paper>

      {/* Nội dung tab */}
      <Box sx={{ 
        p: isMobile ? 1 : 3, 
        bgcolor: 'background.paper',
        borderRadius: 1
      }}>
        {renderTabContent()}
      </Box>

      {/* Form nhân viên */}
      {isStaffFormOpen && (
        <StaffForm 
          open={isStaffFormOpen}
          onClose={handleCloseStaffForm}
          onSave={handleSubmitStaffForm}
          staff={editingStaff}
        />
      )}

      {/* Snackbar thông báo */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Paper elevation={3}>
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Paper>
      </Snackbar>
    </Box>
  );
};

export default Admin; 