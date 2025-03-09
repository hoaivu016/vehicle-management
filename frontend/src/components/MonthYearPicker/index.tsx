import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface MonthYearPickerProps {
  selectedMonth: number;
  selectedYear: number;
  onChange: (month: number, year: number) => void;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  selectedMonth,
  selectedYear,
  onChange
}) => {
  const currentDate = new Date();
  const [monthYearString, setMonthYearString] = useState(`Tháng ${selectedMonth}/${selectedYear}`);

  useEffect(() => {
    setMonthYearString(`Tháng ${selectedMonth}/${selectedYear}`);
  }, [selectedMonth, selectedYear]);

  const handlePreviousMonth = () => {
    let newMonth = selectedMonth - 1;
    let newYear = selectedYear;
    
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    
    onChange(newMonth, newYear);
  };

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
    
    onChange(newMonth, newYear);
  };

  const handleMonthYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMonthYearString(value);
    
    try {
      // Dự kiến format: "Tháng M/YYYY"
      const matches = value.match(/Tháng\s+(\d{1,2})\/(\d{4})/);
      if (matches && matches.length === 3) {
        const month = parseInt(matches[1], 10);
        const year = parseInt(matches[2], 10);
        
        if (month >= 1 && month <= 12 && year >= 2000) {
          // Không cho phép chọn tháng trong tương lai
          if (year > currentDate.getFullYear() || 
              (year === currentDate.getFullYear() && month > currentDate.getMonth() + 1)) {
            return;
          }
          
          onChange(month, year);
        }
      }
    } catch (error) {
      console.error("Lỗi khi phân tích chuỗi tháng/năm:", error);
    }
  };

  return (
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
                  const currentMonth = currentDate.getMonth() + 1;
                  const currentYear = currentDate.getFullYear();
                  onChange(currentMonth, currentYear);
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
  );
};

export default MonthYearPicker; 