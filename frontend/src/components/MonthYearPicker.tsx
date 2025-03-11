import { useState } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import '../styles/globals.css';

interface MonthYearPickerProps {
  month: number;
  year: number;
  onChange: (month: number, year: number) => void;
}

const MonthYearPicker = ({ month, year, onChange }: MonthYearPickerProps) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  
  const handlePreviousMonth = () => {
    let newMonth = month - 1;
    let newYear = year;
    
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    
    onChange(newMonth, newYear);
  };
  
  const handleNextMonth = () => {
    let newMonth = month + 1;
    let newYear = year;
    
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    
    onChange(newMonth, newYear);
  };
  
  const handleResetToCurrentMonth = () => {
    onChange(currentMonth, currentYear);
  };
  
  const isNextDisabled = 
    year > currentYear || 
    (year === currentYear && month >= currentMonth);
  
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      backgroundColor: 'var(--background)',
      borderRadius: 'var(--radius-sm)',
      padding: '2px',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <IconButton 
        onClick={handlePreviousMonth}
        size="small"
        className="action-button"
        sx={{ color: 'var(--text-color)' }}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>
      
      <Typography 
        variant="body1" 
        component="div"
        sx={{ 
          fontWeight: 'var(--font-weight-medium)',
          padding: '0 var(--spacing-sm)',
          color: 'var(--text-color)',
          minWidth: '120px',
          textAlign: 'center'
        }}
      >
        {month}/{year}
      </Typography>
      
      <IconButton
        onClick={handleNextMonth}
        size="small"
        disabled={isNextDisabled}
        className="action-button"
        sx={{ 
          color: isNextDisabled ? 'var(--text-light)' : 'var(--text-color)'
        }}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>
      
      <IconButton
        onClick={handleResetToCurrentMonth}
        size="small"
        className="action-button"
        sx={{ 
          marginLeft: 'var(--spacing-xs)',
          color: 'var(--primary-color)'
        }}
      >
        <CalendarMonthIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default MonthYearPicker; 