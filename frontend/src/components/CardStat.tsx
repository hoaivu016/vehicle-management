import React from 'react';
import { Box, Typography } from '@mui/material';
import '../styles/globals.css';

interface CardStatProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}

const CardStat: React.FC<CardStatProps> = ({ icon, title, value, color = 'primary' }) => {
  // Map color names to CSS variables
  const colorMap = {
    primary: 'var(--primary-color)',
    secondary: 'var(--secondary-color)',
    success: 'var(--success-color)',
    warning: 'var(--warning-color)',
    danger: 'var(--danger-color)',
    info: 'var(--info-color)',
  };

  const iconColor = colorMap[color];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ 
        color: iconColor,
        marginRight: 'var(--spacing-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="textSecondary">
          {title}
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--text-color)'
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardStat; 