import React from 'react';
import SearchInput from '../../../components/common/ui/input/SearchInput';
import SortBy from '../../../components/common/ui/select/SortBy';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';

const RatingFilter = ({ filter, setFilter }: any) => {
  return (
    <>
      <Typography variant="h6" component="h2" align="center">
        Показати оцінки за поточний місяць
        <Checkbox
          onChange={(e) => setFilter({ ...filter, currentMonth: e.target.checked })}
          value={filter.currentMonth}
        />
      </Typography>

      <SearchInput value={filter} onChange={setFilter} placeholder="Введіть назву магазину..." />
      <SortBy
        value={filter.sort}
        onChange={setFilter}
        defaultValue="Сортування"
        options={[
          { value: 'store-asc', name: 'За магазинами (за зростанням)' },
          { value: 'store-desc', name: 'За магазинами (за спаданням)' },
          { value: 'date-asc', name: 'За датою (за зростанням)' },
          { value: 'date-desc', name: 'За датою (за спаданням)' },
        ]}
      />
    </>
  );
};

export default RatingFilter;
