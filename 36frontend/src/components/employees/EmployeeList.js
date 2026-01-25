import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeAPI } from '../../services/api';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Chip,
  CircularProgress,
} from '@mui/material';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await employeeAPI.getList();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.delete(id);
        loadEmployees();
      } catch (error) {
        alert('Error deleting employee');
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Employees</Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/employees/create')}
        >
          Add Employee
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Emp ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.employee_id}</TableCell>
                <TableCell>
                  {emp.user?.first_name && emp.user?.last_name
                    ? `${emp.user.first_name} ${emp.user.last_name}`
                    : emp.user?.username}
                </TableCell>
                <TableCell>{emp.department_name}</TableCell>
                <TableCell>{emp.designation_name}</TableCell>
                <TableCell>
                  {emp.is_manager ? (
                    <Chip label="Manager" color="success" size="small" />
                  ) : (
                    <Chip label="Employee" color="default" size="small" />
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    color="info"
                    onClick={() => navigate(`/employees/view/${emp.employee_id}`)}
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="warning"
                    onClick={() => navigate(`/employees/edit/${emp.id}`)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EmployeeList;
