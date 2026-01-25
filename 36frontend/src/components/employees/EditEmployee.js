import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { employeeAPI } from "../../services/api";
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
} from "@mui/material";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    department: "",
    designation: "",
    date_of_joining: "",
    basic_salary: "",
  });
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [deptRes, desigRes, empRes] = await Promise.all([
          employeeAPI.getDepartments(),
          employeeAPI.getDesignations(),
          employeeAPI.getList(),
        ]);
        setDepartments(deptRes.data);
        setDesignations(desigRes.data);
        const emp = empRes.data.find((e) => String(e.id) === String(id));
        if (emp) {
          setFormData({
            username: emp.user?.username || "",
            first_name: emp.user?.first_name || "",
            last_name: emp.user?.last_name || "",
            email: emp.user?.email || "",
            department: emp.department || "",
            designation: emp.designation || "",
            date_of_joining: emp.date_of_joining || "",
            basic_salary: emp.basic_salary || "",
          });
        }
      } catch (err) {
        alert("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if ((name === "department" || name === "designation") && value !== "") {
      value = parseInt(value, 10);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await employeeAPI.update(id, formData);
      alert("Employee updated successfully");
      navigate("/employees");
    } catch (err) {
      alert("Failed to update employee");
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
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Edit Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid columns={12} md={6}>
              <TextField
                fullWidth
                required
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid columns={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid columns={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid columns={12} md={6}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid columns={12} md={6}>
              <TextField
                fullWidth
                required
                select
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid columns={12} md={6}>
              <TextField
                fullWidth
                required
                select
                label="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              >
                {designations.map((desig) => (
                  <MenuItem key={desig.id} value={desig.id}>
                    {desig.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid columns={12} md={6}>
              <TextField
                fullWidth
                required
                type="date"
                label="Date of Joining"
                name="date_of_joining"
                value={formData.date_of_joining}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Basic Salary"
                name="basic_salary"
                value={formData.basic_salary}
                onChange={handleChange}
              />
            </Grid>
            <Grid columns={12}>
              <Box display="flex" gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving}
                >
                  {saving ? <CircularProgress size={22} /> : "Save Changes"}
                </Button>
                <Button variant="outlined" onClick={() => navigate("/employees")}>Cancel</Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditEmployee;
