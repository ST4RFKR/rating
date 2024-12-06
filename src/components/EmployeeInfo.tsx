import { Box, Paper, Typography } from '@mui/material';
import { employeeType } from '../features/employees/employeesSlice';
import DynamicText from './DynamicText';

type EmployeInfoPropsType = {
  employee: employeeType;
};
const EmployeInfo = ({ employee }: EmployeInfoPropsType) => {
  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Box>
        <DynamicText title={employee.name} variant="h5" component="h2" gutterBottom />
        <Typography variant="body1" color="textSecondary">
          Должность: {employee.position}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Средний результат за текущий месяц: {employee.averageScore}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Телефон: {employee.phone}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Почта: {employee.email}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Адрес: {employee.address}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Дата приема на работу: {employee.hireDate}
        </Typography>
      </Box>
    </Paper>
  );
};
export default EmployeInfo;
