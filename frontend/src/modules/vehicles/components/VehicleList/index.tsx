import React, { useState, useMemo, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
  FormControl,
  useMediaQuery,
  Card,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Skeleton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Pagination from '@mui/material/Pagination';
import { 
  Vehicle, 
  VehicleStatus, 
  getStatusColor,
  getStatusTextColor,
  getStatusBorderColor,
  getStorageTimeColor,
  generateStorageTimeWarning,
  PaymentInfo
} from '../../../../types/vehicles/vehicle';
import { formatCurrency, formatDate, formatNumber } from '../../../../utils/formatters';
import MonthYearPicker from '../../../../components/MonthYearPicker';

// Sử dụng VehicleStatus để loại bỏ cảnh báo eslint
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _unusedStatus: VehicleStatus = VehicleStatus.IN_STOCK;

// Định nghĩa ưu tiên trạng thái cho việc sắp xếp
const statusPriority: Record<VehicleStatus, number> = {
  [VehicleStatus.IN_STOCK]: 1,
  [VehicleStatus.DEPOSITED]: 2,
  [VehicleStatus.BANK_DEPOSITED]: 3,
  [VehicleStatus.OFFSET]: 4,
  [VehicleStatus.SOLD]: 5
};

// Hàm sắp xếp xe theo yêu cầu
const sortVehicles = (vehicles: Vehicle[]): Vehicle[] => {
  return [...vehicles].sort((a, b) => {
    // Sắp xếp theo trạng thái trước
    const statusCompare = statusPriority[a.status] - statusPriority[b.status];
    if (statusCompare !== 0) return statusCompare;
    
    // Nếu cùng trạng thái, sắp xếp theo ngày nhập (mới nhất lên trước)
    const dateA = new Date(a.importDate).getTime();
    const dateB = new Date(b.importDate).getTime();
    return dateB - dateA; // Giảm dần theo ngày
  });
};

// Hàm lấy màu nền cho hàng dựa trên thời gian lưu kho
const getStorageTimeBackgroundColor = (storageTime: number): string => {
  const warning = generateStorageTimeWarning(storageTime);
  
  switch (warning.level) {
    case 'normal': return 'transparent';
    case 'warning': return 'rgba(255, 165, 0, 0.1)'; // Nền màu cam nhạt
    case 'danger': return 'rgba(255, 0, 0, 0.1)'; // Nền màu đỏ nhạt
    default: return 'transparent';
  }
};

// Hàm nhóm xe đã bán theo tháng xuất kho
const groupSoldVehiclesByMonth = (vehicles: Vehicle[]): Record<string, Vehicle[]> => {
  const soldVehicles = vehicles.filter(v => v.status === VehicleStatus.SOLD && v.exportDate);
  const groupedVehicles: Record<string, Vehicle[]> = {};
  
  soldVehicles.forEach(vehicle => {
    if (vehicle.exportDate) {
      const exportDate = new Date(vehicle.exportDate);
      const monthKey = `${exportDate.getMonth() + 1}/${exportDate.getFullYear()}`;
      
      if (!groupedVehicles[monthKey]) {
        groupedVehicles[monthKey] = [];
      }
      
      groupedVehicles[monthKey].push(vehicle);
    }
  });
  
  // Sắp xếp các nhóm theo thời gian gần đây nhất
  return Object.fromEntries(
    Object.entries(groupedVehicles)
      .sort((a, b) => {
        const [monthA, yearA] = a[0].split('/').map(Number);
        const [monthB, yearB] = b[0].split('/').map(Number);
        
        if (yearA !== yearB) return yearB - yearA;
        return monthB - monthA;
      })
  );
};

// Props cho component danh sách xe
interface VehicleListProps {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicleId: string) => void;
  onStatusChange: (vehicle: Vehicle) => void;
  onAddCost: (vehicleId: string, costAmount: number, description: string) => Promise<void>;
  onAddVehicle: () => void;
  selectedMonth?: number;
  selectedYear?: number;
  onDateChange?: (month: number, year: number) => void;
}

// Component danh sách xe
const VehicleList: React.FC<VehicleListProps> = ({ 
  vehicles, 
  onEdit, 
  onDelete, 
  onStatusChange,
  onAddCost,
  onAddVehicle,
  selectedMonth: propSelectedMonth,
  selectedYear: propSelectedYear,
  onDateChange
}) => {
  // Thêm xác định thiết bị
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // Sắp xếp danh sách xe trước khi hiển thị
  const sortedVehicles = sortVehicles(vehicles);
  
  // Lọc xe chưa bán (không phải trạng thái SOLD)
  const notSoldVehicles = sortedVehicles.filter(vehicle => vehicle.status !== VehicleStatus.SOLD);
  
  // State cho việc chọn tháng/năm
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(propSelectedMonth || currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(propSelectedYear || currentDate.getFullYear());
  const [monthYearString, setMonthYearString] = useState(`Tháng ${selectedMonth}/${selectedYear}`);
  
  // Cập nhật state khi props thay đổi
  useEffect(() => {
    if (propSelectedMonth && propSelectedYear) {
      setSelectedMonth(propSelectedMonth);
      setSelectedYear(propSelectedYear);
    }
  }, [propSelectedMonth, propSelectedYear]);
  
  // Cập nhật monthYearString khi selectedMonth hoặc selectedYear thay đổi
  useEffect(() => {
    setMonthYearString(`Tháng ${selectedMonth}/${selectedYear}`);
  }, [selectedMonth, selectedYear]);
  
  // Nhóm xe đã bán theo tháng
  const soldVehiclesByMonth = useMemo(() => {
    return groupSoldVehiclesByMonth(vehicles);
  }, [vehicles]);
  
  // Lọc xe đã bán theo tháng đã chọn
  const filteredSoldVehicles = useMemo(() => {
    const monthKey = `${selectedMonth}/${selectedYear}`;
    return soldVehiclesByMonth[monthKey] || [];
  }, [soldVehiclesByMonth, selectedMonth, selectedYear]);

  // Hàm xử lý khi di chuyển tới tháng trước
  const handlePreviousMonth = () => {
    let newMonth = selectedMonth - 1;
    let newYear = selectedYear;
    
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    
    // Thông báo thay đổi lên component cha
    if (onDateChange) {
      onDateChange(newMonth, newYear);
    }
  };
  
  // Hàm xử lý khi di chuyển tới tháng sau
  const handleNextMonth = () => {
    let newMonth = selectedMonth + 1;
    let newYear = selectedYear;
    
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    
    // Không cho phép chọn tháng trong tương lai
    if (newYear > currentDate.getFullYear() || 
        (newYear === currentDate.getFullYear() && newMonth > currentDate.getMonth() + 1)) {
      return;
    }
    
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    
    // Thông báo thay đổi lên component cha
    if (onDateChange) {
      onDateChange(newMonth, newYear);
    }
  };

  // Hàm xử lý khi thay đổi chuỗi tháng/năm
  const handleMonthYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonthYearString(event.target.value);
    
    try {
      // Dự kiến format: "Tháng M/YYYY"
      const matches = event.target.value.match(/Tháng\s+(\d{1,2})\/(\d{4})/);
      if (matches && matches.length === 3) {
        const month = parseInt(matches[1], 10);
        const year = parseInt(matches[2], 10);
        
        if (month >= 1 && month <= 12 && year >= 2000) {
          // Không cho phép chọn tháng trong tương lai
          if (year > currentDate.getFullYear() || 
              (year === currentDate.getFullYear() && month > currentDate.getMonth() + 1)) {
            return;
          }
          
          setSelectedMonth(month);
          setSelectedYear(year);
        }
      }
    } catch (error) {
      console.error("Lỗi khi phân tích chuỗi tháng/năm:", error);
    }
  };

  // Update monthYearString when selectedMonth or selectedYear changes
  useEffect(() => {
    setMonthYearString(`Tháng ${selectedMonth}/${selectedYear}`);
  }, [selectedMonth, selectedYear]);
  
  // State cho modal thêm chi phí
  const [costModalOpen, setCostModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [costAmount, setCostAmount] = useState('');
  const [costDescription, setCostDescription] = useState('');
  const [costError, setCostError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State cho modal hiển thị công nợ
  const [debtModalOpen, setDebtModalOpen] = useState(false);
  const [selectedVehicleForDebt, setSelectedVehicleForDebt] = useState(null);
  
  // State cho modal xác nhận xóa xe
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  // Mở modal thêm chi phí
  const handleOpenCostModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setCostAmount('');
    setCostDescription('');
    setCostError('');
    setCostModalOpen(true);
  };

  // Đóng modal thêm chi phí
  const handleCloseCostModal = () => {
    setCostModalOpen(false);
    setSelectedVehicle(null);
    setCostAmount('');
    setCostDescription('');
    setCostError('');
  };

  // Mở modal hiển thị công nợ
  const handleOpenDebtModal = (vehicle: Vehicle) => {
    setSelectedVehicleForDebt(vehicle);
    setDebtModalOpen(true);
  };

  // Đóng modal hiển thị công nợ
  const handleCloseDebtModal = () => {
    setDebtModalOpen(false);
    setSelectedVehicleForDebt(null);
  };

  // Mở modal xác nhận xóa xe
  const handleOpenDeleteConfirm = (vehicle: Vehicle) => {
    setVehicleToDelete(vehicle);
    setDeleteConfirmOpen(true);
  };

  // Đóng modal xác nhận xóa xe
  const handleCloseDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setVehicleToDelete(null);
  };

  // Xác nhận xóa xe
  const handleConfirmDelete = () => {
    if (vehicleToDelete) {
      onDelete(vehicleToDelete.id);
      handleCloseDeleteConfirm();
    }
  };

  // Xử lý thêm chi phí
  const handleAddCost = async () => {
    if (!selectedVehicle || !onAddCost) return;

    // Kiểm tra đầu vào
    if (!costAmount.trim()) {
      setCostError('Vui lòng nhập số tiền chi phí');
      return;
    }

    const amount = parseFloat(costAmount.replace(/[,.]/g, ''));
    if (isNaN(amount) || amount <= 0) {
      setCostError('Số tiền chi phí phải là số dương');
      return;
    }

    // Hiển thị loading
    setIsSubmitting(true);
    setCostError('');

    try {
      await onAddCost(selectedVehicle.id, amount, costDescription.trim());
      handleCloseCostModal();
    } catch (error) {
      console.error("Error adding cost:", error);
      setCostError('Đã xảy ra lỗi khi thêm chi phí. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Xử lý thay đổi số tiền
  const handleCostAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Chỉ cho phép nhập số và dấu chấm
    if (value === '' || /^[0-9,.]+$/.test(value)) {
      // Định dạng số tiền với dấu chấm phân cách hàng nghìn
      const cleanValue = value.replace(/[,.]/g, '');
      if (cleanValue === '' || isNaN(Number(cleanValue))) {
        setCostAmount(value);
      } else {
        setCostAmount(formatNumber(Number(cleanValue)));
      }
    }
  };

  // Hàm định dạng loại thanh toán
  const formatPaymentType = (type: PaymentInfo['type']): string => {
    switch (type) {
      case 'DEPOSIT': return 'Đặt cọc';
      case 'BANK_DEPOSIT': return 'Đặt cọc ngân hàng';
      case 'OFFSET': return 'Đóng đối ứng';
      case 'FULL_PAYMENT': return 'Thanh toán đầy đủ';
      default: return type;
    }
  };

  // State quản lý hình ảnh
  const [loadedImages, setLoadedImages] = useState({});
  
  // Tối ưu hóa ảnh cho thiết bị di động
  const vehicleImages = useMemo(() => {
    return filteredSoldVehicles.reduce((acc, vehicle) => {
      // Sử dụng kích thước nhỏ hơn cho thiết bị di động
      const imageUrl = `https://source.unsplash.com/featured/?car,${vehicle.color},${vehicle.name}`;
      const mobileImageUrl = `https://source.unsplash.com/featured/?car,${vehicle.color},${vehicle.name}&w=200`;
      
      acc[vehicle.id] = isMobile ? mobileImageUrl : imageUrl;
      return acc;
    }, {});
  }, [filteredSoldVehicles, isMobile]);
  
  // Xử lý sự kiện tải ảnh hoàn tất
  const handleImageLoad = (vehicleId: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [vehicleId]: true
    }));
  };

  // Hiển thị Card view cho mobile
  const renderMobileView = () => {
    return (
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {filteredSoldVehicles.map((vehicle) => (
            <Grid item xs={12} key={vehicle.id}>
              <Card elevation={3} sx={{ 
                mb: 2, 
                borderLeft: `5px solid ${getStatusBorderColor(vehicle.status)}`,
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Hiển thị ảnh xe với tối ưu cho mobile */}
                <Box sx={{ position: 'relative', height: 140, bgcolor: 'grey.100' }}>
                  {!loadedImages[vehicle.id] && (
                    <Skeleton 
                      variant="rectangular" 
                      width="100%" 
                      height="100%" 
                      animation="wave" 
                    />
                  )}
                  <img 
                    src={vehicleImages[vehicle.id]} 
                    alt={vehicle.name}
        style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      display: loadedImages[vehicle.id] ? 'block' : 'none'
                    }}
                    onLoad={() => handleImageLoad(vehicle.id)}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 10, 
                      right: 10,
                      zIndex: 1
                    }}
                  >
                    <Chip 
                      label={vehicle.status} 
                      size="small"
                      sx={{ 
                        backgroundColor: getStatusColor(vehicle.status),
                        color: getStatusTextColor(vehicle.status),
                        fontWeight: 'bold',
                        border: `1px solid ${getStatusBorderColor(vehicle.status)}`
                      }} 
                    />
                  </Box>
                </Box>

                <CardContent sx={{ pb: 1 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mt: 1 }}>
                    {vehicle.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ColorLensIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                        Màu: {vehicle.color}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DateRangeIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                        Ngày nhập: {formatDate(vehicle.importDate)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DirectionsCarIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                        Thời gian trong kho: {vehicle.storageTime} ngày
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AttachMoneyIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                        Giá: {formatCurrency(vehicle.purchasePrice || 0)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                
                <Divider />
                
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pt: 1 }}>
                  <Box>
                    <Tooltip title="Chỉnh sửa">
                      <IconButton size="small" onClick={() => onEdit(vehicle)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton size="small" onClick={() => handleOpenDeleteConfirm(vehicle)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  
                  <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => onStatusChange(vehicle)}
                  >
                    Thay đổi trạng thái
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {filteredSoldVehicles.length === 0 && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              Không có xe nào khớp với bộ lọc đã chọn
            </Typography>
          </Box>
        )}
      </Box>
    );
  };
  
  // Hiển thị dạng bảng cho tablet và desktop
  const renderTableView = () => {
    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table 
          stickyHeader 
          aria-label="sticky table"
          size="small"
          sx={{ 
            minWidth: 'auto',
            tableLayout: 'auto',
            '& .MuiTableCell-root': {
              padding: '8px 12px',
              fontSize: '1rem',
              whiteSpace: 'nowrap'
            },
            '& .MuiTableCell-head': {
              backgroundColor: '#f5f5f5',
              fontWeight: 'bold'
            }
          }}
        >
          <TableHead>
            <TableRow className="table-header">
              <TableCell sx={{ width: '5%' }}>STT</TableCell>
              <TableCell sx={{ width: '20%' }}>Tên xe</TableCell>
              <TableCell sx={{ width: '10%' }}>Màu sắc</TableCell>
              <TableCell sx={{ width: '15%' }}>Ngày nhập</TableCell>
              <TableCell sx={{ width: '15%' }}>Giá mua</TableCell>
              <TableCell sx={{ width: '15%' }}>Giá bán</TableCell>
              <TableCell sx={{ width: '10%' }}>Trạng thái</TableCell>
              <TableCell sx={{ width: '10%' }}>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSoldVehicles.map((vehicle) => (
              <TableRow key={vehicle.id} hover>
                <TableCell sx={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vehicle.id}</TableCell>
                <TableCell sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vehicle.name}</TableCell>
                <TableCell sx={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vehicle.color}</TableCell>
                <TableCell>{vehicle.importDate}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                    {formatCurrency(vehicle.purchasePrice)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                    {formatCurrency(vehicle.salePrice)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Tooltip title="Nhấp để thay đổi trạng thái">
                    <Chip 
                      label={vehicle.status} 
                      color="default"
                      sx={{ 
                        backgroundColor: getStatusColor(vehicle.status),
                        color: getStatusTextColor(vehicle.status),
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        border: `1px solid ${getStatusBorderColor(vehicle.status)}`
                      }}
                      size="small" 
                      onClick={() => onStatusChange(vehicle)}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(vehicle)}
                      className="action-button action-button-edit"
                      sx={{
                        backgroundColor: 'var(--background-alt)',
                        '&:hover': {
                          color: 'var(--primary-color)',
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDeleteConfirm(vehicle)}
                      className="action-button action-button-delete"
                      sx={{
                        backgroundColor: 'var(--background-alt)',
                        '&:hover': {
                          color: 'var(--danger-color)',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    {vehicle.status !== VehicleStatus.SOLD && (
                      <IconButton
                        size="small"
                        onClick={() => onStatusChange(vehicle)}
                        className="action-button"
                        sx={{
                          backgroundColor: 'var(--background-alt)',
                          '&:hover': {
                            color: 'var(--secondary-color)',
                          },
                        }}
                      >
                        <SwapHorizIcon fontSize="small" />
                      </IconButton>
                    )}
                    {vehicle.status !== VehicleStatus.IN_STOCK && (
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDebtModal(vehicle)}
                        className="action-button"
                        sx={{
                          backgroundColor: 'var(--background-alt)',
                          '&:hover': {
                            color: 'var(--info-color)',
                          },
                        }}
                      >
                        <AccountBalanceWalletIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleOpenCostModal(vehicle)}
                      className="action-button"
                      sx={{
                        backgroundColor: 'var(--background-alt)',
                        '&:hover': {
                          color: 'var(--warning-color)',
                        },
                      }}
                    >
                      <AddCircleOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const handleDateChange = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    if (onDateChange) {
      onDateChange(month, year);
    }
  };

  return (
    <div>
      <Box className="section-header">
        <Typography variant="h4" component="h2" className="section-title">
          Danh sách xe
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MonthYearPicker
            month={selectedMonth}
            year={selectedYear}
            onChange={(month, year) => {
              setSelectedMonth(month);
              setSelectedYear(year);
              if (onDateChange) {
                onDateChange(month, year);
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={onAddVehicle}
            sx={{ ml: 2 }}
          >
            Thêm xe
          </Button>
        </Box>
      </Box>

      <Box className="card" sx={{ mb: 3 }}>
        <Box className="card-header">
          <Typography className="card-title">
            Thống kê tháng {selectedMonth}/{selectedYear}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DirectionsCarIcon sx={{ color: 'var(--primary-color)', mr: 1 }} />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Số xe trong kho
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'var(--font-weight-bold)' }}>
                  {notSoldVehicles.length}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoneyIcon sx={{ color: 'var(--success-color)', mr: 1 }} />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Lợi nhuận tháng này
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'var(--font-weight-bold)' }}>
                  {formatCurrency(notSoldVehicles.reduce((sum, v) => sum + v.profit, 0))}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DateRangeIcon sx={{ color: 'var(--warning-color)', mr: 1 }} />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Thời gian lưu kho TB
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'var(--font-weight-bold)' }}>
                  {notSoldVehicles.length > 0
                    ? Math.round(notSoldVehicles.reduce((sum, v) => sum + v.storageTime, 0) / notSoldVehicles.length)
                    : 0} ngày
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ColorLensIcon sx={{ color: 'var(--info-color)', mr: 1 }} />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Xe đã bán trong tháng
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'var(--font-weight-bold)' }}>
                  {filteredSoldVehicles.length}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead className="table-header">
            <TableRow>
              <TableCell>Mã xe</TableCell>
              <TableCell>Tên xe</TableCell>
              <TableCell>Màu sắc</TableCell>
              <TableCell>Năm SX</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Giá bán</TableCell>
              <TableCell>Thời gian lưu kho</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notSoldVehicles.map((vehicle) => (
              <TableRow key={vehicle.id} className="table-row">
                <TableCell>{vehicle.id}</TableCell>
                <TableCell>{vehicle.name}</TableCell>
                <TableCell>{vehicle.color}</TableCell>
                <TableCell>{vehicle.manufacturingYear}</TableCell>
                <TableCell>
                  <Chip
                    label={vehicle.status}
                    className={`status-badge ${getStatusClassName(vehicle.status)}`}
                    sx={{
                      backgroundColor: getStatusColor(vehicle.status),
                      color: getStatusTextColor(vehicle.status),
                      border: `1px solid ${getStatusBorderColor(vehicle.status)}`,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {formatCurrency(vehicle.salePrice)}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      color: getStorageTimeColor(vehicle.storageTime),
                      fontWeight: 'var(--font-weight-semibold)',
                    }}
                  >
                    {vehicle.storageTime} ngày
                  </Box>
                </TableCell>
                <TableCell>
                  {vehicleImages[vehicle.id] && (
                    <Box
                      component="img"
                      src={vehicleImages[vehicle.id]}
                      alt={vehicle.name}
                      sx={{
                        width: 60,
                        height: 40,
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-sm)',
                        opacity: loadedImages[vehicle.id] ? 1 : 0.3,
                        transition: 'opacity 0.3s ease',
                      }}
                      onLoad={() => handleImageLoad(vehicle.id)}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(vehicle)}
                      className="action-button action-button-edit"
                      sx={{
                        backgroundColor: 'var(--background-alt)',
                        '&:hover': {
                          color: 'var(--primary-color)',
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDeleteConfirm(vehicle)}
                      className="action-button action-button-delete"
                      sx={{
                        backgroundColor: 'var(--background-alt)',
                        '&:hover': {
                          color: 'var(--danger-color)',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    {vehicle.status !== VehicleStatus.SOLD && (
                      <IconButton
                        size="small"
                        onClick={() => onStatusChange(vehicle)}
                        className="action-button"
                        sx={{
                          backgroundColor: 'var(--background-alt)',
                          '&:hover': {
                            color: 'var(--secondary-color)',
                          },
                        }}
                      >
                        <SwapHorizIcon fontSize="small" />
                      </IconButton>
                    )}
                    {vehicle.status !== VehicleStatus.IN_STOCK && (
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDebtModal(vehicle)}
                        className="action-button"
                        sx={{
                          backgroundColor: 'var(--background-alt)',
                          '&:hover': {
                            color: 'var(--info-color)',
                          },
                        }}
                      >
                        <AccountBalanceWalletIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleOpenCostModal(vehicle)}
                      className="action-button"
                      sx={{
                        backgroundColor: 'var(--background-alt)',
                        '&:hover': {
                          color: 'var(--warning-color)',
                        },
                      }}
                    >
                      <AddCircleOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Pagination
          count={Math.ceil(notSoldVehicles.length / 10)}
          page={Math.ceil((selectedMonth - 1) * 10 / 12) + 1}
          onChange={(event, page) => {
            setSelectedMonth(Math.ceil((page - 1) % 12 + 1));
            setSelectedYear(Math.ceil((selectedMonth - 1) / 12) + 2000);
            if (onDateChange) {
              onDateChange(Math.ceil((page - 1) % 12 + 1), Math.ceil((selectedMonth - 1) / 12) + 2000);
            }
          }}
          color="primary"
        />
      </Box>

      {/* Modal thêm chi phí */}
      <Dialog open={costModalOpen} onClose={handleCloseCostModal} maxWidth="xs" fullWidth>
        <DialogTitle>
          Thêm Chi Phí
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TextField
              label="Số tiền chi phí (VNĐ)"
              fullWidth
              margin="normal"
              value={costAmount}
              onChange={handleCostAmountChange}
              autoFocus
              error={!!costError}
              helperText={costError || "Chi phí sẽ làm giảm lợi nhuận của xe"}
              InputProps={{
                inputProps: {
                  inputMode: 'numeric',
                }
              }}
            />
            <TextField
              label="Mô tả chi phí"
              fullWidth
              margin="normal"
              value={costDescription}
              onChange={(e) => setCostDescription(e.target.value)}
              multiline
              rows={2}
            />
            {selectedVehicle && (
              <Box sx={{ mt: 2, fontSize: '0.875rem' }}>
                <Typography variant="subtitle2">
                  Thông tin xe: {selectedVehicle.name} ({selectedVehicle.color})
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Chi phí hiện tại: {formatCurrency(selectedVehicle.cost)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Lợi nhuận hiện tại: {formatCurrency(selectedVehicle.profit)}
                </Typography>
                {costAmount && !isNaN(parseFloat(costAmount.replace(/[,.]/g, ''))) && (
                  <Typography variant="body2" sx={{ color: 'error.main', mt: 1 }}>
                    Lợi nhuận sau khi thêm chi phí: {formatCurrency(selectedVehicle.profit - parseFloat(costAmount.replace(/[,.]/g, '')))}
                  </Typography>
                )}
                
                {/* Hiển thị danh sách chi phí đã có */}
                {selectedVehicle.costs && selectedVehicle.costs.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Chi phí đã ghi nhận:</Typography>
                    <Box sx={{ maxHeight: 150, overflowY: 'auto', mt: 1, fontSize: '0.875rem' }}>
                      {selectedVehicle.costs.map((cost, index) => (
                        <Box key={cost.id} sx={{ mb: 1, pb: 1, borderBottom: '1px dashed #eee' }}>
                          <Typography variant="body2">
                            {index + 1}. {formatCurrency(cost.amount)} - {formatDate(cost.date)}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {cost.description}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCostModal} disabled={isSubmitting}>
            Hủy bỏ
          </Button>
          <Button 
            onClick={handleAddCost} 
            variant="contained" 
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang xử lý...' : 'Thêm chi phí'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal hiển thị chi tiết công nợ */}
      <Dialog open={debtModalOpen} onClose={handleCloseDebtModal} maxWidth="md" fullWidth>
        <DialogTitle>
          Chi Tiết Công Nợ
        </DialogTitle>
        <DialogContent>
          {selectedVehicleForDebt && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Thông tin xe: {selectedVehicleForDebt.name} ({selectedVehicleForDebt.color})
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">
                  <strong>Giá bán:</strong> {formatCurrency(selectedVehicleForDebt.salePrice)}
                </Typography>
                <Typography variant="body1" color={selectedVehicleForDebt.debt > 0 ? 'error' : 'success.main'}>
                  <strong>Công nợ hiện tại:</strong> {formatCurrency(selectedVehicleForDebt.debt)}
                </Typography>
              </Box>

              {/* Hiển thị chi tiết các khoản thanh toán */}
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2, mb: 1 }}>
                Lịch sử thanh toán:
              </Typography>
              
              {selectedVehicleForDebt.payments.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Chưa có khoản thanh toán nào
                </Typography>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Ngày thanh toán</TableCell>
                        <TableCell>Loại thanh toán</TableCell>
                        <TableCell>Số tiền</TableCell>
                        <TableCell>Ghi chú</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedVehicleForDebt.payments.map((payment, index) => (
                        <TableRow key={index}>
                          <TableCell>{formatDate(payment.date)}</TableCell>
                          <TableCell>{formatPaymentType(payment.type)}</TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>{payment.note || ''}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell>Tổng thanh toán</TableCell>
                        <TableCell>
                          {formatCurrency(selectedVehicleForDebt.payments.reduce((sum, p) => sum + p.amount, 0))}
                        </TableCell>
                        <TableCell sx={{ border: 'none' }} />
                        <TableCell sx={{ border: 'none' }} />
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {/* Hiển thị công thức tính công nợ */}
              <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid #eee' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Công thức tính công nợ:
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body2">
                    <strong>Công nợ</strong> = Giá bán - Tổng các khoản đã thanh toán
                  </Typography>
                  <Typography variant="body2">
                    <strong>Tổng thanh toán</strong> = Đặt cọc + Đặt cọc ngân hàng + Tiền đối ứng + Thanh toán đầy đủ
                  </Typography>
                  
                  {/* Chi tiết tính toán */}
                  <Box sx={{ mt: 1, pl: 2 }}>
                    <Typography variant="body2">
                      {formatCurrency(selectedVehicleForDebt.debt)} = {formatCurrency(selectedVehicleForDebt.salePrice)} - {formatCurrency(selectedVehicleForDebt.payments.reduce((sum, p) => sum + p.amount, 0))}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDebtModal}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal xác nhận xóa xe */}
      <Dialog open={deleteConfirmOpen} onClose={handleCloseDeleteConfirm} maxWidth="xs" fullWidth>
        <DialogTitle>
          Xác nhận xóa xe
        </DialogTitle>
        <DialogContent>
          {vehicleToDelete && (
            <>
              <Alert severity="warning" sx={{ mb: 2 }}>
                Thao tác này sẽ xóa toàn bộ thông tin liên quan đến xe. Dữ liệu sẽ không thể khôi phục.
              </Alert>
              <Typography variant="body1" gutterBottom>
                <strong>Thông tin xe sẽ bị xóa:</strong>
              </Typography>
              <Box sx={{ ml: 2, mb: 2 }}>
                <Typography variant="body2">
                  <strong>Mã xe:</strong> {vehicleToDelete.id}
                </Typography>
                <Typography variant="body2">
                  <strong>Tên xe:</strong> {vehicleToDelete.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Màu sắc:</strong> {vehicleToDelete.color}
                </Typography>
                <Typography variant="body2">
                  <strong>Trạng thái:</strong> {vehicleToDelete.status}
                </Typography>
              </Box>
              <Typography variant="body1">
                Bạn có chắc chắn muốn xóa xe này không?
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm}>
            Hủy bỏ
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            variant="contained" 
            color="error"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Hàm helper để chuyển trạng thái sang tên class CSS
const getStatusClassName = (status: VehicleStatus): string => {
  switch (status) {
    case VehicleStatus.IN_STOCK: return 'status-in-stock';
    case VehicleStatus.DEPOSITED: return 'status-deposit';
    case VehicleStatus.BANK_DEPOSITED: return 'status-bank-deposit';
    case VehicleStatus.OFFSET: return 'status-offset';
    case VehicleStatus.SOLD: return 'status-sold';
    default: return '';
  }
};

export default VehicleList; 