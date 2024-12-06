import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hook/useAppSelector';
import { employeesSelector } from '../../features/employees/employeesSelector';
import { ratingSelector } from '../../features/rating/ratingSelector';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import html2canvas from 'html2canvas';
import { useAppDispatch } from '../../hook/useAppDispatch';
import { fetchRatings } from '../../features/rating/ratingSlice';
import { fetchEmployee } from '../../features/employees/employeesSlice';

const Stats = () => {
  const employees = useAppSelector(employeesSelector);
  const ratings = useAppSelector(ratingSelector);
  const dispatch = useAppDispatch();
  const [filterMonth, setFilterMonth] = useState('');
  const [filterEfficiency, setFilterEfficiency] = useState(false); // Состояние чекбокса для фильтрации эффективности
  const options = [
    { value: '2024-10', name: 'Жовтень' },
    { value: '2024-11', name: 'Листопад' },
    { value: '2024-12', name: 'Грудень' },
  ];

  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchRatings());
  }, [dispatch]);

  const tableRef = useRef<HTMLDivElement>(null);

  // Фильтрация сотрудников по месяцам и расчет статистики
  let employeeStats = employees.map((el) => {
    const employeeId = el.id;
    const filteredRating = ratings.filter(
      (r) => r.employeeId === el.id && r.date.slice(0, 7) === filterMonth,
    );
    const totalCount = filteredRating.reduce((acc, el) => acc + Number(el.score), 0);
    const totalShifts = filteredRating.length;
    const maxScore = totalShifts * 2;
    const efficiency = totalShifts > 0 ? (totalCount / maxScore) * 100 : 0; // Рассчитываем эффективность

    return {
      name: el.name,
      totalCount,
      totalShifts,
      maxScore,
      efficiency, // Добавляем эффективность
    };
  });

  // Сортировка по эффективности, если включен фильтр
  if (filterEfficiency) {
    employeeStats = employeeStats.sort((a, b) => b.efficiency - a.efficiency);
  }

  const makeScreenshot = async () => {
    if (tableRef.current) {
      const canvas = await html2canvas(tableRef.current);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `Employee_Stats_${filterMonth || 'Unknown'}.png`;
      link.click();
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Статистика по працівникам за{' '}
        {filterMonth ? options.find((el) => el.value === filterMonth)?.name : options[0].name} 2024
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button sx={{ mb: '10px' }} variant="contained" color="secondary" onClick={makeScreenshot}>
          Зробити скріншот
        </Button>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Вибрати місяць</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterMonth}
            label="Вибрати місяць"
            onChange={(e) => setFilterMonth(e.target.value)}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Фильтрация по эффективности */}
      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={filterEfficiency}
              onChange={() => setFilterEfficiency(!filterEfficiency)}
              color="primary"
            />
          }
          label="Фильтровать и сортировать по эффективности"
        />
      </Box>

      <TableContainer component={Paper} ref={tableRef}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Ім'я працівника</TableCell>
              <TableCell align="center">Загальна к-сть балів</TableCell>
              <TableCell align="center">Загальна к-сть змін</TableCell>
              <TableCell align="center">Максимальна к-ть балів</TableCell>
              {filterEfficiency && <TableCell align="center">Ефективність</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeStats.map((row, index) => {
              // Вычисляем стиль для эффективности
              let cellStyle = {};
              if (filterEfficiency) {
                if (row.efficiency >= 50) {
                  cellStyle = { backgroundColor: '#B8E0B9', color: 'black' }; // Светло-зеленый цвет, если эффективность >= 50
                } else if (row.efficiency < 50) {
                  cellStyle = { backgroundColor: '#fdced3', color: 'black' }; // Светло-красный цвет, если эффективность < 50
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
  top: '25%', // Смещение сверху для размещения на 75% высоты
  height: '50%', // Высота линии
  width: '1px', // Толщина линии
  backgroundColor: 'gray', // Цвет линии
  transform: 'translateX(-50%)', // Центрирование линии
  opacity: 0.5,
};
