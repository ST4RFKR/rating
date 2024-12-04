import React, { useEffect } from 'react';
import { fetchStores, storesType } from '../features/stores/storesSlice';
import { AppDispatch, RootState } from '../redux/store';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../components/Modal';
import { useDispatch } from 'react-redux';
import AddStoreForm from '../components/form/AddStoreForm';
import { useAppSelector } from '../hook/useAppSelector';

const Main = ({ roleCurrentUser, getUsers }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const stores = useAppSelector((state: RootState) => state.stores.stores);
  useEffect(() => {
    dispatch(fetchStores());
    getUsers();
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
      {roleCurrentUser === 'admin' && (
        <Tooltip title="Создать новый магазин">
          <IconButton color="primary" onClick={handleOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}

      <Modal open={open} handleClose={handleClose} decription={'Создать магазин'}>
        <AddStoreForm handleClose={handleClose} />
      </Modal>
    </div>
  );
};

export default Main;
