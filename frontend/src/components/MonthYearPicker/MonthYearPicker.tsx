import React, { useState } from 'react';
import { Box, IconButton, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export interface MonthYearPickerProps {
  selectedMonth: number;
  selectedYear: number;
  onChange: (month: number, year: number) => void;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ 
  selectedMonth, 
  selectedYear, 
  onChange 
}) => {
  const [month, setMonth] = useState(selectedMonth);
  const [year, setYear] = useState(selectedYear);

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    const newMonth = Number(event.target.value);
    setMonth(newMonth);
    onChange(newMonth, year);
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    const newYear = Number(event.target.value);
    setYear(newYear);
    onChange(month, newYear);
  };

  const handlePrevMonth = () => {
    let newMonth = month - 1;
    let newYear = year;
    
    if (newMonth < 1) {
      newMonth = 12;
      newYear = year - 1;
    }
    
    setMonth(newMonth);
    setYear(newYear);
    onChange(newMonth, newYear);
  };

  const handleNextMonth = () => {
    let newMonth = month + 1;
    let newYear = year;
    
    if (newMonth > 12) {
      newMonth = 1;
      newYear = year + 1;
    }
    
    setMonth(newMonth);
    setYear(newYear);
    onChange(newMonth, newYear);
  };

  const months = [
    { value: 1, label: 'Tháng 1' },
    { value: 2, label: 'Tháng 2' },
    { value: 3, label: 'Tháng 3' },
    { value: 4, label: 'Tháng 4' },
    { value: 5, label: 'Tháng 5' },
    { value: 6, label: 'Tháng 6' },
    { value: 7, label: 'Tháng 7' },
    { value: 8, label: 'Tháng 8' },
    { value: 9, label: 'Tháng 9' },
    { value: 10, label: 'Tháng 10' },
    { value: 11, label: 'Tháng 11' },
    { value: 12, label: 'Tháng 12' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={handlePrevMonth} size="small">
        <ChevronLeft />
      </IconButton>
      
      <Select
        value={month}
        onChange={handleMonthChange}
        size="small"
        sx={{ mx: 1, minWidth: 100 }}
      >
        {months.map((m) => (
          <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
        ))}
      </Select>
      
      <Select
        value={year}
        onChange={handleYearChange}
        size="small"
        sx={{ mx: 1, minWidth: 80 }}
      >
        {years.map((y) => (
          <MenuItem key={y} value={y}>{y}</MenuItem>
        ))}
      </Select>
      
      <IconButton onClick={handleNextMonth} size="small">
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

export default MonthYearPicker; 