import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardAPI } from '../services/api';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import EmployeeDashboard from './dashboards/EmployeeDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import HRDashboard from './dashboards/HRDashboard';
import ManagerDashboard from './dashboards/ManagerDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await dashboardAPI.getDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
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

  if (!dashboardData) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Error loading dashboard
        </Typography>
      </Container>
    );
  }

  // Render appropriate dashboard based on role
  if (dashboardData.role === 'MANAGER') {
    return <ManagerDashboard data={dashboardData} />;
  }

  if (dashboardData.role === 'EMPLOYEE') {
    return <EmployeeDashboard data={dashboardData} />;
  }

  if (dashboardData.role === 'ADMIN') {
    return <AdminDashboard data={dashboardData} />;
  }

  if (dashboardData.role === 'HR') {
    return <HRDashboard data={dashboardData} />;
  }

  return (
    <Container>
      <Typography variant="h6">Welcome to HRMS</Typography>
    </Container>
  );
};

export default Dashboard;
