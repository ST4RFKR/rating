import React from 'react';
import { Box, Grid, Typography, Divider, IconButton, ListItem } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { deleteRating } from '../features/rating/ratingSlice';
import Modal from './Modal';
import EditRatingForm from './EditRatingForm';
import { storesType } from '../features/stores/storesSlice';
import { AppDispatch } from '../redux/store';

type RatingDetailProps = {
  date: string;
  time: string;
  score: number;
  storeId: string;
  videoUrl: string;
  comment?: string;
  stores: storesType[];
  ratingId: string;
};

const RatingDetail = ({
  date,
  time,
  score,
  storeId,
  videoUrl,
  comment,
  stores,
  ratingId,
}: RatingDetailProps) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteRating(ratingId));
  };

  const currentStore = stores.find((store) => store.id === storeId);

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
          <Typography>Магазин: {currentStore?.name || 'Не указано'}</Typography>
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
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
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
