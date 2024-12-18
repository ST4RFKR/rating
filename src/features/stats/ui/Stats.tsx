import React, { useEffect, useRef, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import html2canvas from 'html2canvas';
import { useAppDispatch } from '../../../components/common/hook/useAppDispatch';

import { useGetEmployeesQuery } from '../../employees/api/employeesApi';
import { useGetRatingsByDateQuery, useGetRatingsQuery } from '../../rating/api/ratingApi';
import DateRangePicker from './DateRangePicker';
import { startOfDay, endOfDay, parseISO, isWithinInterval } from 'date-fns';
import { useGetStoresQuery } from '../../stores/api/storesApi';

const Stats = () => {
  const { data: employees } = useGetEmployeesQuery();

  // const { data: ratings } = useGetRatingsQuery();
  const { data: stores } = useGetStoresQuery();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filterEfficiency, setFilterEfficiency] = useState(true);
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const { data: ratings } = useGetRatingsByDateQuery({
    startDate: startDate ? startDate.toISOString().slice(0, 10) : null,
    endDate: endDate ? endDate.toISOString().slice(0, 10) : null,
  });

  // useEffect(() => {
  //   if (localStorage.getItem('filterEfficiency')) {
  //     setFilterEfficiency(localStorage.getItem('filterEfficiency') === 'true');
  //   }
  //   const today = new Date();
  //   const endDate = today;
  //   const startDate = new Date(today);
  //   startDate.setDate(today.getDate() - 7);

  //   setStartDate(startDate);
  //   setEndDate(endDate);
  // }, []);

  useEffect(() => {
    // Завантаження початкових значень із localStorage
    const storedFilterEfficiency = localStorage.getItem('filterEfficiency');
    const storedSelectedStore = localStorage.getItem('selectedStore');
    const storedStartDate = localStorage.getItem('startDate');
    const storedEndDate = localStorage.getItem('endDate');

    // Ініціалізація стану значеннями з localStorage, якщо вони є
    setFilterEfficiency(storedFilterEfficiency === 'true');
    setSelectedStore(storedSelectedStore || 'all');

    if (storedStartDate) {
      setStartDate(new Date(storedStartDate));
    } else {
      const today = new Date();
      const defaultStartDate = new Date(today);
      defaultStartDate.setDate(today.getDate() - 7);
      setStartDate(defaultStartDate);
    }

    if (storedEndDate) {
      setEndDate(new Date(storedEndDate));
    } else {
      setEndDate(new Date());
    }
  }, []);

  const handleStoreChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedStore(value);
    localStorage.setItem('selectedStore', value);
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    if (start) localStorage.setItem('startDate', start.toISOString());
    if (end) localStorage.setItem('endDate', end.toISOString());
  };

  const tableRef = useRef<HTMLDivElement>(null);

  let filteredEmployees = employees || [];

  if (selectedStore !== 'all') {
    filteredEmployees = employees?.filter((el) => el.currentStoreId === selectedStore) || [];
  }

  let employeeStats = filteredEmployees?.map((el) => {
    const filteredRating = ratings?.filter((r) => {
      const ratingDate = parseISO(r.date);
      return (
        r.employeeId === el.id &&
        (!startDate ||
          !endDate ||
          isWithinInterval(ratingDate, { start: startOfDay(startDate), end: endOfDay(endDate) }))
      );
    });
    const totalCount = filteredRating?.reduce((acc, el) => acc + Number(el.score), 0) || 0;
    const totalShifts = filteredRating?.length || 0;
    const maxScore = totalShifts * 2;
    const efficiency = totalShifts > 0 ? (totalCount / maxScore) * 100 : 0;

    return {
      name: el.name,
      totalCount,
      totalShifts,
      maxScore,
      efficiency,
    };
  });

  if (filterEfficiency) {
    employeeStats = employeeStats?.sort((a, b) => b.efficiency - a.efficiency);
  }

  const makeScreenshot = async () => {
    if (tableRef.current) {
      const canvas = await html2canvas(tableRef.current);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${selectedStore}_${startDate?.toISOString().slice(0, 10) || 'Unknown'}__${
        endDate?.toISOString().slice(0, 10) || 'Unknown'
      }.png`;
      link.click();
    }
  };

  const title = `${selectedStore !== 'all' ? ` ${selectedStore},` : ''}${
    startDate && endDate
      ? `з ${startDate.toLocaleDateString()} по ${endDate.toLocaleDateString()}`
      : 'за весь період'
  }`;

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h4"
        sx={{
          fontSize: {
            xs: '1.5rem',
            sm: '2rem',
            md: '2.5rem',
          },
          textAlign: 'center',
          marginBottom: '1rem',
        }}>
        {title}
      </Typography>

      <Box sx={{ mb: 2, marginTop: '10px' }}>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(date) => handleDateChange(date, endDate)}
          onEndDateChange={(date) => handleDateChange(startDate, date)}
        />
      </Box>

      <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column' }}>
        <FormControl
          sx={{
            minWidth: {
              xs: 120,
              sm: 200,
            },
            width: {
              xs: '100%',
              sm: 'auto',
            },
          }}>
          <InputLabel id="store-select-label">Магазин</InputLabel>
          <Select
            labelId="store-select-label"
            value={selectedStore}
            onChange={handleStoreChange}
            label="Магазин"
            sx={{
              fontSize: {
                xs: '0.75rem',
                sm: '1rem',
              },
            }}>
            <MenuItem value="all">Всі магазини</MenuItem>
            {stores?.map((store) => (
              <MenuItem key={store.id} value={store.id}>
                {store.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={filterEfficiency}
              onChange={() => {
                localStorage.setItem('filterEfficiency', String(!filterEfficiency));
                setFilterEfficiency(!filterEfficiency);
              }}
              color="primary"
            />
          }
          label="Сортувати по ефективності"
        />
        <Box>
          <Button
            variant="contained"
            onClick={makeScreenshot}
            sx={{
              width: {
                xs: '100%',
                sm: 'auto',
              },
              fontSize: {
                xs: '0.8rem',
                sm: '1rem',
              },
            }}>
            Зробити скріншот
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} ref={tableRef}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">{title}</TableCell>
              <TableCell align="center">Загальна к-сть балів</TableCell>
              <TableCell align="center">Загальна к-сть змін</TableCell>
              <TableCell align="center">Максимальна к-ть балів</TableCell>
              {filterEfficiency && <TableCell align="center">Ефективність</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeStats?.map((row, index) => {
              let cellStyle = {};
              if (filterEfficiency) {
                if (row.efficiency >= 50) {
                  cellStyle = { backgroundColor: '#B8E0B9', color: 'black' };
                } else if (row.efficiency < 50) {
                  cellStyle = { backgroundColor: '#fdced3', color: 'black' };
                }
              }

              return (
                <TableRow key={index}>
                  <TableCell align="left" style={cellStyle}>
                    {row.name}
                  </TableCell>
                  <TableCell align="center" style={{ ...cellStyle, position: 'relative' }}>
                    <Box sx={line} />
                    {row.totalCount}
                  </TableCell>
                  <TableCell align="center" style={{ ...cellStyle, position: 'relative' }}>
                    <Box sx={line} />
                    {row.totalShifts}
                  </TableCell>
                  <TableCell align="center" style={{ ...cellStyle, position: 'relative' }}>
                    <Box sx={line} />
                    {row.maxScore}
                  </TableCell>
                  {filterEfficiency && (
                    <TableCell align="center" style={{ ...cellStyle, position: 'relative' }}>
                      <Box sx={line} />
                      {Math.round(row.efficiency)} %
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Stats;

const line = {
  position: 'absolute',
  left: '0',
  top: '25%',
  height: '50%',
  width: '1px',
  backgroundColor: 'gray',
  transform: 'translateX(-50%)',
  opacity: 0.5,
};
