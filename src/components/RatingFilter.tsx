import React from 'react';
import SearchInput from './UI/input/SearchInput';
import SortBy from './UI/select/SortBy';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';

const RatingFilter = ({ filter, setFilter }: any) => {
  return (
    <>
      <Typography variant="h6" component="h2" align="center">
        Отобразить только за текущий месяц
        <Checkbox
          onChange={(e) => setFilter({ ...filter, currentMonth: e.target.checked })}
          value={filter.currentMonth}
        />
      </Typography>

      <SearchInput value={filter} onChange={setFilter} placeholder="Введите название магазина..." />
      <SortBy
        value={filter.sort}
        onChange={setFilter}
        defaultValue="Сортировка"
        options={[
          { value: 'store-asc', name: 'По магазинам (по возрастанию)' },
          { value: 'store-desc', name: 'По магазинам (по убыванию)' },
          { value: 'date-asc', name: 'По дате (по возрастанию)' },
          { value: 'date-desc', name: 'По дате  (по убыванию)' },
        ]}
      />
    </>
  );
};

export default RatingFilter;
