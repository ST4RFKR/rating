import React from 'react';
import { Box, Paper, Skeleton } from '@mui/material';

const EmployeInfoSkeleton = () => {
  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Box>
        <Skeleton variant="text" sx={{ width: '30%', height: 60, marginBottom: 1 }} />
        <Skeleton variant="text" sx={{ width: '25%', height: 24, marginBottom: 0.5 }} />
        <Skeleton variant="text" sx={{ width: '30%', height: 24, marginBottom: 0.5 }} />
        <Skeleton variant="text" sx={{ width: '30%', height: 24, marginBottom: 0.5 }} />
        <Skeleton variant="text" sx={{ width: '20%', height: 24, marginBottom: 0.5 }} />
        <Skeleton variant="text" sx={{ width: '35%', height: 24, marginBottom: 0.5 }} />
        <Skeleton variant="text" sx={{ width: '40%', height: 24, marginBottom: 0.5 }} />
      </Box>
    </Paper>
  );
};

export default EmployeInfoSkeleton;
