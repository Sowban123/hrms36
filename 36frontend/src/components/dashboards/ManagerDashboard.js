import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

const ManagerDashboard = ({ data }) => {
  const navigate = useNavigate();
  const {
    employee,
    profile,
    profile_pending,
    managed_department,
    team,
    present_count,
    absent_count,
    total_team,
  } = data;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manager Dashboard
      </Typography>

      {/* Profile Summary */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar
              src={profile?.photo_url || 'https://via.placeholder.com/100'}
              sx={{ width: 100, height: 100 }}
            />
            <Box>
              <Typography variant="h5">
                {employee?.user?.first_name && employee?.user?.last_name
                  ? `${employee.user.first_name} ${employee.user.last_name}`
                  : employee?.user?.username}
              </Typography>
              <Typography color="textSecondary">
                Employee ID: {employee?.employee_id}
              </Typography>
              <Typography color="textSecondary">
                Managing: {managed_department}
              </Typography>
              {profile_pending ? (
                <Chip label="Profile Pending Approval" color="warning" sx={{ mt: 1 }} />
              ) : (
                <Chip label="Profile Verified" color="success" sx={{ mt: 1 }} />
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Team Attendance Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4">{total_team}</Typography>
              <Typography color="textSecondary">Total Team Members</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 60, color: 'success.main' }} />
              <Typography variant="h4">{present_count}</Typography>
              <Typography color="textSecondary">Present Today</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Cancel sx={{ fontSize: 60, color: 'error.main' }} />
              <Typography variant="h4">{absent_count}</Typography>
              <Typography color="textSecondary">Absent Today</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Team Members */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Team Members - Today's Attendance
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {team?.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.employee_id}</TableCell>
                    <TableCell>
                      {member.user?.first_name && member.user?.last_name
                        ? `${member.user.first_name} ${member.user.last_name}`
                        : member.user?.username}
                    </TableCell>
                    <TableCell>{member.designation_name}</TableCell>
                    <TableCell>
                      {member.is_present ? (
                        <Chip label="Present" color="success" size="small" />
                      ) : (
                        <Chip label="Absent" color="error" size="small" />
                      )}
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

export default ManagerDashboard;
