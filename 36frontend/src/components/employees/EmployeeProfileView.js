import React, { useEffect, useState } from "react";
import { employeeAPI } from "../../services/api";
import { Container, Typography, Box, Paper, CircularProgress, Grid } from "@mui/material";

const EmployeeProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const [userRes, empRes] = await Promise.all([
        employeeAPI.getList(),
        employeeAPI.getList(),
      ]);
      const userResp = await fetch("/api/accounts/current-user/", { credentials: "include" });
      const user = await userResp.json();
      const emp = empRes.data.find((e) => e.user && e.user.id === user.id);
      setProfile(emp?.profile || {});
    } catch (err) {
      alert("Failed to load profile");
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

  if (!profile) {
    return <Typography>No profile data found.</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          My Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}><b>Phone:</b> {profile.phone}</Grid>
          <Grid item xs={12} md={6}><b>Personal Email:</b> {profile.personal_email}</Grid>
          <Grid item xs={12}><b>Address:</b> {profile.address}</Grid>
          <Grid item xs={12} md={6}><b>Date of Birth:</b> {profile.date_of_birth}</Grid>
          <Grid item xs={12} md={6}><b>Emergency Contact:</b> {profile.emergency_contact}</Grid>
          <Grid item xs={12} md={4}><b>Bank Name:</b> {profile.bank_name}</Grid>
          <Grid item xs={12} md={4}><b>Account Number:</b> {profile.account_number}</Grid>
          <Grid item xs={12} md={4}><b>IFSC Code:</b> {profile.ifsc_code}</Grid>
        </Grid>
        {profile?.verified === false && (
          <Typography color="warning.main" sx={{ mt: 2 }}>
            Awaiting HR approval.
          </Typography>
        )}
        {profile?.verified === true && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            Profile approved by HR.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default EmployeeProfileView;
