import { RootState } from '@/app/store';
import { SelectedEmployee } from '@/types/Employee';
import React from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
const ReactSelect = ({ selectedEmployee, setSelectedEmployee }) => {
  const employees = useSelector((state: RootState) => state.employee.employees);

  const options: SelectedEmployee[] = React.useMemo(
    () =>
      employees.map((emp) => ({
        value: emp.empId ?? emp.empCode,
        label: `${emp.empName || ''} (${emp.empCode}) - ${emp.designation ? emp.designation : ''}`,
        empName: emp.empName || '',
        empCode: emp.empCode || '',
        designation: emp.designation || '',
      })),
    [employees]
  );
  return (
    <Select
      id="employee-select"
      className="mt-2 mb-2"
      options={options}
      value={selectedEmployee}
      onChange={(e) => {
        setSelectedEmployee(e);
        console.log(e);
      }}
      placeholder="Select an employee..."
      isSearchable
      isClearable
    />
  );
};

export default ReactSelect;
