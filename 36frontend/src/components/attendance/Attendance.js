import React, { useEffect, useState } from 'react';
import { attendanceAPI } from '../../services/api';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  CircularProgress,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

const Attendance = () => {
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const response = await attendanceAPI.getToday();
      setAttendance(response.data);
    } catch (error) {
      console.error('Error loading attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      await attendanceAPI.checkIn();
      loadAttendance();
      alert('Checked in successfully!');
    } catch (error) {
      alert(error.response?.data?.error || 'Error checking in');
    }
  };

  const handleCheckOut = async () => {
    try {
      await attendanceAPI.checkOut();
      loadAttendance();
      alert('Checked out successfully!');
    } catch (error) {
      alert(error.response?.data?.error || 'Error checking out');
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
        Mark Attendance
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Today: {attendance?.date || new Date().toLocaleDateString()}
          </Typography>

          <Box my={3}>
            {attendance?.check_in ? (
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <CheckCircle color="success" />
                <Typography>
                  Checked In: {new Date(attendance.check_in).toLocaleTimeString()}
                </Typography>
              </Box>
            ) : (
              <Chip label="Not Checked In" color="error" />
            )}

            {attendance?.check_out ? (
              <Box display="flex" alignItems="center" gap={2}>
                <CheckCircle color="success" />
                <Typography>
                  Checked Out: {new Date(attendance.check_out).toLocaleTimeString()}
                </Typography>
              </Box>
            ) : attendance?.check_in ? (
              <Chip label="Not Checked Out" color="warning" sx={{ mt: 1 }} />
            ) : null}

            {attendance?.total_hours > 0 && (
              <Typography variant="h6" color="primary" mt={2}>
                Total Hours: {attendance.total_hours}
              </Typography>
            )}
          </Box>

          <Box display="flex" gap={2}>
            {!attendance?.check_in && (
              <Button variant="contained" color="success" onClick={handleCheckIn}>
                Check In
              </Button>
            )}

            {attendance?.check_in && !attendance?.check_out && (
              <Button variant="contained" color="error" onClick={handleCheckOut}>
                Check Out
              </Button>
            )}

            {attendance?.check_out && (
              <Chip label="Attendance Complete for Today" color="success" />
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Attendance;
