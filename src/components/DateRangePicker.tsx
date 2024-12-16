import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, Typography } from '@mui/material';
import { ru } from 'date-fns/locale';

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
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography>З:</Typography>
        <DatePicker
          value={startDate}
          onChange={(newValue) => onStartDateChange(newValue)}
          format="yyyy-MM-dd"
        />
        <Typography>По:</Typography>
        <DatePicker
          value={endDate}
          onChange={(newValue) => onEndDateChange(newValue)}
          format="yyyy-MM-dd"
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
