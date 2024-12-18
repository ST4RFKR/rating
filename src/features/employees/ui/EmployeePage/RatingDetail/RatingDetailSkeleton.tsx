import React from 'react';
import { Box, Grid, Skeleton, Divider, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const RatingDetailSkeleton = () => {
  return (
    <Box sx={{ marginBottom: 2, position: 'relative' }}>
      <Divider sx={{ marginY: 1 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="text" sx={{ width: '50%', height: 24 }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="text" sx={{ width: '30%', height: 24 }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Skeleton variant="text" sx={{ width: '50%', height: 24 }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Skeleton variant="text" sx={{ width: '50%', height: 24 }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Skeleton variant="text" sx={{ width: '65%', height: 24 }} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Skeleton variant="text" sx={{ width: '50%', height: 24 }} />
        </Grid>
      </Grid>

      {/* Кнопки редактирования и удаления */}
      <Box sx={{ position: 'absolute', top: 8, right: 20, display: 'flex', gap: 2.5 }}>
        <Skeleton variant="circular" width={24} height={24}>
          <IconButton disabled>
            <EditIcon />
          </IconButton>
        </Skeleton>
        <Skeleton variant="circular" width={24} height={24}>
          <IconButton disabled>
            <DeleteIcon />
          </IconButton>
        </Skeleton>
      </Box>
    </Box>
  );
};

export default RatingDetailSkeleton;
