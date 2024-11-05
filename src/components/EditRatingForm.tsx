import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const EditRatingForm = ({ handleClose, ratingId }: any) => {
  const ratings = useSelector((state: RootState) => state.ratings.ratings);
  const currentData = ratings.find((el) => el.id === ratingId);
  const [ratingData, setRatingData] = useState({
    date: currentData?.date,
    time: currentData?.time,
    score: currentData?.score,
    comment: currentData?.comment,
    videoUrl: currentData?.videoUrl,
  });

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
      <TextField type="date" label="Дата" value={ratingData.date} onChange={() => {}} fullWidth />
      <TextField type="time" label="Время" value={ratingData.time} onChange={() => {}} fullWidth />
      <TextField
        type="number"
        label="Оценка"
        InputProps={{ inputProps: { min: 0, max: 2 } }}
        value={ratingData.score}
        onChange={() => {}}
        fullWidth
      />
      <TextField label="Комментарий" value={ratingData.comment} onChange={() => {}} fullWidth />
      <TextField
        label="ССылка на видео"
        value={ratingData.videoUrl}
        onChange={() => {}}
        fullWidth
      />

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={() => {}}>
          Сохранить
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Отменить
        </Button>
      </Box>
    </Box>
  );
};

export default EditRatingForm;
