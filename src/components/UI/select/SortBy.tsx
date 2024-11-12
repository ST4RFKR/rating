import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
export type SortOption =
  | 'date-asc'
  | 'date-desc'
  | 'store-asc'
  | 'store-desc'
  | 'time-asc'
  | 'time-desc';
type SortByProps = {
  options: {
    value: SortOption;
    name: string;
  }[];
  defaultValue: string;
  value: {
    sort: string;
    query: string;
  };
  onChange: (e: any) => void;
};
const SortBy = ({ options, defaultValue, value, onChange }: SortByProps) => {
  return (
    <FormControl variant="outlined" sx={{ maxWidth: 150, width: '100%', marginTop: 2 }}>
      <InputLabel>{defaultValue}</InputLabel>
      <Select
        value={value.sort}
        onChange={(e) => onChange({ ...value, sort: e.target.value })}
        label={defaultValue}>
        <MenuItem disabled value="">
          {defaultValue}
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.name} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default SortBy;
