import React from 'react';
import { SortOption } from '../components/UI/select/SortBy';
import { ratingType } from '../features/rating/ratingSlice';

export const useSortedRatings = (ratings: ratingType[], sort: string) => {
  return React.useMemo(() => {
    let sorted = [...ratings];

    if (sort === 'date-asc') {
      sorted = sorted.sort((a, b) => a.date.localeCompare(b.date));
    } else if (sort === 'date-desc') {
      sorted = sorted.sort((a, b) => b.date.localeCompare(a.date));
    } else if (sort === 'store-asc') {
      sorted = sorted.sort((a, b) => a.store.id.localeCompare(b.store.id));
    } else if (sort === 'store-desc') {
      sorted = sorted.sort((a, b) => b.store.id.localeCompare(a.store.id));
    }

    return sorted;
  }, [ratings, sort]);
};

export const useRating = (
  ratings: ratingType[],
  sort: string,
  query: string,
  isCurrentMonth: boolean,
) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const sortedRatings = useSortedRatings(ratings, sort);

  const sortedAndSearchRatings = React.useMemo(() => {
    let filteredRatings = sortedRatings;

    // Фильтрация по текущему месяцу
    if (isCurrentMonth) {
      filteredRatings = filteredRatings.filter((rating: ratingType) => {
        const [year, month] = rating.date.split('-').map(Number);
        return month === currentMonth && year === currentYear;
      });
    }

    // Фильтрация по запросу
    if (query) {
      filteredRatings = filteredRatings.filter((rating: ratingType) =>
        rating.store.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filteredRatings;
  }, [query, isCurrentMonth, sortedRatings]);

  return sortedAndSearchRatings;
};
