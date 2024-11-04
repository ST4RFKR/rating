import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchStores, storesType } from '../features/stores/storesSlice';
import { AppDispatch, RootState } from '../redux/store';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../components/Modal';
import { useDispatch } from 'react-redux';
import AddStoreForm from '../components/AddStoreForm';

const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const stores = useSelector((state: RootState) => state.stores.stores);
  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  return (
    <div>
      {stores.map((el: storesType) => (
        <Link to={`/store/${el.id}`} key={el.id} style={{ textDecoration: 'none' }}>
          <Button sx={{ ml: '10px' }} variant="outlined">
            {el.name}
          </Button>
        </Link>
      ))}
      <Tooltip title="Создать новый магазин">
        <IconButton color="primary" onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Modal open={open} handleClose={handleClose} decription={'Создать магазин'}>
        <AddStoreForm handleClose={handleClose} />
      </Modal>
    </div>
  );
};

export default Main;
