import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import { People, Business, EventNote } from '@mui/icons-material';

const AdminDashboard = ({ data }) => {
  const navigate = useNavigate();
  const { total_employees, total_departments, pending_leaves, employees, leaves } = data;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <People sx={{ fontSize: 60, color: 'primary.main' }} />
              <Typography variant="h4">{total_employees}</Typography>
              <Typography color="textSecondary">Total Employees</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Business sx={{ fontSize: 60, color: 'success.main' }} />
              <Typography variant="h4">{total_departments}</Typography>
              <Typography color="textSecondary">Departments</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <EventNote sx={{ fontSize: 60, color: 'warning.main' }} />
              <Typography variant="h4">{pending_leaves}</Typography>
              <Typography color="textSecondary">Pending Leaves</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box mb={3}>
        <Button
          variant="contained"
          onClick={() => navigate('/employees')}
          sx={{ mr: 2 }}
        >
          Manage Employees
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/employees/create')}
          sx={{ mr: 2 }}
        >
          Add Employee
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => navigate('/leaves/admin')}
        >
          Manage Leaves
        </Button>
      </Box>

      {/* Recent Leave Requests */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Leave Requests
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaves?.slice(0, 5).map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell>{leave.employee_name}</TableCell>
                    <TableCell>{leave.leave_type}</TableCell>
                    <TableCell>
                      {leave.start_date} to {leave.end_date}
                    </TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
