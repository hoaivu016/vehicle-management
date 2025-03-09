import React, { useState, useEffect } from 'react';
import { 
  Tabs, 
  Tab, 
  Box, 
  Typography, 
  CircularProgress,
  Container,
  Alert,
  Snackbar,
  AlertColor
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store';
import { getAllStaff, addStaff, updateStaff, deleteStaff } from '../../../../store/slices/staffSlice';
import StaffList from '../../components/StaffList';
import StaffForm from '../../components/StaffForm';
import { getAllVehicles } from '../../../../store/slices/vehicleSlice';
import { Staff } from '../../../../types/staff/staff';
import { AppDispatch } from '../../../../store';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

const AdminPage: React.FC = () => {
  // State cho tab hiện tại
  const [activeTab, setActiveTab] = useState(0);
  
  // State cho form thêm/sửa nhân viên
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState<Staff | null>(null);
  
  // State cho thông báo
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });
  
  const dispatch = useDispatch<AppDispatch>();
  
  // Lấy danh sách nhân viên và xe từ Redux store
  const { staffList, loading: staffLoading, error: staffError } = useSelector((state: RootState) => state.staff);
  const { vehicles, loading: vehiclesLoading } = useSelector((state: RootState) => state.vehicles);

  // Tải dữ liệu khi component được mount
  useEffect(() => {
    dispatch(getAllStaff());
    dispatch(getAllVehicles());
  }, [dispatch]);

  // Xử lý khi thay đổi tab
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Mở form thêm mới nhân viên
  const handleAddStaff = () => {
    setCurrentStaff(null);
    setIsFormOpen(true);
  };

  // Mở form sửa nhân viên
  const handleEditStaff = (staff: Staff) => {
    setCurrentStaff(staff);
    setIsFormOpen(true);
  };

  // Đóng form
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  // Xử lý lưu thông tin nhân viên
  const handleSaveStaff = async (staffData: Partial<Staff>) => {
    try {
      if (currentStaff) {
        // Cập nhật nhân viên
        await dispatch(updateStaff({
          ...currentStaff,
          ...staffData
        }));
        setSnackbar({
          open: true,
          message: 'Cập nhật thông tin nhân viên thành công',
          severity: 'success'
        });
      } else {
        // Thêm nhân viên mới
        await dispatch(addStaff(staffData as Staff));
        setSnackbar({
          open: true,
          message: 'Thêm nhân viên mới thành công',
          severity: 'success'
        });
      }
      setIsFormOpen(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Đã xảy ra lỗi: ' + (error as Error).message,
        severity: 'error'
      });
    }
  };

  // Xử lý xóa nhân viên
  const handleDeleteStaff = async (staffId: string) => {
    try {
      await dispatch(deleteStaff(staffId));
      setSnackbar({
        open: true,
        message: 'Xóa nhân viên thành công',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Đã xảy ra lỗi khi xóa nhân viên: ' + (error as Error).message,
        severity: 'error'
      });
    }
  };

  // Đóng thông báo
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            aria-label="admin tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Quản lý nhân viên" {...a11yProps(0)} />
            <Tab label="Cấu hình hệ thống" {...a11yProps(1)} />
            <Tab label="Phân quyền" {...a11yProps(2)} />
            <Tab label="KPI & Thưởng" {...a11yProps(3)} />
            <Tab label="Báo cáo" {...a11yProps(4)} />
          </Tabs>
        </Box>
        
        {/* Tab Quản lý nhân viên */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h5" sx={{ mb: 3 }}>Quản lý nhân viên</Typography>
          
          {staffError && <Alert severity="error">{staffError}</Alert>}
          
          {staffLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <StaffList 
              staffList={staffList} 
              onEdit={handleEditStaff} 
              onDelete={handleDeleteStaff}
              vehicles={vehicles}
              onAdd={handleAddStaff}
            />
          )}
          
          {isFormOpen && (
            <StaffForm
              open={isFormOpen}
              staff={currentStaff}
              onClose={handleCloseForm}
              onSave={handleSaveStaff}
            />
          )}
        </TabPanel>
        
        {/* Tab Cấu hình hệ thống */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h5">Cấu hình hệ thống</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Tính năng đang phát triển...
          </Typography>
        </TabPanel>
        
        {/* Tab Phân quyền */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h5">Phân quyền người dùng</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Tính năng đang phát triển...
          </Typography>
        </TabPanel>
        
        {/* Tab KPI & Thưởng */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h5">Quản lý KPI & Thưởng</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Tính năng đang phát triển...
          </Typography>
        </TabPanel>
        
        {/* Tab Báo cáo */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h5">Báo cáo quản trị</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Tính năng đang phát triển...
          </Typography>
        </TabPanel>
      </Box>
      
      {/* Snackbar thông báo */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminPage; 