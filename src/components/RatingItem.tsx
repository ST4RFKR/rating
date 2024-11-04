import { ListItem, ListItemText } from '@mui/material';

type RatingItemPropsType = {
  date: string;
  time: string;
  score: number;
  storeId: string;
  comment?: string;
};
export const RatingItem = ({ date, time, score, storeId, comment }: RatingItemPropsType) => (
  <ListItem>
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
            </>
          )}
        </>
      }
    />
  </ListItem>
);
