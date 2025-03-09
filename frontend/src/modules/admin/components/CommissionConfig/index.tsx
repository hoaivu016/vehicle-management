import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Paper, 
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  FormControl,
  IconButton,
  Alert,
  Snackbar,
  Tooltip,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { Staff } from '../../../../models/staff';
import { KpiTarget, SupportDepartmentBonus } from '../../../../models/kpi';

import { useKpiData } from '../../../../hooks/useKpiData';
import { useAlertInfo } from '../../../../hooks/useAlertInfo';
import { formatNumber } from '../../../../utils/formatters';
import MonthYearPicker from '../../../../components/MonthYearPicker';

// Interface cho props của component
interface CommissionConfigProps {
  staffList: Staff[];
  onSaveKpi?: (kpi: KpiTarget[]) => void;
  onSaveSupportBonus?: (bonus: SupportDepartmentBonus[]) => void;
  // Dữ liệu hiện tại nếu có
  currentKpis?: KpiTarget[];
  currentSupportBonuses?: SupportDepartmentBonus[];
  // Dữ liệu supportBonusList được truyền vào
  supportBonusList?: SupportDepartmentBonus[];
  // Tháng và năm được chọn
  selectedMonth?: number;
  selectedYear?: number;
  // Callback khi thay đổi tháng/năm
  onDateChange?: (month: number, year: number) => void;
}

// Component tabs
enum TabOption {
  SALES_KPI = 0,
  DEPARTMENT_KPI = 1,
  MANAGEMENT_KPI = 2,
  SUPPORT_BONUS = 3,
}

const CommissionConfig: React.FC<CommissionConfigProps> = ({
  staffList,
  onSaveKpi,
  onSaveSupportBonus,
  currentKpis = [],
  currentSupportBonuses = [],
  supportBonusList,
  selectedMonth: propSelectedMonth,
  selectedYear: propSelectedYear,
  onDateChange,
}) => {
  // State cho tab hiện tại
  const [activeTab, setActiveTab] = useState<TabOption>(TabOption.SALES_KPI);
  
  // State cho tháng/năm được chọn, ưu tiên dùng props
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const date = new Date();
    if (propSelectedMonth && propSelectedYear) {
      date.setMonth(propSelectedMonth - 1); // Chuyển từ 1-12 sang 0-11
      date.setFullYear(propSelectedYear);
    }
    return date;
  });

  // State cho chuỗi hiển thị tháng/năm
  const [monthYearString, setMonthYearString] = useState(`Tháng ${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`);
  
  // Sử dụng custom hooks
  const { 
    salesKpis, 
    departmentKpis, 
    managementKpi, 
    supportBonuses, 
    updateSalesKpiValue,
    updateDepartmentKpiValue,
    updateManagementKpiValue,
    updateSupportBonusValue
  } = useKpiData({
    staffList,
    currentKpis,
    currentSupportBonuses,
    selectedMonth: selectedDate.getMonth() + 1,
    selectedYear: selectedDate.getFullYear()
  });

  const { alertInfo, showAlert, hideAlert } = useAlertInfo();

  // Cập nhật tháng/năm khi props thay đổi
  useEffect(() => {
    if (propSelectedMonth && propSelectedYear) {
      const date = new Date();
      date.setMonth(propSelectedMonth - 1);
      date.setFullYear(propSelectedYear);
      setSelectedDate(date);
      setMonthYearString(`Tháng ${propSelectedMonth}/${propSelectedYear}`);
    }
  }, [propSelectedMonth, propSelectedYear]);

  // Cập nhật monthYearString khi selectedDate thay đổi
  useEffect(() => {
    setMonthYearString(`Tháng ${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`);
  }, [selectedDate]);

  // Xử lý khi tab thay đổi
  const handleTabChange = useCallback((_event: React.SyntheticEvent, newValue: TabOption) => {
    setActiveTab(newValue);
  }, []);

  // Xử lý khi tháng thay đổi
  const handleDateChange = (month: number, year: number) => {
    const newDate = new Date(year, month - 1);
    setSelectedDate(newDate);
    if (onDateChange) {
      onDateChange(month, year);
    }
  };

  // Xử lý khi input text thay đổi
  const handleMonthYearChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthYearString(e.target.value);
    
    // Phân tích chuỗi để lấy tháng và năm
    const match = e.target.value.match(/Tháng\s+(\d+)\/(\d+)/);
    if (match) {
      const month = parseInt(match[1], 10);
      const year = parseInt(match[2], 10);
      
      if (!isNaN(month) && !isNaN(year) && month >= 1 && month <= 12) {
        const newDate = new Date(selectedDate);
        newDate.setMonth(month - 1);
        newDate.setFullYear(year);
        setSelectedDate(newDate);
        
        if (onDateChange) {
          onDateChange(month, year);
        }
      }
    }
  }, [selectedDate, onDateChange]);

  // Xử lý khi nút chuyển tháng được nhấn
  const handleMonthNavigation = useCallback((direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    handleDateChange(newDate.getMonth() + 1, newDate.getFullYear());
  }, [selectedDate, handleDateChange]);

  // Xử lý lưu KPI
  const handleSaveKpi = useCallback(() => {
    if (onSaveKpi) {
      onSaveKpi([...salesKpis, ...departmentKpis, ...(managementKpi ? [managementKpi] : [])]);
      showAlert('Đã lưu cấu hình KPI thành công!');
    }
  }, [onSaveKpi, salesKpis, departmentKpis, managementKpi, showAlert]);

  // Xử lý lưu thưởng phòng hỗ trợ
  const handleSaveSupportBonus = useCallback(() => {
    if (onSaveSupportBonus) {
      onSaveSupportBonus(supportBonuses);
      showAlert('Đã lưu cấu hình thưởng phòng hỗ trợ thành công!');
    }
  }, [onSaveSupportBonus, supportBonuses, showAlert]);

  // Render tab cho KPI nhân viên kinh doanh
  const renderSalesKpiTab = useCallback(() => {
    return (
      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nhân viên</TableCell>
                <TableCell align="center">Chỉ tiêu (Xe)</TableCell>
                <TableCell align="center">Thưởng/xe (VNĐ)</TableCell>
                <TableCell align="center">Kích hoạt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesKpis.map((kpi, index) => (
                <TableRow key={kpi.id}>
                  <TableCell>{kpi.targetName}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="text"
                      value={formatNumber(kpi.targetValue)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\./g, '');
                        updateSalesKpiValue(index, 'targetValue', parseInt(value, 10) || 0);
                      }}
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: <InputAdornment position="end">xe</InputAdornment>,
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      type="text"
                      value={formatNumber(kpi.bonusPerUnit)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\./g, '');
                        updateSalesKpiValue(index, 'bonusPerUnit', parseInt(value, 10) || 0);
                      }}
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={kpi.isActive}
                      onChange={(e) => updateSalesKpiValue(index, 'isActive', e.target.checked)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSaveKpi}
          >
            Lưu cấu hình
          </Button>
        </Box>
      </Box>
    );
  }, [salesKpis, updateSalesKpiValue, handleSaveKpi]);

  // Render tab cho KPI phòng ban
  const renderDepartmentKpiTab = useCallback(() => {
    return (
      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Phòng ban</TableCell>
                <TableCell align="center">Chỉ tiêu (Xe)</TableCell>
                <TableCell align="center">Thưởng/xe (VNĐ)</TableCell>
                <TableCell align="center">Kích hoạt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departmentKpis.map((kpi, index) => (
                <TableRow key={kpi.id}>
                  <TableCell>{kpi.targetName}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="text"
                      value={formatNumber(kpi.targetValue)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\./g, '');
                        updateDepartmentKpiValue(index, 'targetValue', parseInt(value, 10) || 0);
                      }}
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: <InputAdornment position="end">xe</InputAdornment>,
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      type="text"
                      value={formatNumber(kpi.bonusPerUnit)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\./g, '');
                        updateDepartmentKpiValue(index, 'bonusPerUnit', parseInt(value, 10) || 0);
                      }}
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={kpi.isActive}
                      onChange={(e) => updateDepartmentKpiValue(index, 'isActive', e.target.checked)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSaveKpi}
          >
            Lưu cấu hình
          </Button>
        </Box>
      </Box>
    );
  }, [departmentKpis, updateDepartmentKpiValue, handleSaveKpi]);

  // Render tab cho KPI quản lý
  const renderManagementKpiTab = useCallback(() => {
    return (
      <Box sx={{ mt: 2 }}>
        {managementKpi && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Cấu hình KPI ban quản lý
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Chỉ tiêu (Số xe)"
                  type="text"
                  fullWidth
                  value={formatNumber(managementKpi.targetValue)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\./g, '');
                    updateManagementKpiValue('targetValue', parseInt(value, 10) || 0);
                  }}
                  InputProps={{
                    inputProps: { min: 0 },
                    endAdornment: <InputAdornment position="end">xe</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Thưởng/xe (VNĐ)"
                  type="text"
                  fullWidth
                  value={formatNumber(managementKpi.bonusPerUnit)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\./g, '');
                    updateManagementKpiValue('bonusPerUnit', parseInt(value, 10) || 0);
                  }}
                  InputProps={{
                    inputProps: { min: 0 },
                    endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={managementKpi.isActive}
                      onChange={(e) => updateManagementKpiValue('isActive', e.target.checked)}
                    />
                  }
                  label="Kích hoạt"
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSaveKpi}
              >
                Lưu cấu hình
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    );
  }, [managementKpi, updateManagementKpiValue, handleSaveKpi]);

  // Render tab cho thưởng phòng hỗ trợ
  const renderSupportBonusTab = useCallback(() => {
    return (
      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Phòng ban</TableCell>
                <TableCell align="center">Thưởng (VNĐ)</TableCell>
                <TableCell align="center">Áp dụng tỷ lệ KPI</TableCell>
                <TableCell align="center">Kích hoạt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {supportBonuses.map((bonus, index) => (
                <TableRow key={bonus.id}>
                  <TableCell>{bonus.departmentName}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="text"
                      value={formatNumber(bonus.bonusAmount)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\./g, '');
                        updateSupportBonusValue(index, 'bonusAmount', parseInt(value, 10) || 0);
                      }}
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={bonus.applyRatio}
                      onChange={(e) => updateSupportBonusValue(index, 'applyRatio', e.target.checked)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={bonus.isActive !== undefined ? bonus.isActive : true}
                      onChange={(e) => updateSupportBonusValue(index, 'isActive', e.target.checked)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSaveSupportBonus}
          >
            Lưu cấu hình
          </Button>
        </Box>
      </Box>
    );
  }, [supportBonuses, updateSupportBonusValue, handleSaveSupportBonus]);

  // Render nội dung tab hiện tại
  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case TabOption.SALES_KPI:
        return renderSalesKpiTab();
      case TabOption.DEPARTMENT_KPI:
        return renderDepartmentKpiTab();
      case TabOption.MANAGEMENT_KPI:
        return renderManagementKpiTab();
      case TabOption.SUPPORT_BONUS:
        return renderSupportBonusTab();
      default:
        return null;
    }
  }, [activeTab, renderSalesKpiTab, renderDepartmentKpiTab, renderManagementKpiTab, renderSupportBonusTab]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cấu hình KPI & Thưởng - Tháng {selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
        </Typography>
        <MonthYearPicker
          selectedMonth={selectedDate.getMonth() + 1}
          selectedYear={selectedDate.getFullYear()}
          onChange={handleDateChange}
        />
      </Box>

      <Paper sx={{ width: '100%' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="KPI Nhân viên KD" />
          <Tab label="KPI Phòng KD" />
          <Tab label="KPI Quản lý" />
          <Tab label="Thưởng Phòng hỗ trợ" />
        </Tabs>
        <Box sx={{ p: 2 }}>
          {renderTabContent()}
        </Box>
      </Paper>

      <Snackbar 
        open={alertInfo.show} 
        autoHideDuration={3000} 
        onClose={hideAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Paper elevation={3}>
          <Alert 
            onClose={hideAlert} 
            severity={alertInfo.severity}
            sx={{ width: '100%' }}
          >
            {alertInfo.message}
          </Alert>
        </Paper>
      </Snackbar>
    </Box>
  );
};

export default CommissionConfig; 