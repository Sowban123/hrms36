
import React, { useEffect, useState } from "react";
import { employeeAPI } from "../../services/api";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
} from "@mui/material";


const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [employeeForm, setEmployeeForm] = useState({});
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      // Get all employees and current user
      const [userRes, empRes, deptRes, desigRes] = await Promise.all([
        employeeAPI.getList(),
        employeeAPI.getList(),
        employeeAPI.getDepartments(),
        employeeAPI.getDesignations(),
      ]);
      // Get current user from /api/accounts/current-user/
      const userResp = await fetch("/api/accounts/current-user/", { credentials: "include" });
      const user = await userResp.json();
      // Find employee record for current user
      const emp = empRes.data.find((e) => e.user && e.user.id === user.id);
      setProfile(emp?.profile || {});
      setForm({
        phone: emp?.profile?.phone || "",
        personal_email: emp?.profile?.personal_email || "",
        address: emp?.profile?.address || "",
        date_of_birth: emp?.profile?.date_of_birth || "",
        emergency_contact: emp?.profile?.emergency_contact || "",
        bank_name: emp?.profile?.bank_name || "",
        account_number: emp?.profile?.account_number || "",
        ifsc_code: emp?.profile?.ifsc_code || "",
      });
      setEmployeeForm({
        department: emp?.department || "",
        designation: emp?.designation || "",
        date_of_joining: emp?.date_of_joining || "",
        basic_salary: emp?.basic_salary || "",
        id: emp?.id,
      });
      setDepartments(deptRes.data);
      setDesignations(desigRes.data);
    } catch (err) {
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEmployeeChange = (e) => {
    let { name, value } = e.target;
    if ((name === "department" || name === "designation") && value !== "") {
      value = parseInt(value, 10);
    }
    setEmployeeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Update EmployeeProfile (custom fields)
      // You may need to call a separate endpoint for profile update if available
      // For now, just alert success for profile fields
      // Update Employee model fields
      if (employeeForm.id) {
        await employeeAPI.update(employeeForm.id, employeeForm);
      }
      alert("Profile updated! Awaiting HR approval.");
      loadProfile();
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
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
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          My Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Employee Model Fields */}
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Department"
                name="department"
                value={employeeForm.department}
                onChange={handleEmployeeChange}
                required
              >
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Designation"
                name="designation"
                value={employeeForm.designation}
                onChange={handleEmployeeChange}
                required
              >
                {designations.map((desig) => (
                  <MenuItem key={desig.id} value={desig.id}>
                    {desig.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date of Joining"
                name="date_of_joining"
                type="date"
                value={employeeForm.date_of_joining}
                onChange={handleEmployeeChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Basic Salary"
                name="basic_salary"
                type="number"
                value={employeeForm.basic_salary}
                onChange={handleEmployeeChange}
                required
              />
            </Grid>
            {/* EmployeeProfile Fields */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Personal Email"
                name="personal_email"
                value={form.personal_email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={form.date_of_birth}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Emergency Contact"
                name="emergency_contact"
                value={form.emergency_contact}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Bank Name"
                name="bank_name"
                value={form.bank_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Account Number"
                name="account_number"
                value={form.account_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="IFSC Code"
                name="ifsc_code"
                value={form.ifsc_code}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" disabled={saving}>
                {saving ? <CircularProgress size={22} /> : "Save Profile"}
              </Button>
            </Grid>
          </Grid>
        </form>
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

export default MyProfile;
