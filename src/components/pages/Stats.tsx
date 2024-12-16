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
} from '@mui/material';
import html2canvas from 'html2canvas';
import { useAppDispatch } from '../../hook/useAppDispatch';
import DynamicText from '../DynamicText';
import { useGetEmployeesQuery } from '../../features/employees/employeesApi';
import { useGetRatingsQuery } from '../../features/rating/ratingApi';
import DateRangePicker from '../DateRangePicker';
import { startOfDay, endOfDay, parseISO, isWithinInterval } from 'date-fns';
import { useGetStoresQuery } from '../../features/stores/storesApi';

const Stats = () => {
  const { data: employees } = useGetEmployeesQuery();
  const { data: ratings } = useGetRatingsQuery();
  const { data: stores } = useGetStoresQuery();

  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filterEfficiency, setFilterEfficiency] = useState(true);
  const [selectedStore, setSelectedStore] = useState<string>('all');

  useEffect(() => {
    if (localStorage.getItem('filterEfficiency')) {
      setFilterEfficiency(localStorage.getItem('filterEfficiency') === 'true');
    }
  }, []);

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
      link.download = `Employee_Stats_${String(Date.now()).slice(9) || 'Unknown'}.png`;
      link.click();
    }
  };

  const title = `Статистика ${
    startDate && endDate
      ? `з ${startDate.toLocaleDateString()} по ${endDate.toLocaleDateString()}`
      : 'за весь період'
  }`;

  return (
    <Box sx={{ p: 2 }}>
      <DynamicText variant="h4" title={title} gutterBottom />

      <Box sx={{ mb: 2 }}>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </Box>

      <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="store-select-label">Магазин</InputLabel>
          <Select
            labelId="store-select-label"
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            label="Магазин">
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
          label="Сортировать по эффективности"
        />
        <Box>
          <Button
            sx={{ mb: '10px', maxWidth: '200px' }}
            variant="contained"
            color="secondary"
            onClick={makeScreenshot}>
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
