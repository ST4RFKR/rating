import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, Typography, TextField } from '@mui/material';
import { uk } from 'date-fns/locale';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const handleStartDateChange = (newValue: Date | null) => {
    if (endDate && newValue && newValue > endDate) {
      onStartDateChange(null);
    } else {
      onStartDateChange(newValue);
    }
  };

  const handleEndDateChange = (newValue: Date | null) => {
    if (startDate && newValue && newValue < startDate) {
      onEndDateChange(null);
    } else {
      onEndDateChange(newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          З:
        </Typography>
        <DatePicker
          value={startDate}
          onChange={handleStartDateChange}
          format="yyyy-MM-dd"
          slotProps={{
            textField: { size: 'small' }, // Зменшений розмір
          }}
        />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          По:
        </Typography>
        <DatePicker
          value={endDate}
          onChange={handleEndDateChange}
          format="yyyy-MM-dd"
          slotProps={{
            textField: { size: 'small' }, // Зменшений розмір
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
