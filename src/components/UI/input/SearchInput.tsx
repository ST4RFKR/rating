import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

type SearchInputProps = {
  value: {
    query: string;
    sort: string;
  };
  onChange: (value: { query: string; sort: string }) => void;
  placeholder?: string;
};

const SearchInput = ({ value, onChange, placeholder = 'Поиск...' }: SearchInputProps) => {
  return (
    <TextField
      variant="outlined"
      value={value.query}
      onChange={(e) => onChange({ ...value, query: e.target.value })}
      placeholder={placeholder}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Очистить поиск"
              onClick={() => onChange({ ...value, query: '' })}
              edge="end"
              size="small"
              sx={{ visibility: value ? 'visible' : 'hidden' }}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
