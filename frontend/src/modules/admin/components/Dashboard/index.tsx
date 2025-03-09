import React, { useMemo, useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, FormControl, TextField, IconButton, Tooltip, Avatar, Chip, Alert, Slide, Portal } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Staff, StaffTeam } from '../../../../types/staff/staff';
import { Vehicle, VehicleStatus } from '../../../../types/vehicles/vehicle';
import { KpiTarget, KpiTargetType, calculateKpiCompletion, calculateSalesBonus } from '../../../../models/kpi';
import { formatCurrency } from '../../../../utils/formatters';
import MonthYearPicker from '../../../../components/MonthYearPicker';
import RevenueReport from './RevenueReport';
import SalesStaffReport from './SalesStaffReport';
import KPITable from './KPITable';

// Props cho component Dashboard
interface DashboardProps {
  staffList: Staff[];
  vehicles: Vehicle[];
  kpiList: KpiTarget[];
  selectedMonth?: number;
  selectedYear?: number;
  onDateChange?: (month: number, year: number) => void;
}

// Hàm để lấy màu cho từng đội nhóm
const getTeamColor = (team: StaffTeam) => {
  switch (team) {
    case StaffTeam.SALES_1:
      return 'primary.main';
    case StaffTeam.SALES_2:
      return 'info.main';
    case StaffTeam.SALES_3:
      return 'info.dark';
    case StaffTeam.ACCOUNTING:
      return 'success.main';
    case StaffTeam.TECHNICAL:
      return 'warning.main';
    case StaffTeam.MANAGEMENT:
      return 'secondary.main';
    default:
      return 'text.secondary';
  }
};

const Dashboard: React.FC<DashboardProps> = ({ 
  staffList, 
  vehicles, 
  kpiList,
  selectedMonth: propSelectedMonth,
  selectedYear: propSelectedYear,
  onDateChange
}) => {
  // Thêm state cho việc chọn tháng/năm
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(propSelectedMonth || currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(propSelectedYear || currentDate.getFullYear());
  const [monthYearString, setMonthYearString] = useState(`Tháng ${selectedMonth}/${selectedYear}`);

  // Các chỉ số tổng quan
  const totalStaff = staffList.length;
  const totalSalary = staffList.reduce((sum, staff) => sum + staff.salary, 0);
  
  // Tính số lượng nhân viên theo phòng ban
  const staffByTeam = staffList.reduce((acc, staff) => {
    const team = staff.team;
    if (!acc[team]) {
      acc[team] = 0;
    }
    acc[team]++;
    return acc;
  }, {} as Record<string, number>);

  // Danh sách phòng ban theo thứ tự ưu tiên
  const teamOrder = [
    StaffTeam.MANAGEMENT,
    StaffTeam.ACCOUNTING,
    StaffTeam.SALES_1,
    StaffTeam.SALES_2,
    StaffTeam.SALES_3,
    StaffTeam.TECHNICAL,
    StaffTeam.OTHER
  ];

  // Tính số xe đã bán trong tháng được chọn
  const soldVehicles = useMemo(() => {
    console.log('Calculating sold vehicles for:', selectedMonth, selectedYear);
    
    const filteredVehicles = vehicles.filter(vehicle => {
      console.log('Checking vehicle:', {
        id: vehicle.id,
        status: vehicle.status,
        exportDate: vehicle.exportDate
      });
      
      // Kiểm tra trạng thái xe và ngày xuất
      if (!vehicle.exportDate) {
        console.log('Vehicle rejected - no export date:', vehicle.id);
        return false;
      }
      
      // Kiểm tra trạng thái xe (VehicleStatus.SOLD = 'Đã bán')
      if (vehicle.status !== 'Đã bán') {
        console.log('Vehicle rejected - not sold:', vehicle.id);
        return false;
      }
      
      // Kiểm tra ngày xuất xe có trong tháng được chọn không
      const exportDate = new Date(vehicle.exportDate);
      const isInSelectedMonth = exportDate.getMonth() + 1 === selectedMonth && 
                              exportDate.getFullYear() === selectedYear;
                              
      console.log('Date check for vehicle', vehicle.id, {
        exportMonth: exportDate.getMonth() + 1,
        exportYear: exportDate.getFullYear(),
        isInSelectedMonth
      });
      
      return isInSelectedMonth;
    });
    
    console.log('Filtered sold vehicles:', filteredVehicles);
    return filteredVehicles.length;
  }, [vehicles, selectedMonth, selectedYear]);

  // Tính số xe đã bán của từng nhân viên dựa trên dữ liệu xe
  const staffSalesMap = useMemo(() => {
    const salesMap: Record<string, number> = {};
    
    vehicles
      .filter(vehicle => {
        // Chỉ lấy xe đã bán và có ngày xuất trong tháng được chọn
        if (vehicle.status !== 'Đã bán' || !vehicle.exportDate || !vehicle.saleStaff?.id) {
          console.log('Vehicle rejected for staff sales:', {
            id: vehicle.id,
            status: vehicle.status,
            exportDate: vehicle.exportDate,
            hasStaff: !!vehicle.saleStaff
          });
          return false;
        }
        
        const exportDate = new Date(vehicle.exportDate);
        const isInSelectedMonth = exportDate.getMonth() + 1 === selectedMonth && 
                                exportDate.getFullYear() === selectedYear;

        console.log('Staff sales date check:', {
          vehicleId: vehicle.id,
          exportMonth: exportDate.getMonth() + 1,
          exportYear: exportDate.getFullYear(),
          isInSelectedMonth
        });
                                
        return isInSelectedMonth;
      })
      .forEach(vehicle => {
        const staffId = vehicle.saleStaff.id;
        if (!salesMap[staffId]) {
          salesMap[staffId] = 0;
        }
        salesMap[staffId]++;
      });
    
    console.log('Staff sales map:', salesMap);
    return salesMap;
  }, [vehicles, selectedMonth, selectedYear]);

  // Tính số xe đã bán của từng phòng kinh doanh
  const departmentSalesMap = useMemo(() => {
    const salesMap: Record<string, number> = {
      [StaffTeam.SALES_1]: 0,
      [StaffTeam.SALES_2]: 0,
      [StaffTeam.SALES_3]: 0
    };
    
    // Lấy mapping giữa nhân viên và phòng ban
    const staffTeamMap: Record<string, string> = {};
    staffList.forEach(staff => {
      staffTeamMap[staff.id] = staff.team;
    });
    
    // Tính số xe bán được cho mỗi phòng ban trong tháng được chọn
    vehicles
      .filter(vehicle => {
        // Chỉ lấy xe đã bán và có ngày xuất trong tháng được chọn
        if (vehicle.status !== 'Đã bán' || !vehicle.exportDate || !vehicle.saleStaff?.id) {
          console.log('Vehicle rejected for department sales:', {
            id: vehicle.id,
            status: vehicle.status,
            exportDate: vehicle.exportDate,
            hasStaff: !!vehicle.saleStaff
          });
          return false;
        }
        
        const exportDate = new Date(vehicle.exportDate);
        const isInSelectedMonth = exportDate.getMonth() + 1 === selectedMonth && 
                                exportDate.getFullYear() === selectedYear;

        console.log('Department sales date check:', {
          vehicleId: vehicle.id,
          exportMonth: exportDate.getMonth() + 1,
          exportYear: exportDate.getFullYear(),
          isInSelectedMonth
        });
                                
        return isInSelectedMonth;
      })
      .forEach(vehicle => {
        const staffId = vehicle.saleStaff.id;
        const team = staffTeamMap[staffId];
        
        if (team === StaffTeam.SALES_1 || team === StaffTeam.SALES_2 || team === StaffTeam.SALES_3) {
          salesMap[team]++;
        }
      });
    
    console.log('Department sales map:', salesMap);
    return salesMap;
  }, [vehicles, staffList, selectedMonth, selectedYear]);

  // Top nhân viên theo doanh số
  const topStaff = useMemo(() => {
    // Tạo map lưu số xe bán được của từng nhân viên trong tháng được chọn
    const staffSalesInMonth: Record<string, number> = {};
    
    vehicles
      .filter(vehicle => {
        // Chỉ lấy xe đã bán và có ngày xuất trong tháng được chọn
        if (vehicle.status !== 'Đã bán' || !vehicle.exportDate || !vehicle.saleStaff?.id) {
          console.log('Vehicle rejected for top staff:', {
            id: vehicle.id,
            status: vehicle.status,
            exportDate: vehicle.exportDate,
            hasStaff: !!vehicle.saleStaff
          });
          return false;
        }
        
        const exportDate = new Date(vehicle.exportDate);
        const isInSelectedMonth = exportDate.getMonth() + 1 === selectedMonth && 
                                exportDate.getFullYear() === selectedYear;

        console.log('Top staff date check:', {
          vehicleId: vehicle.id,
          exportMonth: exportDate.getMonth() + 1,
          exportYear: exportDate.getFullYear(),
          isInSelectedMonth
        });
                                
        return isInSelectedMonth;
      })
      .forEach(vehicle => {
        const staffId = vehicle.saleStaff.id;
        if (!staffSalesInMonth[staffId]) {
          staffSalesInMonth[staffId] = 0;
        }
        staffSalesInMonth[staffId]++;
      });

    console.log('Staff sales in month:', staffSalesInMonth);

    // Sắp xếp nhân viên theo số xe bán được trong tháng
    return [...staffList]
      .map(staff => ({
        ...staff,
        vehiclesSold: staffSalesInMonth[staff.id] || 0
      }))
      .sort((a, b) => b.vehiclesSold - a.vehiclesSold)
      .slice(0, 5);
  }, [vehicles, staffList, selectedMonth, selectedYear]);

  // Cập nhật hiển thị tháng/năm khi có thay đổi
  useEffect(() => {
    setMonthYearString(`Tháng ${selectedMonth}/${selectedYear}`);
  }, [selectedMonth, selectedYear]);

  // Cập nhật dữ liệu khi vehicles thay đổi
  useEffect(() => {
    // Khi danh sách xe thay đổi, các dữ liệu phụ thuộc vào vehicles
    // sẽ được tự động tính toán lại, không cần xử lý thêm
    console.log("Danh sách xe đã thay đổi, cập nhật bảng thống kê");
  }, [vehicles]);

  // Cập nhật dữ liệu khi staffList thay đổi
  useEffect(() => {
    // Khi danh sách nhân viên thay đổi, các dữ liệu phụ thuộc vào staffList
    // sẽ được tự động tính toán lại, không cần xử lý thêm
    console.log("Danh sách nhân viên đã thay đổi, cập nhật bảng thống kê");
  }, [staffList]);

  // Cập nhật dữ liệu khi kpiList thay đổi
  useEffect(() => {
    // Khi danh sách KPI thay đổi, các dữ liệu phụ thuộc vào kpiList
    // sẽ được tự động tính toán lại, không cần xử lý thêm
    console.log("Danh sách KPI đã thay đổi, cập nhật bảng thống kê");
  }, [kpiList]);

  // Cập nhật state khi props thay đổi
  useEffect(() => {
    if (propSelectedMonth && propSelectedYear) {
      setSelectedMonth(propSelectedMonth);
      setSelectedYear(propSelectedYear);
    }
  }, [propSelectedMonth, propSelectedYear]);

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
    
    // Phân tích chuỗi ngày tháng để cập nhật state
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

  // Lấy danh sách KPI của tháng/năm được chọn thay vì tháng hiện tại
  const currentKpis = useMemo(() => 
    kpiList.filter(kpi => kpi.year === selectedYear && kpi.month === selectedMonth),
  [kpiList, selectedYear, selectedMonth]);

  // Lấy KPI của các phòng kinh doanh
  const departmentKpis = useMemo(() => 
    currentKpis.filter(kpi => kpi.targetType === KpiTargetType.DEPARTMENT),
  [currentKpis]);
  
  // Lấy KPI của nhân viên kinh doanh
  const salesStaffKpis = useMemo(() => 
    currentKpis.filter(kpi => kpi.targetType === KpiTargetType.INDIVIDUAL),
  [currentKpis]);

  // Lấy danh sách tất cả nhân viên kinh doanh
  const salesStaffList = useMemo(() => 
    staffList.filter(staff => 
      staff.team === StaffTeam.SALES_1 || 
      staff.team === StaffTeam.SALES_2 || 
      staff.team === StaffTeam.SALES_3
    ),
  [staffList]);

  // Lấy KPI của ban quản lý
  const managementKpi = useMemo(() => 
    currentKpis.find(kpi => kpi.targetType === KpiTargetType.MANAGEMENT),
  [currentKpis]);

  // Cập nhật số liệu thực tế dựa trên số xe đã bán
  const updatedDepartmentKpis = useMemo(() => 
    departmentKpis.map(kpi => {
      let actualValue = 0;
      
      if (kpi.targetName === StaffTeam.SALES_1 || kpi.targetId === StaffTeam.SALES_1) {
        actualValue = departmentSalesMap[StaffTeam.SALES_1] || 0;
      } else if (kpi.targetName === StaffTeam.SALES_2 || kpi.targetId === StaffTeam.SALES_2) {
        actualValue = departmentSalesMap[StaffTeam.SALES_2] || 0;
      } else if (kpi.targetName === StaffTeam.SALES_3 || kpi.targetId === StaffTeam.SALES_3) {
        actualValue = departmentSalesMap[StaffTeam.SALES_3] || 0;
      }

      console.log('Department KPI calculation:', {
        department: kpi.targetName,
        targetValue: kpi.targetValue,
        actualValue,
        salesMap: departmentSalesMap
      });
      
      const completion = calculateKpiCompletion(kpi.targetValue, actualValue);
      const bonus = actualValue * kpi.bonusPerUnit * (completion >= 70 ? 1 : 0.7);
      
      return { ...kpi, actualValue, completion, bonus };
    }),
  [departmentKpis, departmentSalesMap]);

  // Cập nhật số liệu thực tế cho KPI nhân viên
  const updatedSalesStaffKpis = useMemo(() => 
    salesStaffKpis.map(kpi => {
      const staffId = kpi.targetId;
      const actualValue = staffSalesMap[staffId] || 0;

      console.log('Staff KPI calculation:', {
        staffId,
        targetValue: kpi.targetValue,
        actualValue,
        salesMap: staffSalesMap
      });

      const completion = calculateKpiCompletion(kpi.targetValue, actualValue);
      const bonus = calculateSalesBonus({ ...kpi, actualValue });
      return { ...kpi, actualValue, completion, bonus };
    }),
  [salesStaffKpis, staffSalesMap]);

  // Cập nhật số liệu thực tế cho KPI ban quản lý
  const updatedManagementKpi = useMemo(() => {
    if (!managementKpi) return null;
    
    const actualValue = soldVehicles;

    console.log('Management KPI calculation:', {
      targetValue: managementKpi.targetValue,
      actualValue,
      soldVehicles
    });
    
    const completion = calculateKpiCompletion(managementKpi.targetValue, actualValue);
    const bonus = actualValue * managementKpi.bonusPerUnit * (completion >= 70 ? 1 : 0.7);
    
    return { ...managementKpi, actualValue, completion, bonus };
  }, [managementKpi, soldVehicles]);

  // Kết hợp tất cả nhân viên kinh doanh với dữ liệu KPI của họ
  const allSalesStaffWithKpis = useMemo(() => {
    // Ánh xạ nhân viên với KPI
    const staffKpiMap: Record<string, any> = {};
    
    // Trước tiên, xử lý nhân viên đã có KPI
    updatedSalesStaffKpis.forEach(kpi => {
      const staffId = kpi.targetId;
      staffKpiMap[staffId] = kpi;
    });
    
    // Tạo danh sách kết quả bao gồm tất cả nhân viên kinh doanh
    return salesStaffList.map(staff => {
      const kpi = staffKpiMap[staff.id];
      
      if (kpi) {
        // Nhân viên đã có KPI
        return { 
          staff, 
          hasKpi: true,
          kpiData: kpi
        };
      } else {
        // Nhân viên chưa có KPI
        return { 
          staff, 
          hasKpi: false,
          kpiData: {
            targetId: staff.id,
            targetName: staff.name,
            targetValue: 0,
            actualValue: 0,
            completion: 0,
            bonusPerUnit: 0,
            bonus: 0
          }
        };
      }
    });
  }, [salesStaffList, updatedSalesStaffKpis]);

  // Tính tổng thưởng dựa trên KPI thực tế
  const totalCommission = useMemo(() => {
    let total = 0;
    
    // Cộng thưởng từ các phòng kinh doanh
    updatedDepartmentKpis.forEach(kpi => {
      if (kpi.bonus) {
        total += kpi.bonus;
      }
    });
    
    // Cộng thưởng từ ban quản lý
    if (updatedManagementKpi && updatedManagementKpi.bonus) {
      total += updatedManagementKpi.bonus;
    }
    
    // Cộng thưởng từ nhân viên kinh doanh
    updatedSalesStaffKpis.forEach(kpi => {
      if (kpi.bonus) {
        total += kpi.bonus;
      }
    });

    console.log('Total commission calculation:', {
      departmentBonus: updatedDepartmentKpis.reduce((sum, kpi) => sum + (kpi.bonus || 0), 0),
      managementBonus: updatedManagementKpi?.bonus || 0,
      staffBonus: updatedSalesStaffKpis.reduce((sum, kpi) => sum + (kpi.bonus || 0), 0),
      total
    });
    
    return total;
  }, [updatedDepartmentKpis, updatedManagementKpi, updatedSalesStaffKpis]);

  const handleDateChange = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    if (onDateChange) {
      onDateChange(month, year);
    }
  };

  // Snackbar state
  const [showMessage, setShowMessage] = useState(false);
  const [message] = useState({
    type: 'success' as 'success' | 'error' | 'warning' | 'info',
    message: ''
  });

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 4 
      }}>
        <Typography variant="h4">
        Tổng quan quản trị
      </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Tháng trước">
            <IconButton onClick={handlePreviousMonth} size="small">
              <ChevronLeftIcon />
            </IconButton>
          </Tooltip>
          
          <FormControl sx={{ width: 180, mx: 1 }}>
            <TextField
              value={monthYearString}
              onChange={handleMonthYearChange}
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      setSelectedMonth(currentDate.getMonth() + 1);
                      setSelectedYear(currentDate.getFullYear());
                    }}
                    size="small"
                    title="Về tháng hiện tại"
                  >
                    <CalendarMonthIcon fontSize="small" />
                  </IconButton>
                )
              }}
            />
          </FormControl>
          
          <Tooltip title="Tháng sau">
            <span>
              <IconButton 
                onClick={handleNextMonth} 
                size="small"
                disabled={
                  selectedYear > currentDate.getFullYear() || 
                  (selectedYear === currentDate.getFullYear() && selectedMonth >= currentDate.getMonth() + 1)
                }
              >
                <ChevronRightIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

      {/* Thống kê tổng quan */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PeopleAltIcon sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h4">{totalStaff}</Typography>
                <Typography variant="body2">Tổng nhân viên</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: 'success.light', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoneyIcon sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h4">{formatCurrency(totalCommission)}</Typography>
                <Typography variant="body2">Tổng thưởng</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: 'warning.light', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoneyIcon sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h4">{formatCurrency(totalSalary)}</Typography>
                <Typography variant="body2">Tổng lương</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: 'info.light', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DirectionsCarIcon sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h4">{soldVehicles}</Typography>
                <Typography variant="body2">Xe đã bán</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Thống kê nhân viên theo phòng ban và top nhân viên */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <BusinessIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Nhân viên theo phòng ban
            </Typography>
            <Divider sx={{ my: 2 }} />
            {teamOrder.map(team => (
              staffByTeam[team] ? (
                <Box key={team} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">{team}</Typography>
                  <Typography variant="body1" fontWeight="bold">{staffByTeam[team]} nhân viên</Typography>
                </Box>
              ) : null
            ))}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Top 5 nhân viên theo doanh số
            </Typography>
            <Divider sx={{ my: 2 }} />
            {topStaff.map((staff, index) => (
              <Box key={staff.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  {index + 1}. {staff.name} ({staff.team})
                </Typography>
                <Typography variant="body1" fontWeight="bold">{staff.vehiclesSold} xe</Typography>
              </Box>
            ))}
            {topStaff.length === 0 && (
              <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
                Chưa có dữ liệu doanh số
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Báo cáo Nhân viên bán hàng tháng */}
      <SalesStaffReport 
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        allSalesStaffWithKpis={allSalesStaffWithKpis}
      />
      
      {/* Báo cáo Doanh thu tháng */}
      <RevenueReport 
        vehicles={vehicles}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
      
      {/* Bảng KPI, lương và thưởng nhân viên */}
      <KPITable allSalesStaffWithKpis={allSalesStaffWithKpis} />

      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100' }}>
          <Typography variant="h6">Debug Info:</Typography>
          <pre>
            {JSON.stringify({
              totalVehicles: vehicles.length,
              selectedMonth,
              selectedYear,
              totalStaff: staffList.length,
              totalKPIs: kpiList.length,
            }, null, 2)}
          </pre>
                          </Box>
      )}

      {/* Thông báo */}
      <Portal>
        <Slide direction="up" in={showMessage}>
          <Box
                              sx={{ 
              position: 'fixed',
              bottom: 24,
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
              onClose={handleCloseMessage} 
              severity={message.type}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {message.message}
            </Alert>
                          </Box>
        </Slide>
      </Portal>
    </Box>
  );
};

export default Dashboard; 