import React, { useMemo } from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material';
import { Vehicle, VehicleStatus } from '../../../../types/vehicles/vehicle';
import { formatCurrency } from '../../../../utils/formatters';

interface InventoryTabProps {
  vehicles: Vehicle[];
  selectedMonth: number;
  selectedYear: number;
}

const InventoryTab: React.FC<InventoryTabProps> = ({ 
  vehicles, 
  selectedMonth, 
  selectedYear 
}) => {
  const inventoryData = useMemo(() => {
    if (!vehicles || vehicles.length === 0) return {
      inStockCount: 0,
      depositedCount: 0,
      bankDepositedCount: 0,
      totalInStockValue: 0,
      totalInventoryValue: 0
    };

    // Xác định ngày cuối cùng của tháng được chọn
    const lastDayOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
    
    // Lọc xe tồn kho cuối tháng đã chọn
    const vehiclesInStock = vehicles.filter(vehicle => {
      const importDate = new Date(vehicle.importDate);
      const exportDate = vehicle.exportDate ? new Date(vehicle.exportDate) : null;
      
      // Xe đã nhập vào trước hoặc trong tháng được chọn
      const importedBeforeOrDuringMonth = importDate <= lastDayOfMonth;
      
      // Xe chưa xuất hoặc xuất sau tháng được chọn
      const notExportedOrExportedAfterMonth = !exportDate || exportDate > lastDayOfMonth;
      
      return importedBeforeOrDuringMonth && notExportedOrExportedAfterMonth;
    });
    
    // Phân loại xe theo trạng thái
    const inStock = vehiclesInStock.filter(v => v.status === VehicleStatus.IN_STOCK);
    const deposited = vehiclesInStock.filter(v => v.status === VehicleStatus.DEPOSITED);
    const bankDeposited = vehiclesInStock.filter(v => v.status === VehicleStatus.BANK_DEPOSITED);
    
    // Tính tổng giá trị
    const totalInStockValue = inStock.reduce((sum, v) => sum + v.purchasePrice, 0);
    const totalDepositedValue = deposited.reduce((sum, v) => sum + v.purchasePrice, 0);
    const totalBankDepositedValue = bankDeposited.reduce((sum, v) => sum + v.purchasePrice, 0);
    
    return {
      inStockCount: inStock.length,
      depositedCount: deposited.length,
      bankDepositedCount: bankDeposited.length,
      totalInStockValue,
      totalDepositedValue,
      totalBankDepositedValue,
      totalInventoryValue: totalInStockValue + totalDepositedValue + totalBankDepositedValue,
      totalVehiclesCount: inStock.length + deposited.length + bankDeposited.length
    };
  }, [vehicles, selectedMonth, selectedYear]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Báo Cáo Tồn Kho - {selectedMonth + 1}/{selectedYear}
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Xe Trong Kho
          </Typography>
          <Typography variant="h4" color="primary">
            {inventoryData.inStockCount} xe
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Giá trị: {formatCurrency(inventoryData.totalInStockValue || 0)}
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Xe Đã Đặt Cọc
          </Typography>
          <Typography variant="h4" color="primary">
            {(inventoryData.depositedCount || 0) + (inventoryData.bankDepositedCount || 0)} xe
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Giá trị: {formatCurrency((inventoryData.totalDepositedValue || 0) + (inventoryData.totalBankDepositedValue || 0))}
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Tổng tồn kho
          </Typography>
          <Typography variant="h4" color="primary">
            {inventoryData.totalVehiclesCount || 0} xe
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Giá trị: {formatCurrency(inventoryData.totalInventoryValue || 0)}
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Loại</TableCell>
                <TableCell align="right">Số lượng</TableCell>
                <TableCell align="right">Giá trị</TableCell>
                <TableCell align="right">Tỷ lệ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Xe trong kho</TableCell>
                <TableCell align="right">{inventoryData.inStockCount}</TableCell>
                <TableCell align="right">{formatCurrency(inventoryData.totalInStockValue || 0)}</TableCell>
                <TableCell align="right">
                  {inventoryData.totalVehiclesCount ? 
                    `${((inventoryData.inStockCount / inventoryData.totalVehiclesCount) * 100).toFixed(1)}%` : 
                    '0%'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Xe đặt cọc thường</TableCell>
                <TableCell align="right">{inventoryData.depositedCount || 0}</TableCell>
                <TableCell align="right">{formatCurrency(inventoryData.totalDepositedValue || 0)}</TableCell>
                <TableCell align="right">
                  {inventoryData.totalVehiclesCount ? 
                    `${((inventoryData.depositedCount / inventoryData.totalVehiclesCount) * 100).toFixed(1)}%` : 
                    '0%'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Xe đặt cọc ngân hàng</TableCell>
                <TableCell align="right">{inventoryData.bankDepositedCount || 0}</TableCell>
                <TableCell align="right">{formatCurrency(inventoryData.totalBankDepositedValue || 0)}</TableCell>
                <TableCell align="right">
                  {inventoryData.totalVehiclesCount ? 
                    `${((inventoryData.bankDepositedCount / inventoryData.totalVehiclesCount) * 100).toFixed(1)}%` : 
                    '0%'}
                </TableCell>
              </TableRow>
              <TableRow sx={{ fontWeight: 'bold' }}>
                <TableCell><strong>Tổng cộng</strong></TableCell>
                <TableCell align="right"><strong>{inventoryData.totalVehiclesCount || 0}</strong></TableCell>
                <TableCell align="right"><strong>{formatCurrency(inventoryData.totalInventoryValue || 0)}</strong></TableCell>
                <TableCell align="right">100%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default InventoryTab; 