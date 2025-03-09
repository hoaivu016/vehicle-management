import React from 'react';
import { Paper, Typography, Divider, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Grid } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { formatCurrency } from '../../../../utils/formatters';
import { Vehicle, VehicleStatus } from '../../../../types/vehicles/vehicle';

interface RevenueReportProps {
  vehicles: Vehicle[];
  selectedMonth: number;
  selectedYear: number;
}

const RevenueReport: React.FC<RevenueReportProps> = ({ 
  vehicles,
  selectedMonth,
  selectedYear
}) => {
  // Tính toán số liệu báo cáo
  const calculateReportData = () => {
    console.log('Calculating report data with:', {
      totalVehicles: vehicles.length,
      selectedMonth,
      selectedYear
    });

    const soldVehicles = vehicles.filter(vehicle => {
      console.log('Checking vehicle:', {
        id: vehicle.id,
        status: vehicle.status,
        exportDate: vehicle.exportDate,
        salePrice: vehicle.salePrice,
        purchasePrice: vehicle.purchasePrice
      });

      if (!vehicle.exportDate) {
        console.log('Vehicle rejected - no export date:', vehicle.id);
        return false;
      }

      if (vehicle.status !== VehicleStatus.SOLD) {
        console.log('Vehicle rejected - wrong status:', vehicle.id, vehicle.status);
        return false;
      }
      
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

    console.log('Filtered sold vehicles:', soldVehicles);

    // Tính toán doanh thu trung bình và lợi nhuận trung bình
    const totalRevenue = soldVehicles.reduce((sum, vehicle) => {
      const revenue = vehicle.salePrice || 0;
      console.log('Adding revenue for vehicle:', vehicle.id, revenue);
      return sum + revenue;
    }, 0);

    const totalProfit = soldVehicles.reduce((sum, vehicle) => {
      const salePrice = vehicle.salePrice || 0;
      const purchasePrice = vehicle.purchasePrice || 0;
      const profit = salePrice - purchasePrice;
      console.log('Calculating profit for vehicle:', {
        id: vehicle.id,
        salePrice,
        purchasePrice,
        profit
      });
      return sum + profit;
    }, 0);

    const avgRevenue = soldVehicles.length > 0 ? totalRevenue / soldVehicles.length : 0;
    const avgProfit = soldVehicles.length > 0 ? totalProfit / soldVehicles.length : 0;

    const result = {
      soldCount: soldVehicles.length,
      totalRevenue,
      totalProfit,
      avgRevenue,
      avgProfit
    };

    console.log('Final report data:', result);
    return result;
  };

  const reportData = calculateReportData();

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            <AssessmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Báo cáo Doanh thu tháng {selectedMonth}/{selectedYear}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Chỉ số</TableCell>
                  <TableCell align="right">Giá trị</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Số xe đã bán</TableCell>
                  <TableCell align="right">{reportData.soldCount} xe</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tổng doanh thu</TableCell>
                  <TableCell align="right">{formatCurrency(reportData.totalRevenue)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tổng lợi nhuận</TableCell>
                  <TableCell align="right">{formatCurrency(reportData.totalProfit)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Doanh thu trung bình/xe</TableCell>
                  <TableCell align="right">{formatCurrency(reportData.avgRevenue)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lợi nhuận trung bình/xe</TableCell>
                  <TableCell align="right">{formatCurrency(reportData.avgProfit)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RevenueReport; 