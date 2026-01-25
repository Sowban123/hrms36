import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
} from '@mui/material';
import { EventNote, Person } from '@mui/icons-material';

const EmployeeDashboard = ({ data }) => {
  const navigate = useNavigate();
  const { employee, profile, profile_pending } = data;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Employee Dashboard
      </Typography>

      {/* Profile Summary Card */}
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
                {employee?.designation_name} — {employee?.department_name}
              </Typography>
              {profile_pending ? (
                <Chip label="Profile Pending Approval" color="warning" sx={{ mt: 1 }} />
              ) : (
                <Chip label="Profile Verified" color="success" sx={{ mt: 1 }} />
              )}
            </Box>
          </Box>
          <Box mt={2}>
            <Button
              variant="contained"
              color="info"
              onClick={() => navigate('/profile')}
              sx={{ mr: 2 }}
            >
              View Profile
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => navigate('/profile/edit')}
            >
              Update Profile
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <EventNote sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Attendance
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/attendance')}
                fullWidth
              >
                Mark Attendance
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Person sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Leave Requests
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/leaves')}
                fullWidth
              >
                Apply Leave
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmployeeDashboard;
