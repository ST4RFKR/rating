import { Box, Paper, Typography } from '@mui/material';

type EmployeInfoPropsType = {
  employee: any;
};
const EmployeInfo = ({ employee }: EmployeInfoPropsType) => {
  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Box>
        <Typography variant="h5">{employee.name}</Typography>
        <Typography variant="body1" color="textSecondary">
          Посада: {employee.position}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Середній результат за поточний місяць: {employee.averageScore}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Телефон: {employee.phone}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Електронна пошта: {employee.email}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Адреса: {employee.address}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Дата прийому на роботу: {employee.hireDate}
        </Typography>
      </Box>
    </Paper>
  );
};
export default EmployeInfo;
