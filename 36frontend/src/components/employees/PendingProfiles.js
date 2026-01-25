import React, { useEffect, useState } from "react";
import { employeeAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

const PendingProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    setLoading(true);
    try {
      const res = await employeeAPI.getPendingProfiles();
      // Ensure profiles is always an array
      const data = Array.isArray(res.data) ? res.data : (res.data.results || []);
      setProfiles(data);
    } catch (err) {
      setProfiles([]); // fallback to empty array on error
      alert("Failed to load pending profiles");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (profileId) => {
    if (!window.confirm("Approve this profile?")) return;
    try {
      await employeeAPI.approveProfile(profileId);
      loadProfiles();
    } catch (err) {
      alert("Failed to approve profile");
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
        Pending Employee Profiles
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell>{profile.employee_name}</TableCell>
                <TableCell>{profile.employee_username}</TableCell>
                <TableCell>{profile.personal_email}</TableCell>
                <TableCell>{profile.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleApprove(profile.id)}
                  >
                    Approve
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PendingProfiles;