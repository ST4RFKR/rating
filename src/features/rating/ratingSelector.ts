import { RootState } from '../../redux/store';

export const ratingSelector = (state: RootState) => state.ratings.ratings;
