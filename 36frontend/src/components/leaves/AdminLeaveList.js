import React, { useEffect, useState } from 'react';
import { leaveAPI } from '../../services/api';
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

const AdminLeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const response = await leaveAPI.getAdminList();
      setLeaves(response.data);
    } catch (error) {
      console.error('Error loading leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await leaveAPI.approve(id);
      alert('Leave approved successfully!');
      loadLeaves();
    } catch (error) {
      alert('Error approving leave');
    }
  };

  const handleReject = async (id) => {
    try {
      await leaveAPI.reject(id);
      alert('Leave rejected');
      loadLeaves();
    } catch (error) {
      alert('Error rejecting leave');
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
      <Typography variant="h4" gutterBottom>
        Manage Leave Requests
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>{leave.employee_name}</TableCell>
                <TableCell>{leave.department_name}</TableCell>
                <TableCell>{leave.leave_type}</TableCell>
                <TableCell>
                  {leave.start_date} to {leave.end_date}
                </TableCell>
                <TableCell>{leave.reason}</TableCell>
                <TableCell>
                  <Chip
                    label={leave.status}
                    color={
                      leave.status === 'APPROVED'
                        ? 'success'
                        : leave.status === 'REJECTED'
                        ? 'error'
                        : 'warning'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {leave.status === 'PENDING' && (
                    <Box display="flex" gap={1}>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => handleApprove(leave.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => handleReject(leave.id)}
                      >
                        Reject
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminLeaveList;
