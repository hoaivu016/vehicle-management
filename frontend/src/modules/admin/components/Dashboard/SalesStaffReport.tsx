import React from 'react';
import { Paper, Typography, Divider, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Grid } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { formatCurrency } from '../../../../utils/formatters';

interface SalesStaffReportProps {
  selectedMonth?: number;
  selectedYear?: number;
  allSalesStaffWithKpis?: any[];
}

const SalesStaffReport: React.FC<SalesStaffReportProps> = ({ 
  selectedMonth = new Date().getMonth() + 1,
  selectedYear = new Date().getFullYear(),
  allSalesStaffWithKpis = []
}) => {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            <AssessmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Báo cáo Nhân viên bán hàng tháng {selectedMonth}/{selectedYear}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nhân viên</TableCell>
                  <TableCell>Phòng ban</TableCell>
                  <TableCell>Số xe bán</TableCell>
                  <TableCell>Doanh thu</TableCell>
                  <TableCell>Lợi nhuận</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allSalesStaffWithKpis.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.staff.name}</TableCell>
                    <TableCell>{item.staff.team}</TableCell>
                    <TableCell>{item.kpiData.actualValue}</TableCell>
                    <TableCell>{formatCurrency(item.kpiData.actualValue * 48000)}</TableCell>
                    <TableCell>{formatCurrency(item.kpiData.actualValue * 3750)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SalesStaffReport; 