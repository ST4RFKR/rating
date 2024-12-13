import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

import { useGetRatingsQuery, useUpdateRatingMutation } from '../../features/rating/ratingApi';
import { showNotification } from '../../appSlice';

const EditRatingForm = ({ handleClose, ratingId }: any) => {
  const [updateRating] = useUpdateRatingMutation();
  const { data: ratings } = useGetRatingsQuery();

  const dispatch = useDispatch<AppDispatch>();
  const currentData = ratings?.find((el) => el.id === ratingId);
  const [ratingData, setRatingData] = useState({
    date: currentData?.date,
    time: currentData?.time,
    score: currentData?.score,
    comment: currentData?.comment,
    videoUrl: currentData?.videoUrl,
  });

  const changeRatingData = (params: string) => {
    return (e: any) => {
      const value = params === 'rating' ? +e.target.value : e.target.value;

      setRatingData({
        ...ratingData,
        [params]: value,
      });
    };
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
      <TextField
        type="date"
        label="Дата"
        value={ratingData.date}
        onChange={changeRatingData('date')}
        fullWidth
      />
      <TextField
        type="time"
        label="Время"
        value={ratingData.time}
        onChange={changeRatingData('time')}
        fullWidth
      />
      <TextField
        type="number"
        label="Оценка"
        InputProps={{ inputProps: { min: 0, max: 2 } }}
        value={ratingData.score}
        onChange={changeRatingData('score')}
        fullWidth
      />
      <TextField
        label="Комментарий"
        value={ratingData.comment}
        onChange={changeRatingData('comment')}
        fullWidth
      />
      <TextField
        label="ССылка на видео"
        value={ratingData.videoUrl}
        onChange={changeRatingData('videoUrl')}
        fullWidth
      />

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // dispath(
            //   chengeRating({
            //     ratingId: ratingId,
            //     newData: {
            //       ...ratingData,
            //     },
            //   }),
            // );
            updateRating({ id: ratingId, updatedData: ratingData }).then(() => {
              dispatch(
                showNotification({ message: 'Дані успішно оновлено!', severity: 'success' }),
              );
            });
            handleClose();
          }}>
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
