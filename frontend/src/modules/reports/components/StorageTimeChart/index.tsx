import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';

interface StorageTimeChartProps {
  data: ChartData<'line'>;
  formatCurrency: (value: number) => string;
}

const StorageTimeChart: React.FC<StorageTimeChartProps> = ({ data, formatCurrency }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Thời Gian Tồn Kho Trung Bình Theo Tháng',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số ngày trung bình'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Tháng'
        }
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Thời Gian Tồn Kho
      </Typography>
      <Box sx={{ height: 300 }}>
        <Line data={data} options={options} />
      </Box>
    </Paper>
  );
};

export default StorageTimeChart; 