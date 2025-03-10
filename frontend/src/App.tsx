import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Tabs, 
  Tab, 
  Paper,
  AppBar,
  CssBaseline,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
  Alert,
  Chip,
  Slide,
  Portal
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import VehicleList from './modules/vehicles/components/VehicleList';
import VehicleForm from './modules/vehicles/components/VehicleForm';
import StatusChangeModal from './modules/vehicles/components/StatusChangeModal';
import Report from './modules/reports/components/Report';
import Admin from './modules/admin/components/Admin';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { 
  Vehicle, 
  VehicleStatus, 
  generateVehicleId, 
  calculateStorageTime, 
  calculateProfit,
  calculateDebt,
  CostInfo
} from './types/vehicles/vehicle';
import {
  Staff,
  generateStaffId,
  StaffStatus,
  calculateTotalCommission,
  StaffTeam,
  StaffRole
} from './types/staff/staff';
import { KpiTarget, SupportDepartmentBonus } from './models/kpi';
import { supabase } from './lib/database/supabase';
import { 
  syncPendingActions, 
  loadVehiclesFromSupabase, 
  loadStaffFromSupabase,
  loadKpiFromSupabase,
  loadSupportBonusFromSupabase,
  savePendingSync 
} from './lib/database/syncService';

// Định nghĩa interface cho các tab
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Component TabPanel để hiển thị nội dung của từng tab
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  // Thêm hỗ trợ xác định thiết bị di động
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State kiểm tra kết nối Supabase
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [showSyncMessage, setShowSyncMessage] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<{message: string, type: 'success' | 'error' | 'info'}>({
    message: '',
    type: 'success'
  });
  
  // Thêm cờ đánh dấu trạng thái đang đồng bộ để tránh đồng bộ nhiều lần
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  // Thêm cờ đánh dấu có dữ liệu chưa lưu khi chuyển tab
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Hàm kiểm tra xung đột dữ liệu
  const checkDataConflicts = (localData: any[], serverData: any[], idField: string = 'id') => {
    const conflictItems = [];
    
    // Lọc các mục có trong cả local và server nhưng có timestamp khác nhau
    for (const localItem of localData) {
      const serverItem = serverData.find(item => item[idField] === localItem[idField]);
      
      if (serverItem && localItem.updatedAt && serverItem.updatedAt) {
        const localTimestamp = new Date(localItem.updatedAt).getTime();
        const serverTimestamp = new Date(serverItem.updatedAt).getTime();
        
        // Nếu thời gian cập nhật khác nhau, đánh dấu là xung đột
        if (Math.abs(localTimestamp - serverTimestamp) > 1000) { // Cho phép chênh lệch 1 giây
          conflictItems.push({
            id: localItem[idField],
            local: localItem,
            server: serverItem,
            newerVersion: localTimestamp > serverTimestamp ? 'local' : 'server'
          });
        }
      }
    }
    
    return conflictItems;
  };
  
  // Hàm giải quyết xung đột dữ liệu
  const resolveDataConflicts = (conflicts: any[], preferNewerVersion: boolean = true) => {
    if (conflicts.length === 0) return [];
    
    return conflicts.map(conflict => {
      // Mặc định ưu tiên phiên bản mới hơn
      if (preferNewerVersion) {
        return conflict.newerVersion === 'local' ? conflict.local : conflict.server;
      }
      
      // Logic tùy chỉnh để giải quyết xung đột có thể được thêm vào đây
      // Ví dụ: merge các trường từ cả hai phiên bản
      
      return conflict.local; // Mặc định giữ phiên bản local nếu không có logic khác
    });
  };

  // Hàm đồng bộ dữ liệu
  const synchronizeData = async () => {
    // Kiểm tra nếu đang đồng bộ thì không thực hiện nữa
    if (isSyncing) return;
    
    try {
      setIsSyncing(true);
      // Hiển thị thông báo đang đồng bộ
      setSyncMessage({
        message: 'Đang đồng bộ dữ liệu...',
        type: 'info'
      });
      setShowSyncMessage(true);

      // Lưu dữ liệu vào localStorage trước khi đồng bộ
      localStorage.setItem('vehicles_before_sync', JSON.stringify(vehicles));
      localStorage.setItem('staff_before_sync', JSON.stringify(staffList));
      
      // Đồng bộ các thay đổi đang chờ
      const syncResult = await syncPendingActions();
      
      if (syncResult) {
        // Tải dữ liệu từ Supabase và merge với dữ liệu local
        const [vehiclesData, staffData, kpiData, bonusData] = await Promise.all([
          loadVehiclesFromSupabase(),
          loadStaffFromSupabase(),
          loadKpiFromSupabase(),
          loadSupportBonusFromSupabase()
        ]);
        
        // Kiểm tra xung đột
        const vehicleConflicts = checkDataConflicts(vehicles, vehiclesData);
        const staffConflicts = checkDataConflicts(staffList, staffData);
        
        // Giải quyết xung đột
        const resolvedVehicles = resolveDataConflicts(vehicleConflicts);
        const resolvedStaff = resolveDataConflicts(staffConflicts);
        
        // Merge dữ liệu đã giải quyết xung đột
        const mergedVehicles = [...vehiclesData];
        const mergedStaff = [...staffData];
        
        // Thay thế các mục có xung đột bằng phiên bản đã giải quyết
        resolvedVehicles.forEach(resolvedVehicle => {
          const index = mergedVehicles.findIndex(v => v.id === resolvedVehicle.id);
          if (index !== -1) {
            mergedVehicles[index] = resolvedVehicle;
          }
        });
        
        resolvedStaff.forEach(resolvedStaff => {
          const index = mergedStaff.findIndex(s => s.id === resolvedStaff.id);
          if (index !== -1) {
            mergedStaff[index] = resolvedStaff;
          }
        });
        
        // Cập nhật state với dữ liệu đã được merge giữa local và server
        setVehicles(currentVehicles => {
          // Xử lý dates cho vehiclesData
          const processedVehiclesData = mergedVehicles.map(vehicle => ({
            ...vehicle,
            importDate: vehicle.importDate instanceof Date ? vehicle.importDate : new Date(vehicle.importDate),
            exportDate: vehicle.exportDate ? (vehicle.exportDate instanceof Date ? vehicle.exportDate : new Date(vehicle.exportDate)) : undefined
          }));
          
          // Kiểm tra xem có dữ liệu nào thực sự thay đổi không
          if (JSON.stringify(currentVehicles) === JSON.stringify(processedVehiclesData)) {
            return currentVehicles; // Không thay đổi state nếu dữ liệu giống nhau
          }
          return processedVehiclesData;
        });
        
        setStaffList(currentStaff => {
          // Xử lý dates cho staffData
          const processedStaffData = mergedStaff.map(staff => ({
            ...staff,
            joinDate: staff.joinDate instanceof Date ? staff.joinDate : new Date(staff.joinDate),
            terminationDate: staff.terminationDate ? (staff.terminationDate instanceof Date ? staff.terminationDate : new Date(staff.terminationDate)) : undefined
          }));
          
          // Kiểm tra xem có dữ liệu nào thực sự thay đổi không
          if (JSON.stringify(currentStaff) === JSON.stringify(processedStaffData)) {
            return currentStaff; // Không thay đổi state nếu dữ liệu giống nhau
          }
          return processedStaffData;
        });
        
        setKpiList(currentKPI => {
          // Xử lý dates cho kpiData
          const processedKpiData = kpiData.map(kpi => ({
            ...kpi,
            createdAt: kpi.createdAt instanceof Date ? kpi.createdAt : new Date(kpi.createdAt),
            updatedAt: kpi.updatedAt instanceof Date ? kpi.updatedAt : new Date(kpi.updatedAt)
          }));
          
          // Kiểm tra xem có dữ liệu nào thực sự thay đổi không
          if (JSON.stringify(currentKPI) === JSON.stringify(processedKpiData)) {
            return currentKPI; // Không thay đổi state nếu dữ liệu giống nhau
          }
          return processedKpiData;
        });
        
        setSupportBonusList(currentBonuses => {
          // Xử lý dates cho bonusData
          const processedBonusData = bonusData.map(bonus => ({
            ...bonus,
            createdAt: bonus.createdAt instanceof Date ? bonus.createdAt : new Date(bonus.createdAt),
            updatedAt: bonus.updatedAt instanceof Date ? bonus.updatedAt : new Date(bonus.updatedAt)
          }));
          
          // Kiểm tra xem có dữ liệu nào thực sự thay đổi không
          if (JSON.stringify(currentBonuses) === JSON.stringify(processedBonusData)) {
            return currentBonuses; // Không thay đổi state nếu dữ liệu giống nhau
          }
          return processedBonusData;
        });
        
        setSyncMessage({
          message: 'Đồng bộ dữ liệu thành công',
          type: 'success'
        });
        setShowSyncMessage(true);
      }
    } catch (error) {
      console.error('Lỗi khi đồng bộ dữ liệu:', error);
      setSyncMessage({
        message: 'Đồng bộ dữ liệu thất bại',
        type: 'error'
      });
      setShowSyncMessage(true);
    } finally {
      setIsSyncing(false);
    }
  };

  // Kiểm tra kết nối Supabase khi khởi động
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const connectionCheck = await supabase.from('vehicles').select('count').single();
        const isConnected = Boolean(connectionCheck);
        setIsOnline(isConnected);
        
        if (isConnected) {
          // Lưu thông tin thiết bị đang đồng bộ
          const deviceInfo = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            timestamp: new Date().toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          };
          
          // Lưu thông tin thiết bị vào localStorage
          localStorage.setItem('lastSyncDevice', JSON.stringify(deviceInfo));
          
          // Nếu có bảng sync_logs trong Supabase, lưu log vào đó
          try {
            await supabase.from('sync_logs').insert([{
              device_info: deviceInfo,
              sync_time: new Date().toISOString(),
              is_successful: true
            }]);
          } catch (error) {
            // Bỏ qua lỗi nếu bảng không tồn tại
            console.log('Không thể lưu log đồng bộ, có thể bảng sync_logs chưa được tạo');
          }
          
          await synchronizeData();
        }
        
        return isConnected;
      } catch (error) {
        console.error("Lỗi khi kiểm tra kết nối:", error);
        setIsOnline(false);
        return false;
      }
    };

    checkConnection();

    // Kiểm tra kết nối mỗi phút
    const interval = setInterval(checkConnection, 60000);
    
    // Kiểm tra khi mạng thay đổi
    const handleOnline = () => {
      checkConnection();
    };
    
    window.addEventListener('online', handleOnline);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
    };
  }, [synchronizeData]);

  // State cho danh sách xe
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    // Khôi phục danh sách xe từ localStorage khi khởi tạo
    const savedVehicles = localStorage.getItem('vehicles');
    return savedVehicles 
      ? JSON.parse(savedVehicles).map((vehicle: Vehicle) => ({
          ...vehicle,
          importDate: new Date(vehicle.importDate),
          exportDate: vehicle.exportDate ? new Date(vehicle.exportDate) : undefined
        }))
      : [];
  });

  // State toàn cục cho việc chọn tháng/năm
  const currentDate = new Date();
  const [globalMonth, setGlobalMonth] = useState(currentDate.getMonth() + 1);
  const [globalYear, setGlobalYear] = useState(currentDate.getFullYear());

  // State cho danh sách nhân sự
  const [staffList, setStaffList] = useState<Staff[]>(() => {
    // Khôi phục danh sách nhân sự từ localStorage khi khởi tạo
    const savedStaff = localStorage.getItem('staffList');
    if (savedStaff) {
      return JSON.parse(savedStaff).map((staff: Staff) => ({
        ...staff,
        joinDate: new Date(staff.joinDate),
        terminationDate: staff.terminationDate ? new Date(staff.terminationDate) : undefined
      }));
    } else {
      // Tạo một nhân viên mẫu nếu chưa có dữ liệu
      const sampleStaff: Staff = {
        id: 'NV01VU',
        name: 'Phan Hữu Hoài Vũ',
        phone: '0888813838',
        email: 'vuphan@example.com',
        address: 'Thành phố Hồ Chí Minh',
        team: StaffTeam.SALES_1,
        role: StaffRole.STAFF,
        status: StaffStatus.ACTIVE,
        joinDate: new Date('2025-02-01'),
        salary: 5000000,
        commissionRate: 5,
        vehiclesSold: 0,
        totalCommission: 0,
        note: 'Nhân viên mẫu'
      };
      return [sampleStaff];
    }
  });

  // State cho form xe
  const [isVehicleFormOpen, setIsVehicleFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Partial<Vehicle> | undefined>(undefined);
  const [isStatusChangeModalOpen, setIsStatusChangeModalOpen] = useState(false);
  const [selectedVehicleForStatusChange, setSelectedVehicleForStatusChange] = useState<Vehicle | undefined>(undefined);
  
  // State để quản lý tab hiện tại
  const [currentTab, setCurrentTab] = useState(0);

  // State cho KPI và thưởng
  const [kpiList, setKpiList] = useState<KpiTarget[]>(() => {
    // Khôi phục danh sách KPI từ localStorage khi khởi tạo
    const savedKpis = localStorage.getItem('kpis');
    return savedKpis ? JSON.parse(savedKpis).map((kpi: KpiTarget) => ({
      ...kpi,
      createdAt: new Date(kpi.createdAt),
      updatedAt: new Date(kpi.updatedAt)
    })) : [];
  });

  // State cho thưởng phòng hỗ trợ
  const [supportBonusList, setSupportBonusList] = useState<SupportDepartmentBonus[]>(() => {
    // Khôi phục danh sách thưởng từ localStorage khi khởi tạo
    const savedBonuses = localStorage.getItem('supportBonuses');
    return savedBonuses ? JSON.parse(savedBonuses).map((bonus: SupportDepartmentBonus) => ({
      ...bonus,
      createdAt: new Date(bonus.createdAt),
      updatedAt: new Date(bonus.updatedAt)
    })) : [];
  });

  // Lưu danh sách xe vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  // Lưu danh sách nhân sự vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('staffList', JSON.stringify(staffList));
  }, [staffList]);

  // Lưu danh sách KPI vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('kpis', JSON.stringify(kpiList));
  }, [kpiList]);

  // Lưu danh sách thưởng phòng hỗ trợ vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('supportBonuses', JSON.stringify(supportBonusList));
  }, [supportBonusList]);

  // Hàm cập nhật tính toán cho xe
  const updateVehicleCalculations = (vehicle: Vehicle): Vehicle => {
    // Tính thời gian lưu kho
    const storageTime = calculateStorageTime(
      vehicle.importDate,
      vehicle.exportDate
    );
    
    // Tính công nợ dựa trên giá bán và các khoản thanh toán
    const debt = calculateDebt(vehicle.salePrice, vehicle.payments);
    
    // Tính lợi nhuận dựa trên giá bán, giá mua và chi phí
    const profit = calculateProfit({
      purchasePrice: vehicle.purchasePrice,
      salePrice: vehicle.salePrice,
      cost: vehicle.cost,
      debt: debt
    });
    
    // Trả về xe đã được cập nhật các giá trị tính toán
    return {
      ...vehicle,
      storageTime,
      debt,
      profit
    };
  };

  // Hàm tính toán lại tất cả xe
  const recalculateAllVehicles = useCallback(() => {
    if (!vehicles || vehicles.length === 0) return;
    
    const recalculatedVehicles = vehicles.map(vehicle => updateVehicleCalculations(vehicle));
    
    // Nếu có sự thay đổi, cập nhật state và localStorage
    if (JSON.stringify(recalculatedVehicles) !== JSON.stringify(vehicles)) {
      console.log('Đã tính toán lại dữ liệu của tất cả xe');
      setVehicles(recalculatedVehicles);
      localStorage.setItem('vehicles', JSON.stringify(recalculatedVehicles));
    }
  }, [vehicles]);

  // Tính toán lại khi component mount
  useEffect(() => {
    // Chạy một lần khi component mount
    const timer = setTimeout(() => {
      if (vehicles && vehicles.length > 0) {
        recalculateAllVehicles();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [recalculateAllVehicles]);

  // Xử lý thêm xe
  const handleAddVehicle = (vehicleData: Partial<Vehicle>) => {
    setHasUnsavedChanges(false); // Reset cờ khi đã lưu
    
    // Tạo một đối tượng xe mới với các giá trị mặc định
    const newVehicle: Vehicle = {
      ...vehicleData as Vehicle,
      id: vehicleData.id || generateVehicleId(vehicles),
      status: vehicleData.status || VehicleStatus.IN_STOCK,
      cost: vehicleData.cost || 0,
      costs: vehicleData.costs || [],
      debt: vehicleData.debt || 0,
      profit: vehicleData.profit || 0,
      payments: vehicleData.payments || [],
      storageTime: 0,
      importDate: vehicleData.importDate || new Date(),
      statusHistory: [{
        fromStatus: VehicleStatus.IN_STOCK,
        toStatus: VehicleStatus.IN_STOCK,
        changedAt: new Date(),
        changedBy: 'System',
        notes: 'Nhập kho'
      }]
    };

    // Cập nhật các giá trị tính toán
    const calculatedVehicle = updateVehicleCalculations(newVehicle);

    const updatedVehicles = [...vehicles, calculatedVehicle];
    setVehicles(updatedVehicles);
    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
    
    // Thêm vào hàng đợi đồng bộ nếu không có kết nối
    if (isOnline) {
      synchronizeData();
    } else {
      savePendingSync({ type: 'vehicle_add', data: calculatedVehicle });
    }
  };

  // Xử lý chỉnh sửa xe
  const handleEditVehicle = (vehicleData: Partial<Vehicle>) => {
    setHasUnsavedChanges(false); // Reset cờ khi đã lưu
    
    const updatedVehicles = vehicles.map(vehicle => {
      if (vehicle.id === vehicleData.id) {
        // Tạo xe đã cập nhật
        const updatedVehicle = { ...vehicle, ...vehicleData };
        // Cập nhật các giá trị tính toán
        return updateVehicleCalculations(updatedVehicle as Vehicle);
      }
      return vehicle;
    });
    
    setVehicles(updatedVehicles);
    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
    
    // Thêm vào hàng đợi đồng bộ
    const updatedVehicle = updatedVehicles.find(v => v.id === vehicleData.id);
    if (updatedVehicle) {
      if (isOnline) {
        synchronizeData();
      } else {
        savePendingSync({ type: 'vehicle_update', data: updatedVehicle });
      }
    }
  };

  // Xử lý xóa xe
  const handleDeleteVehicle = (vehicleId: string) => {
    const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== vehicleId);
    setVehicles(updatedVehicles);
    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
    
    // Thêm vào hàng đợi đồng bộ
    if (isOnline) {
      synchronizeData();
    } else {
      savePendingSync({ type: 'vehicle_delete', data: { id: vehicleId } });
    }
  };

  // Xử lý mở form chỉnh sửa xe
  const handleOpenEditVehicleForm = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsVehicleFormOpen(true);
  };

  // Xử lý thay đổi trạng thái xe
  const handleStatusChange = (vehicle: Vehicle) => {
    setSelectedVehicleForStatusChange(vehicle);
    setIsStatusChangeModalOpen(true);
  };

  // Xử lý xác nhận thay đổi trạng thái xe
  const handleStatusChangeConfirm = (updatedVehicle: Vehicle) => {
    // Lưu trạng thái cũ trước khi cập nhật
    const oldVehicle = vehicles.find(v => v.id === updatedVehicle.id);
    const oldStatus = oldVehicle?.status;
    
    // Cập nhật các giá trị tính toán của xe
    const calculatedVehicle = updateVehicleCalculations(updatedVehicle);
    
    // Cập nhật trạng thái xe
    setVehicles(prevVehicles => 
      prevVehicles.map(vehicle => 
        vehicle.id === calculatedVehicle.id ? calculatedVehicle : vehicle
      )
    );
    
    // Lưu dữ liệu vào localStorage
    localStorage.setItem('vehicles', JSON.stringify(
      vehicles.map(vehicle => 
        vehicle.id === calculatedVehicle.id ? calculatedVehicle : vehicle
      )
    ));
    
    // Cập nhật thông tin nhân viên liên quan
    if (calculatedVehicle.saleStaff && calculatedVehicle.saleStaff.id) {
      const saleStaffId = calculatedVehicle.saleStaff.id;
      
      // Cập nhật số lượng xe đã bán của nhân viên
      setStaffList(prevStaffList => {
        return prevStaffList.map(staff => {
          if (staff.id === saleStaffId) {
            // Đếm số xe đã bán của nhân viên
            let vehiclesSold = staff.vehiclesSold;
            
            // Nếu trạng thái mới là SOLD, tăng số lượng xe bán
            if (calculatedVehicle.status === VehicleStatus.SOLD && oldStatus !== VehicleStatus.SOLD) {
              vehiclesSold++;
            }
            // Nếu trạng thái cũ là SOLD nhưng mới không phải, giảm số lượng
            else if (oldStatus === VehicleStatus.SOLD && calculatedVehicle.status !== VehicleStatus.SOLD) {
              vehiclesSold = Math.max(0, vehiclesSold - 1);
            }
            
            // Cập nhật thông tin nhân viên
            return {
              ...staff,
              vehiclesSold: vehiclesSold,
              totalCommission: calculateTotalCommission(vehiclesSold, staff.commissionRate)
            };
          }
          return staff;
        });
      });
    }
    
    setIsStatusChangeModalOpen(false);
  };

  // Xử lý thêm chi phí
  const handleAddCost = async (vehicleId: string, costAmount: number, description: string) => {
    try {
      // Tìm xe cần thêm chi phí
      const vehicle = vehicles.find(v => v.id === vehicleId);
      if (!vehicle) {
        throw new Error('Không tìm thấy xe');
      }

      // Tạo thông tin chi phí mới
      const newCost: CostInfo = {
        id: `COST_${Date.now()}`, // Tạo ID duy nhất
        amount: costAmount,
        date: new Date(),
        description: description.trim()
      };

      // Cập nhật chi phí
      const updatedVehicle = {
        ...vehicle,
        cost: vehicle.cost + costAmount,
        costs: [...(vehicle.costs || []), newCost],
      };

      // Cập nhật các giá trị tính toán (bao gồm lợi nhuận)
      const calculatedVehicle = updateVehicleCalculations(updatedVehicle as Vehicle);

      // Cập nhật danh sách xe
      setVehicles(prevVehicles =>
        prevVehicles.map(v => v.id === vehicleId ? calculatedVehicle : v)
      );

      // Lưu dữ liệu vào localStorage
      localStorage.setItem('vehicles', JSON.stringify(
        vehicles.map(v => v.id === vehicleId ? calculatedVehicle : v)
      ));

      // Cập nhật KPI nếu cần thiết (khi chi phí ảnh hưởng đến lợi nhuận)
      if (calculatedVehicle.status === VehicleStatus.SOLD && calculatedVehicle.saleStaff?.id) {
        const saleStaffId = calculatedVehicle.saleStaff.id;
        
        // Cập nhật thông tin nhân viên liên quan
        setStaffList(prevStaffList => {
          return prevStaffList.map(staff => {
            if (staff.id === saleStaffId) {
              // Cập nhật thông tin nhân viên nếu cần
              return {
                ...staff,
                // Các thông tin về lợi nhuận có thể được cập nhật ở đây nếu cần
              };
            }
            return staff;
          });
        });
      }

      // Tạo thông báo thành công nếu cần
      console.log(`Đã thêm chi phí ${costAmount.toLocaleString()} VNĐ cho xe ${vehicle.name}`);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Lỗi khi thêm chi phí:', error);
      return Promise.reject(error);
    }
  };

  // Xử lý mở form thêm xe mới
  const handleOpenAddVehicleForm = () => {
    setEditingVehicle(undefined);
    setIsVehicleFormOpen(true);
  };

  // Xử lý thêm nhân viên mới
  const handleAddStaff = (staffData: Partial<Staff>) => {
    const newStaff: Staff = {
      ...staffData as Staff,
      id: generateStaffId(staffList, staffData.name || ''),
      status: StaffStatus.ACTIVE,
      vehiclesSold: 0,
      totalCommission: 0
    };

    const updatedStaffList = [...staffList, newStaff];
    setStaffList(updatedStaffList);
    localStorage.setItem('staffList', JSON.stringify(updatedStaffList));
    
    // Thêm vào hàng đợi đồng bộ
    if (isOnline) {
      synchronizeData();
    } else {
      savePendingSync({ type: 'staff_add', data: newStaff });
    }
  };

  // Xử lý chỉnh sửa nhân viên
  const handleEditStaff = (staffData: Partial<Staff>) => {
    const updatedStaffList = staffList.map(staff => 
      staff.id === staffData.id ? { ...staff, ...staffData } : staff
    );
    setStaffList(updatedStaffList);
    localStorage.setItem('staffList', JSON.stringify(updatedStaffList));
    
    // Thêm vào hàng đợi đồng bộ
    const updatedStaff = updatedStaffList.find(s => s.id === staffData.id);
    if (updatedStaff) {
      if (isOnline) {
        synchronizeData();
      } else {
        savePendingSync({ type: 'staff_update', data: updatedStaff });
      }
    }
  };

  // Xử lý xóa nhân viên
  const handleDeleteStaff = (staffId: string) => {
    const updatedStaffList = staffList.filter(staff => staff.id !== staffId);
    setStaffList(updatedStaffList);
    localStorage.setItem('staffList', JSON.stringify(updatedStaffList));
    
    // Thêm vào hàng đợi đồng bộ
    if (isOnline) {
      synchronizeData();
    } else {
      savePendingSync({ type: 'staff_delete', data: { id: staffId } });
    }
  };

  // Hàm xử lý chuyển tab an toàn, kiểm tra nếu có dữ liệu chưa lưu
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    // Nếu có dữ liệu chưa lưu và đang chuyển từ tab xe (tab 0)
    if (hasUnsavedChanges && currentTab === 0) {
      // Hiển thị xác nhận nếu có dữ liệu chưa lưu
      const confirmChange = window.confirm('Bạn có dữ liệu chưa lưu. Bạn có chắc chắn muốn chuyển tab không?');
      if (!confirmChange) {
        return; // Không chuyển tab nếu người dùng chọn hủy
      }
      // Reset cờ dữ liệu chưa lưu nếu người dùng xác nhận
      setHasUnsavedChanges(false);
    }
    
    setCurrentTab(newValue);
  };

  // Xử lý thay đổi tháng/năm toàn cục
  const handleGlobalDateChange = (month: number, year: number) => {
    setGlobalMonth(month);
    setGlobalYear(year);
  };

  // Xử lý lưu KPI
  const handleSaveKpi = (kpiTargets: KpiTarget[]) => {
    setKpiList(kpiTargets);
    localStorage.setItem('kpis', JSON.stringify(kpiTargets));
    
    // Thêm vào hàng đợi đồng bộ
    if (isOnline) {
      synchronizeData();
    } else {
      savePendingSync({ type: 'kpi_update', data: kpiTargets });
    }
  };

  // Xử lý lưu thưởng phòng hỗ trợ
  const handleSaveSupportBonus = (bonuses: SupportDepartmentBonus[]) => {
    setSupportBonusList(bonuses);
    localStorage.setItem('supportBonuses', JSON.stringify(bonuses));
    
    // Thêm vào hàng đợi đồng bộ
    if (isOnline) {
      synchronizeData();
    } else {
      savePendingSync({ type: 'bonus_update', data: bonuses });
    }
  };

  // Tính toán thống kê với useMemo
  const statistics = useMemo(() => {
    // Đếm số xe theo trạng thái
    const vehicleCountByStatus: Record<VehicleStatus, number> = {
      [VehicleStatus.IN_STOCK]: 0,
      [VehicleStatus.DEPOSITED]: 0,
      [VehicleStatus.BANK_DEPOSITED]: 0,
      [VehicleStatus.OFFSET]: 0,
      [VehicleStatus.SOLD]: 0
    };
    
    // Tính tổng chi phí, lợi nhuận
    let totalProfit = 0;
    let totalRevenue = 0;
    let totalCost = 0;
    
    // Tháng và năm hiện tại để lọc dữ liệu
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Lọc xe theo tháng hiện tại
    const vehiclesThisMonth = vehicles.filter(vehicle => {
      const vehicleDate = vehicle.status === VehicleStatus.SOLD
        ? vehicle.exportDate
        : vehicle.importDate;
        
      return vehicleDate && 
        vehicleDate.getMonth() === currentMonth &&
        vehicleDate.getFullYear() === currentYear;
    });
    
    // Cập nhật số liệu thống kê
    vehicles.forEach(vehicle => {
      // Đếm xe theo trạng thái
      vehicleCountByStatus[vehicle.status]++;
      
      // Cộng dồn lợi nhuận và doanh thu
      totalProfit += vehicle.profit;
      
      if (vehicle.status === VehicleStatus.SOLD) {
        totalRevenue += vehicle.salePrice;
      }
      
      // Cộng dồn chi phí
      totalCost += vehicle.cost;
    });
    
    return {
      vehicleCountByStatus,
      totalProfit,
      totalRevenue,
      totalCost,
      vehiclesThisMonth
    };
  }, [vehicles]);
  
  // Lấy danh sách xe đang trong kho với useMemo
  const inStockVehicles = useMemo(() => {
    return vehicles.filter(vehicle => vehicle.status === VehicleStatus.IN_STOCK);
  }, [vehicles]);
  
  // Lấy danh sách xe đã đặt cọc với useMemo
  const depositedVehicles = useMemo(() => {
    return vehicles.filter(vehicle => 
      vehicle.status === VehicleStatus.DEPOSITED || 
      vehicle.status === VehicleStatus.BANK_DEPOSITED || 
      vehicle.status === VehicleStatus.OFFSET
    );
  }, [vehicles]);
  
  // Lấy danh sách xe đã bán với useMemo
  const soldVehicles = useMemo(() => {
    return vehicles.filter(vehicle => vehicle.status === VehicleStatus.SOLD);
  }, [vehicles]);
  
  // Lấy danh sách nhân viên đang hoạt động với useMemo
  const activeStaff = useMemo(() => {
    return staffList.filter(staff => staff.status === StaffStatus.ACTIVE);
  }, [staffList]);

  // Xử lý khi nhấn vào nút báo cáo
  const handleReportClick = () => {
    // Thêm mã xử lý khi cần
    const _statistics = vehicles.reduce((acc, vehicle) => {
      // ... logic tính toán thống kê
      return acc;
    }, {});

    // Các biến thống kê
    const _inStockVehicles = vehicles.filter(v => v.status === VehicleStatus.IN_STOCK);

    // Xe đã đặt cọc
    const _depositedVehicles = vehicles.filter(v => v.status === VehicleStatus.DEPOSITED);

    // ... các biến khác
    
    // Xe đã bán
    const _soldVehicles = vehicles.filter(v => v.status === VehicleStatus.SOLD);

    // Nhân viên đang hoạt động
    const _activeStaff = staffList.filter(s => s.status === StaffStatus.ACTIVE);
  
    // Chuyển sang tab báo cáo
    setCurrentTab(2);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      <Container maxWidth={false} disableGutters sx={{ px: 2, pb: isMobile ? 7 : 2 }}>
        <Box sx={{ my: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h3" component="h1" gutterBottom align="left" sx={{ 
              mb: 0,
              fontSize: isMobile ? '1.75rem' : '2.5rem'
            }}>
              Quản Lý Kho Xe
            </Typography>
            {isOnline ? (
              <Chip 
                label={isSyncing ? 'Đang đồng bộ...' : 'Đã kết nối'} 
                color={isSyncing ? 'warning' : 'success'} 
                size="small" 
                onClick={synchronizeData}
                sx={{ cursor: 'pointer' }}
              />
            ) : (
              <Chip 
                label="Offline" 
                color="error" 
                size="small" 
              />
            )}
          </Box>

          {!isMobile && (
            <Paper sx={{ borderRadius: 1, boxShadow: 1, mb: 4 }}>
              <AppBar position="static" color="default" elevation={0} sx={{ borderTopLeftRadius: 1, borderTopRightRadius: 1 }}>
                <Tabs 
                  value={currentTab} 
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="Báo Cáo" sx={{ fontWeight: 'bold', fontSize: '1.25rem' }} />
                  <Tab label="Danh Sách Xe" sx={{ fontWeight: 'bold', fontSize: '1.25rem' }} />
                  <Tab label="ADMIN" sx={{ fontWeight: 'bold', fontSize: '1.25rem' }} />
                </Tabs>
              </AppBar>
            </Paper>
          )}

          {/* Hiển thị tab báo cáo */}
          <TabPanel value={currentTab} index={0}>
            <Report 
              vehicles={vehicles} 
              selectedMonth={globalMonth}
              selectedYear={globalYear}
              onDateChange={handleGlobalDateChange}
              staffList={staffList}
              kpiList={kpiList}
            />
          </TabPanel>

          {/* Hiển thị tab danh sách xe */}
          <TabPanel value={currentTab} index={1}>
            <VehicleList 
              vehicles={vehicles} 
              onEdit={handleOpenEditVehicleForm}
              onDelete={handleDeleteVehicle}
              onStatusChange={handleStatusChange}
              onAddCost={handleAddCost}
              onAddVehicle={handleOpenAddVehicleForm}
              selectedMonth={globalMonth}
              selectedYear={globalYear}
              onDateChange={handleGlobalDateChange}
            />
            {isVehicleFormOpen && (
              <VehicleForm 
                open={isVehicleFormOpen}
                onClose={() => {
                  setIsVehicleFormOpen(false);
                  setEditingVehicle(undefined);
                  setHasUnsavedChanges(false);
                }}
                onSubmit={editingVehicle ? handleEditVehicle : handleAddVehicle}
                initialData={editingVehicle}
                staffList={staffList}
                onFormChange={(hasChanges) => setHasUnsavedChanges(hasChanges)}
              />
            )}
            {isStatusChangeModalOpen && selectedVehicleForStatusChange && (
              <StatusChangeModal 
                open={isStatusChangeModalOpen}
                vehicle={selectedVehicleForStatusChange}
                onClose={() => setIsStatusChangeModalOpen(false)}
                onStatusChange={handleStatusChangeConfirm}
                staffList={staffList}
              />
            )}
          </TabPanel>

          {/* Hiển thị tab ADMIN */}
          <TabPanel value={currentTab} index={2}>
            <Admin 
              staffList={staffList}
              vehicles={vehicles}
              onAddStaff={handleAddStaff}
              onEditStaff={handleEditStaff}
              onDeleteStaff={handleDeleteStaff}
              kpiList={kpiList}
              onSaveKpi={handleSaveKpi}
              supportBonusList={supportBonusList}
              onSaveSupportBonus={handleSaveSupportBonus}
              selectedMonth={globalMonth}
              selectedYear={globalYear}
              onDateChange={handleGlobalDateChange}
            />
          </TabPanel>
        </Box>
      </Container>
      
      {/* Bottom Navigation cho thiết bị di động */}
      {isMobile && (
        <Paper sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1100,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          overflow: 'hidden',
          boxShadow: '0px -2px 10px rgba(0,0,0,0.1)'
        }} elevation={3}>
          <BottomNavigation
            value={currentTab}
            onChange={(_event, newValue) => {
              setCurrentTab(newValue);
            }}
            showLabels
            sx={{ 
              height: 65,
              '& .MuiBottomNavigationAction-root': {
                py: 1
              }
            }}
          >
            <BottomNavigationAction 
              label="Báo Cáo" 
              icon={<DashboardIcon />} 
              sx={{ 
                color: currentTab === 0 ? 'primary.main' : 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main'
                }
              }}
            />
            <BottomNavigationAction 
              label="Danh Sách Xe" 
              icon={<DirectionsCarIcon />} 
              sx={{ 
                color: currentTab === 1 ? 'primary.main' : 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main'
                }
              }}
            />
            <BottomNavigationAction 
              label="Admin" 
              icon={<AdminPanelSettingsIcon />} 
              sx={{ 
                color: currentTab === 2 ? 'primary.main' : 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main'
                }
              }}
            />
          </BottomNavigation>
        </Paper>
      )}
      
      {/* Thông báo đồng bộ hóa */}
      <Portal>
        <Slide direction="up" in={showSyncMessage}>
          <Box
            sx={{
              position: 'fixed',
              bottom: isMobile ? 80 : 24,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              maxWidth: 500,
              width: 'calc(100% - 32px)',
              boxShadow: 3,
              borderRadius: 1
            }}
          >
            <Alert 
              onClose={() => setShowSyncMessage(false)} 
              severity={syncMessage.type}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {syncMessage.message}
            </Alert>
          </Box>
        </Slide>
      </Portal>
    </Box>
  );
}

export default App;
