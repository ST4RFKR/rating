import React, { useEffect } from 'react';
import { AppDispatch } from '../redux/store';
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import StoreIcon from '@mui/icons-material/Store';

import { useDispatch } from 'react-redux';

import { useGetStoresQuery } from '../features/stores/storesApi';
import Modal from '../components/Modal';
import AddStoreForm from '../components/form/AddStoreForm';
import { useAppSelector } from '../hook/useAppSelector';
import { roleSelector } from '../appSlice';

interface MainProps {
  getUsers: () => void;
}

const Main: React.FC<MainProps> = ({ getUsers }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const roleCurrentUser = useAppSelector(roleSelector);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data: stores } = useGetStoresQuery();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Магазини</Typography>
          {roleCurrentUser === 'admin' && (
            <Tooltip title="Створити новий магазин">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpen}>
                Новий магазин
              </Button>
            </Tooltip>
          )}
        </Box>
        <Grid container spacing={2}>
          {stores?.map((el: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={el.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {el.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Населений пункт : {el.location}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/store/${el.id}`}
                    variant="outlined"
                    color="primary"
                    startIcon={<StoreIcon />}
                    fullWidth>
                    Перейти до магазину
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Modal open={open} handleClose={handleClose} decription={'Створити магазин'}>
        <AddStoreForm handleClose={handleClose} />
      </Modal>
    </Box>
  );
};

export default Main;
