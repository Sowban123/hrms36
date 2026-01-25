import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { payrollAPI } from '../../services/api';
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Button
} from '@mui/material';

const PayrollDetail = () => {
  const { id } = useParams();
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const response = await payrollAPI.getDetail(id);
        setPayroll(response.data);
      } catch (error) {
        setPayroll(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPayroll();
  }, [id]);

  const handleDownloadPDF = () => {
    window.open(`http://localhost:8000/payroll/${id}/payslip/`, '_blank');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!payroll) {
    return <Typography variant="h6">Payroll record not found.</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" gutterBottom>
            Payroll Details
          </Typography>
          <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
            Download PDF
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>{payroll.employee_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell>{payroll.month_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell>{payroll.year}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gross Salary</TableCell>
                <TableCell>₹{payroll.gross_salary}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Deductions</TableCell>
                <TableCell>₹{payroll.total_deductions}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Net Salary</TableCell>
                <TableCell>₹{payroll.net_salary}</TableCell>
              </TableRow>
              {/* Add more fields as needed */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default PayrollDetail;
