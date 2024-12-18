import React from 'react';
import { Skeleton, Typography } from '@mui/material';

const TitleSkeleton = () => {
  return <Skeleton variant="text" sx={{ width: '20%', height: 40, marginBottom: 2 }} />;
};

export default TitleSkeleton;
