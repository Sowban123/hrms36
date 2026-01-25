import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Dashboard,
  People,
  EventNote,
  AccountBalance,
  Assessment,
  Menu as MenuIcon,
} from '@mui/icons-material';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          HRMS
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" onClick={() => navigate('/dashboard')} startIcon={<Dashboard />}>
            Dashboard
          </Button>

          {(user.role === 'ADMIN' || user.role === 'HR') && (
            <>
              <Button color="inherit" onClick={() => navigate('/employees')} startIcon={<People />}>
                Employees
              </Button>
              <Button color="inherit" onClick={() => navigate('/employees/pending-profiles')} startIcon={<People />}>
                Pending Profiles
              </Button>
              <Button color="inherit" onClick={() => navigate('/leaves/admin')} startIcon={<EventNote />}>
                Leaves
              </Button>
              <Button color="inherit" onClick={() => navigate('/payroll')} startIcon={<AccountBalance />}>
                Payroll
              </Button>
            </>
          )}

          {user.role === 'EMPLOYEE' && (
            <>
              <Button color="inherit" onClick={() => navigate('/attendance')} startIcon={<EventNote />}>
                Attendance
              </Button>
              <Button color="inherit" onClick={() => navigate('/leaves')} startIcon={<EventNote />}>
                Leaves
              </Button>
              <Button color="inherit" onClick={() => navigate('/profile')} startIcon={<People />}>
                My Profile
              </Button>
              <Button color="inherit" onClick={() => navigate('/profile/edit')} startIcon={<People />}>
                Edit Profile
              </Button>
              <Button color="inherit" onClick={() => navigate('/my-payroll')} startIcon={<AccountBalance />}>
                My Payroll
              </Button>
            </>
          )}

          {user.role === 'MANAGER' && (
            <>
              <Button color="inherit" onClick={() => navigate('/attendance/team')} startIcon={<People />}>
                Team Attendance
              </Button>
              <Button color="inherit" onClick={() => navigate('/leaves/manager')} startIcon={<EventNote />}>
                Team Leaves
              </Button>
            </>
          )}
        </Box>

        <Typography variant="body1" sx={{ mr: 2 }}>
          {user.username} ({user.role})
        </Typography>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
