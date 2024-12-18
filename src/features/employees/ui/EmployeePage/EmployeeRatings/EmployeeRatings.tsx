import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete as DeleteIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import TitleSkeleton from '../TitleSkeleton';
import SortBy, { SortOption } from '../../../../../components/common/ui/select/SortBy';
import RatingDetailSkeleton from '../RatingDetail/RatingDetailSkeleton';
import RatingDetail from '../RatingDetail/RatingDetail';
import { Can } from '@casl/react';
import { useAbility } from '../../../../../components/casl/useAbility';

interface EmployeeRatingsProps {
  el: {
    id: string;
    name: string;
  };
  store: {
    id: string;
  };
  isLoadingEmployees: boolean;
  isLoadingRatings: boolean;
  removeEmployee: (params: { storeId: string; employeeId: string }) => void;
  filter: {
    sort: SortOption;
    query: string;
  };
  setFilter: React.Dispatch<React.SetStateAction<{ sort: SortOption; query: string }>>;
  sortedRatings: any[];
}

const EmployeeRatings: React.FC<EmployeeRatingsProps> = ({
  el,
  store,
  isLoadingEmployees,
  isLoadingRatings,
  removeEmployee,
  filter,
  setFilter,
  sortedRatings,
}) => {
  const ability = useAbility();
  return (
    <Accordion key={el.id} elevation={3} sx={{ marginBottom: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`employee-${el.id}-content`}
        id={`employee-${el.id}-header`}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          {isLoadingEmployees ? (
            <TitleSkeleton />
          ) : (
            <Typography
              sx={{
                cursor: 'pointer',
                transition: 'color 0.3s, text-decoration 0.3s, transform 0.3s',
                '&:hover': {
                  color: 'primary.main',
                  transform: 'scale(1.05)',
                },
              }}
              variant="h6">
              <MuiLink component={Link} to={`/employees/${el.id}`} sx={{ textDecoration: 'none' }}>
                {el.name}{' '}
              </MuiLink>
            </Typography>
          )}
          <Box>
            <Can I="delete" a="Article" ability={ability}>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  removeEmployee({ storeId: store.id, employeeId: el.id });
                }}>
                <DeleteIcon sx={{ opacity: 0.9, fill: 'gray' }} />
              </IconButton>
            </Can>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
          <SortBy
            value={filter}
            onChange={setFilter}
            defaultValue="Сортування"
            options={[
              { value: 'date-asc', name: 'За датою (за зростанням)' },
              { value: 'date-desc', name: 'За датою (за спаданням)' },
            ]}
          />
        </Box>
        {isLoadingRatings && [...Array(4)].map((_, idx) => <RatingDetailSkeleton key={idx} />)}

        {sortedRatings.length ? (
          sortedRatings.map((rating: any) => (
            <RatingDetail
              key={rating.id}
              date={rating.date}
              time={rating.time}
              score={rating.score}
              store={rating.store}
              videoUrl={rating.videoUrl}
              comment={rating.comment}
              ratingId={rating.id}
            />
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            Оцінок немає. 😉
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default EmployeeRatings;
