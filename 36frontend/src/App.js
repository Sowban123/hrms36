
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
// Employee Components
import EmployeeList from './components/employees/EmployeeList';
import CreateEmployee from './components/employees/CreateEmployee';
import EditEmployee from './components/employees/EditEmployee';
import PendingProfiles from './components/employees/PendingProfiles';
import MyProfile from './components/employees/MyProfile';
import EmployeeProfileView from './components/employees/EmployeeProfileView';
import EmployeeProfileEdit from './components/employees/EmployeeProfileEdit';
// Attendance Components
import Attendance from './components/attendance/Attendance';
// Leave Components
import LeaveList from './components/leaves/LeaveList';
import ApplyLeave from './components/leaves/ApplyLeave';
import AdminLeaveList from './components/leaves/AdminLeaveList';
// Payroll Components
import PayrollList from './components/payroll/PayrollList';
import GeneratePayroll from './components/payroll/GeneratePayroll';
import MyPayroll from './components/payroll/MyPayroll';
import PayrollDetail from './components/payroll/PayrollDetail';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Employee Routes (Admin/HR) */}
            <Route
              path="/employees"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'HR']}>
                  <EmployeeList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees/create"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'HR']}>
                  <CreateEmployee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees/edit/:id"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'HR']}>
                  <EditEmployee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees/pending-profiles"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'HR']}>
                  <PendingProfiles />
                </ProtectedRoute>
              }
            />

            {/* Employee Self Profile (EMPLOYEE) */}

            {/* New Employee Profile View/Edit Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE']}>
                  <EmployeeProfileView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE']}>
                  <EmployeeProfileEdit />
                </ProtectedRoute>
              }
            />

            {/* Employee Self Payroll (EMPLOYEE) */}
            <Route
              path="/my-payroll"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE']}>
                  <MyPayroll />
                </ProtectedRoute>
              }
            />

            {/* Attendance Routes */}
            <Route
              path="/attendance"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE']}>
                  <Attendance />
                </ProtectedRoute>
              }
            />

            {/* Leave Routes */}
            <Route
              path="/leaves"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE']}>
                  <LeaveList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaves/apply"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE']}>
                  <ApplyLeave />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaves/admin"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'HR']}>
                  <AdminLeaveList />
                </ProtectedRoute>
              }
            />

            {/* Payroll Routes */}
            <Route
              path="/payroll"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'HR']}>
                  <PayrollList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payroll/generate"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'HR']}>
                  <GeneratePayroll />
                </ProtectedRoute>
              }
            />
            {/* Payroll Detail Route */}
            <Route
              path="/payroll/detail/:id"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'HR', 'EMPLOYEE']}>
                  <PayrollDetail />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

