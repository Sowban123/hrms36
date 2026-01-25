// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { employeeAPI } from '../../services/api';
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Paper,
//   Grid,
//   MenuItem,
//   CircularProgress,
// } from '@mui/material';

// const CreateEmployee = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     first_name: '',
//     last_name: '',
//     email: '',
//     department: '',
//     designation: '',
//     date_of_joining: '',
//     basic_salary: '',
//   });
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadDropdowns();
//   }, []);

//   const loadDropdowns = async () => {
//     try {
//       const [deptRes, desigRes] = await Promise.all([
//         employeeAPI.getDepartments(),
//         employeeAPI.getDesignations(),
//       ]);
//       setDepartments(deptRes.data);
//       setDesignations(desigRes.data);
//     } catch (error) {
//       console.error('Error loading dropdowns:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await employeeAPI.create(formData);
//       alert('Employee created successfully!');
//       navigate('/employees');
//     } catch (error) {
//       alert('Error creating employee: ' + (error.response?.data?.error || 'Unknown error'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Paper elevation={3} sx={{ p: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Create Employee
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Username"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 required
//                 type="password"
//                 label="Password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="First Name"
//                 name="first_name"
//                 value={formData.first_name}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Last Name"
//                 name="last_name"
//                 value={formData.last_name}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 type="email"
//                 label="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 required
//                 select
//                 label="Department"
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//               >
//                 {departments.map((dept) => (
//                   <MenuItem key={dept.id} value={dept.id}>
//                     {dept.name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 required
//                 select
//                 label="Designation"
//                 name="designation"
//                 value={formData.designation}
//                 onChange={handleChange}
//               >
//                 {designations.map((desig) => (
//                   <MenuItem key={desig.id} value={desig.id}>
//                     {desig.name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 required
//                 type="date"
//                 label="Date of Joining"
//                 name="date_of_joining"
//                 value={formData.date_of_joining}
//                 onChange={handleChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 required
//                 type="number"
//                 label="Basic Salary"
//                 name="basic_salary"
//                 value={formData.basic_salary}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Box display="flex" gap={2}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   disabled={loading}
//                 >
//                   {loading ? <CircularProgress size={24} /> : 'Create Employee'}
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   onClick={() => navigate('/employees')}
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default CreateEmployee;






import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [deptRes, desigRes] = await Promise.all([
          employeeAPI.getDepartments(),
          employeeAPI.getDesignations(),
        ]);
        setDepartments(deptRes.data);
        setDesignations(desigRes.data);
      } catch (err) {
        alert("Failed to load departments/designations");
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    // Convert department and designation to integer if not empty
    if ((name === "department" || name === "designation") && value !== "") {
      value = parseInt(value, 10);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await employeeAPI.create(formData);
      alert("Employee created successfully");
      navigate("/employees");
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data) ||
        "Employee creation failed";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create Employee
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
              />
            </Grid>

            <Grid columns={12} md={6}>
              <TextField
                fullWidth
                required
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={22} />
                  ) : (
                    "Create Employee"
                  )}
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => navigate("/employees")}
                >
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

export default CreateEmployee;