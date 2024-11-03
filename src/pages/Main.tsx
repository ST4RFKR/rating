import React from 'react';
import { useSelector } from 'react-redux';
import { addStore, storesType } from '../features/stores/storesSlice';
import { RootState } from '../redux/store';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../components/Modal';
import { useDispatch } from 'react-redux';
const Main = () => {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const stores = useSelector((state: RootState) => state.stores);
  const dispatch = useDispatch();
  const AddNewStore = () => {
    dispatch(
      addStore({ id: 'store_3', name: 'Store 3', location: 'USA, LA', employees: ['employee_1'] }),
    );
  };

  return (
    <div>
      <button onClick={AddNewStore}>Add</button>
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
      <Modal open={open} handleClose={handleClose} />
    </div>
  );
};

export default Main;
