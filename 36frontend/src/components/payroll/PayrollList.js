import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { payrollAPI } from '../../services/api';
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
  TextField,
  Grid,
  CircularProgress,
} from '@mui/material';

const PayrollList = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    month: '',
    year: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadPayrolls();
  }, []);

  const loadPayrolls = async () => {
    try {
      const response = await payrollAPI.getList(filters.month, filters.year);
      setPayrolls(response.data);
    } catch (error) {
      console.error('Error loading payrolls:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    setLoading(true);
    loadPayrolls();
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
        <Typography variant="h4">Payroll</Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/payroll/generate')}
        >
          Generate Payroll
        </Button>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid columns={12} md={3}>
            <TextField
              fullWidth
              type="number"
              label="Month (1-12)"
              value={filters.month}
              onChange={(e) => setFilters({ ...filters, month: e.target.value })}
            />
          </Grid>
          <Grid columns={12} md={3}>
            <TextField
              fullWidth
              type="number"
              label="Year"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            />
          </Grid>
          <Grid columns={12} md={3}>
            <Button variant="contained" onClick={handleFilter}>
              Filter
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Employee</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Gross Salary</TableCell>
              <TableCell>Deductions</TableCell>
              <TableCell>Net Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrolls.map((payroll) => (
              <TableRow key={payroll.id}>
                <TableCell>{payroll.employee_id}</TableCell>
                <TableCell>{payroll.employee_name}</TableCell>
                <TableCell>{payroll.month_name}</TableCell>
                <TableCell>{payroll.year}</TableCell>
                <TableCell>₹{payroll.gross_salary}</TableCell>
                <TableCell>₹{payroll.total_deductions}</TableCell>
                <TableCell>₹{payroll.net_salary}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/payroll/detail/${payroll.id}`)}
                  >
                    View
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

export default PayrollList;
