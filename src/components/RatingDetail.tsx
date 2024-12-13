import React from 'react';
import { Box, Grid, Typography, Divider, IconButton, ListItem } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import Modal from './Modal';
import EditRatingForm from './form/EditRatingForm';
import { useAppDispatch } from '../hook/useAppDispatch';

import { useDeleteRatingMutation } from '../features/rating/ratingApi';
import { showNotification } from '../appSlice';

type RatingDetailProps = {
  date: string;
  time: string;
  score: number;
  store: {
    id: string;
    name: string;
  };
  videoUrl: string;
  comment?: string;
  ratingId: string;
};

const RatingDetail = ({
  date,
  time,
  score,
  store,
  videoUrl,
  comment,
  ratingId,
}: RatingDetailProps) => {
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();
  const [deleteRating] = useDeleteRatingMutation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteRating(ratingId).then(() => {
      console.log(ratingId);

      dispatch(showNotification({ message: 'Дані успішно видалено!', severity: 'success' }));
    });
    // dispatch(deleteRating(ratingId));
  };

  return (
    <Box key={`${date}-${time}`} sx={{ marginBottom: 2, position: 'relative' }}>
      <Divider sx={{ marginY: 1 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary">
            Дата: {date}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary">
            Время: {time}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography>Оценка: {score}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography>Магазин: {store.name}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography>
            Видео:{' '}
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
              {videoUrl}
            </a>
          </Typography>
        </Grid>
        {comment && (
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              Комментарий: {comment}
            </Typography>
          </Grid>
        )}
      </Grid>
      {/* Кнопки редактирования и удаления в правом верхнем углу */}
      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
        <IconButton onClick={handleOpen} sx={{ marginRight: 1 }}>
          <EditIcon sx={{ opacity: 0.9, fill: 'gray' }} />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon sx={{ opacity: 0.9, fill: 'gray' }} />
        </IconButton>
      </Box>

      {/* Модальное окно для редактирования рейтинга */}
      <Modal open={open} handleClose={handleClose} decription={'Редактировать оценку'}>
        <EditRatingForm ratingId={ratingId} handleClose={handleClose} />
      </Modal>
    </Box>
  );
};

export default RatingDetail;
