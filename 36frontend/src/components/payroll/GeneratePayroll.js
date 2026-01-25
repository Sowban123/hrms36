import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { payrollAPI } from '../../services/api';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  MenuItem,
  CircularProgress,
} from '@mui/material';

const GeneratePayroll = () => {
  const [formData, setFormData] = useState({
    employee_id: '',
    month: '',
    year: new Date().getFullYear(),
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [employeeError, setEmployeeError] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await payrollAPI.getEmployeesForPayroll();
      setEmployees(response.data);
      setEmployeeError(false);
    } catch (error) {
      setEmployees([]);
      setEmployeeError(true);
      console.error('Error loading employees:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await payrollAPI.generate(formData);
      alert('Payroll generated successfully!');
      navigate('/payroll');
    } catch (error) {
      alert('Error generating payroll: ' + (error.response?.data?.error || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Generate Payroll
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid columns={12}>
              <TextField
                fullWidth
                required
                select
                label="Employee"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                error={employeeError || !employees.length}
                helperText={employeeError ? 'Could not load employees. Please check your permissions or try again.' : (!employees.length ? 'No employees available.' : '')}
              >
                {employees.map((emp) => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {emp.employee_id} - {emp.user?.first_name} {emp.user?.last_name || emp.user?.username}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid columns={12} md={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Month (1-12)"
                name="month"
                value={formData.month}
                onChange={handleChange}
                inputProps={{ min: 1, max: 12 }}
              />
            </Grid>

            <Grid columns={12} md={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                inputProps={{ min: 2000, max: 2100 }}
              />
            </Grid>

            <Grid columns={12}>
              <Box display="flex" gap={2}>
                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Generate Payroll'}
                </Button>
                <Button variant="outlined" onClick={() => navigate('/payroll')}>
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default GeneratePayroll;
