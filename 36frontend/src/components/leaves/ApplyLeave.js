import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { leaveAPI } from '../../services/api';
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

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    leave_type: '',
    start_date: '',
    end_date: '',
    reason: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const leaveTypes = [
    { value: 'CL', label: 'Casual Leave' },
    { value: 'SL', label: 'Sick Leave' },
    { value: 'PL', label: 'Privilege Leave' },
    { value: 'LOP', label: 'Loss of Pay' },
  ];

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
      await leaveAPI.apply(formData);
      alert('Leave applied successfully!');
      navigate('/leaves');
    } catch (error) {
      alert('Error applying leave: ' + (error.response?.data?.error || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Apply Leave
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid columns={12} md={6}>
              <TextField
                fullWidth
                required
                select
                label="Leave Type"
                name="leave_type"
                value={formData.leave_type}
                onChange={handleChange}
              >
                {leaveTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid columns={12} md={6}></Grid>

            <Grid columns={12} md={6}>
              <TextField
                fullWidth
                required
                type="date"
                label="Start Date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid columns={12} md={6}>
              <TextField
                fullWidth
                required
                type="date"
                label="End Date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid columns={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={4}
                label="Reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={2}>
                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Apply Leave'}
                </Button>
                <Button variant="outlined" onClick={() => navigate('/leaves')}>
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

export default ApplyLeave;
