import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type SortByProps = {
  options: {
    value: string;
    name: string;
  }[];
  defaultValue: string;
  value: string;
  onChange: (e: any) => void;
};
const SortBy = ({ options, defaultValue, value, onChange }: SortByProps) => {
  return (
    <FormControl variant="outlined" sx={{ minWidth: 120, marginTop: 2 }}>
      <InputLabel>{defaultValue}</InputLabel>
      <Select value={value} onChange={(e) => onChange(e.target.value)} label={defaultValue}>
        <MenuItem disabled value="">
          {defaultValue}
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default SortBy;
