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

  const employeeStats = employees.map((el) => {
    const employeeId = el.id;
    const filteredRating = ratings.filter(
      (r) => r.employeeId === el.id && r.date.slice(0, 7) === filterMonth,
    );
    const totalCount = filteredRating.reduce((acc, el) => acc + Number(el.score), 0);
    const totalShifts = filteredRating.length;
    const maxScore = totalShifts * 2;

    return {
      name: el.name,
      totalCount,
      totalShifts,
      maxScore,
    };
  });

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

      <TableContainer component={Paper} ref={tableRef}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Ім'я працівника</TableCell>
              <TableCell align="center">Загальна к-сть балів</TableCell>
              <TableCell align="center">Загальна к-сть змін</TableCell>
              <TableCell align="center">Максимальна к-ть балів</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeStats.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="center">{row.totalCount}</TableCell>
                <TableCell align="center">{row.totalShifts}</TableCell>
                <TableCell align="center">{row.maxScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Stats;
