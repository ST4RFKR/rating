import { Box, Divider, IconButton, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteRating } from '../features/rating/ratingSlice';
import { AppDispatch } from '../redux/store';
import { Edit } from '@mui/icons-material';

import Modal from './Modal';
import EditRatingForm from './EditRatingForm';
type RatingItemPropsType = {
  date: string;
  time: string;
  score: number;
  storeId: string;
  ratingId: string;
  comment?: string;
};
export const RatingItem = ({
  date,
  time,
  score,
  storeId,
  comment,
  ratingId,
}: RatingItemPropsType) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (e: any, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deleteRating(id));
  };
  return (
    <ListItem>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          right: 0,
          top: 0,
          margin: '10px',
        }}>
        <IconButton
          onClick={(e: any) => {
            e.stopPropagation();
            e.preventDefault();
            handleOpen();
          }}>
          <Edit />
        </IconButton>
        <IconButton onClick={(e) => handleDelete(e, ratingId)}>
          <DeleteIcon />
        </IconButton>
      </Box>

      <ListItemText
        primary={
          <>
            <strong>Дата:</strong> {date} <br />
            <strong>Время:</strong> {time} <br />
            <strong>Оценка:</strong> {score} <br />
            <strong>Магазин:</strong> {storeId} <br />
            {comment && (
              <>
                <strong>Комментарий:</strong> {comment} <br />
                <Divider sx={{ marginY: 1 }} />
              </>
            )}
          </>
        }
      />
      <Modal open={open} handleClose={handleClose} decription={'Внесите изминения'}>
        <EditRatingForm handleClose={handleClose} ratingId={ratingId} />
      </Modal>
    </ListItem>
  );
};
