import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { formatCurrency } from '../../../../utils/formatters';

interface ReportSummaryProps {
  importedCount: number;
  soldCount: number;
  totalRevenue: number;
  totalProfit: number;
  averageProfit: number;
  stockCount: number;
  depositCount: number;
  averageStorageTime: number;
}

const ReportSummary: React.FC<ReportSummaryProps> = ({
  importedCount,
  soldCount,
  totalRevenue,
  totalProfit,
  averageProfit,
  stockCount,
  depositCount,
  averageStorageTime
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Typography variant="subtitle2" color="text.secondary">
            Số xe nhập trong tháng
          </Typography>
          <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
            {importedCount}
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Typography variant="subtitle2" color="text.secondary">
            Số xe bán trong tháng
          </Typography>
          <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
            {soldCount}
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Typography variant="subtitle2" color="text.secondary">
            Doanh thu trong tháng
          </Typography>
          <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
            {formatCurrency(totalRevenue)}
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Typography variant="subtitle2" color="text.secondary">
            Lợi nhuận trong tháng
          </Typography>
          <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
            {formatCurrency(totalProfit)}
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Typography variant="subtitle2" color="text.secondary">
            Lợi nhuận trung bình/xe
          </Typography>
          <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
            {formatCurrency(averageProfit)}
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Typography variant="subtitle2" color="text.secondary">
            Số xe trong kho
          </Typography>
          <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
            {stockCount}
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Typography variant="subtitle2" color="text.secondary">
            Số xe đã đặt cọc
          </Typography>
          <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
            {depositCount}
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Typography variant="subtitle2" color="text.secondary">
            Thời gian tồn kho TB (ngày)
          </Typography>
          <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
            {averageStorageTime.toFixed(1)}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReportSummary; 