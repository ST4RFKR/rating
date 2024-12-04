import { RootState } from '../../redux/store';

export const employeesSelector = (state: RootState) => state.employees.employee;
