import React, { useEffect, useState } from 'react';
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
  Box,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const MyPayroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadPayrolls();
    // eslint-disable-next-line
  }, []);

  const loadPayrolls = async () => {
    try {
      const response = await payrollAPI.getList();
      // Filter payrolls for the logged-in employee only (if backend doesn't already do this)
      const myPayrolls = response.data.filter(
        (p) => p.employee_user_id === user?.id || p.employee_id === user?.employee_id
      );
      setPayrolls(myPayrolls.length ? myPayrolls : response.data); // fallback if backend already filters
    } catch (error) {
      setPayrolls([]);
    } finally {
      setLoading(false);
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
      <Typography variant="h4" mb={3}>My Payroll</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Gross Salary</TableCell>
              <TableCell>Deductions</TableCell>
              <TableCell>Net Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrolls.map((payroll) => (
              <TableRow key={payroll.id}>
                <TableCell>{payroll.month_name}</TableCell>
                <TableCell>{payroll.year}</TableCell>
                <TableCell>₹{payroll.gross_salary}</TableCell>
                <TableCell>₹{payroll.total_deductions}</TableCell>
                <TableCell>₹{payroll.net_salary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MyPayroll;
