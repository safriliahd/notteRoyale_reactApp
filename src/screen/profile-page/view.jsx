import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, Paper, TextField, Radio, RadioGroup, FormControlLabel, FormControl, Grid } from '@mui/material';
import { yellow } from '@mui/material/colors';
import { light, primary } from '../../theme/color';
import { useNavigate } from 'react-router-dom';

export default function PageProfile() {
  const [photo, setPhoto] = useState(null); // For adding profile photo
  const [selectedGender, setSelectedGender] = useState('male');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    navigate('/login');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '100vh',
        padding: 2,
      }}
    >
      <Box
        elevation={0} // Remove shadow from the main box
        sx={{
          width: '100%',
          maxWidth: 1000,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Grid container spacing={4} >
          {/* Left side - Avatar and options */}
          <Grid
            item
            xs={12} sm={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: light[100], // Light color for the left side background
              borderRadius: 2, // Border radius for left side
              padding: 2,
              boxShadow: 2, // Add shadow to the left side
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: primary[100], // Dark yellow for the avatar background
                color: 'white',
                fontSize: 50,
              }}
            >
              {photo ? (
                <img src={photo} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              ) : (
                'A'
              )}
            </Avatar>
            <Button
              variant="outlined"
              sx={{
                marginTop: 2,
                backgroundColor: yellow[700], // Button background
                '&:hover': { backgroundColor: yellow[800] },
              }}
              onClick={() => console.log('Add profile photo functionality here')}
            >
              Add Photo
            </Button>
            <Button
              variant="outlined"
              sx={{
                marginTop: 2,
                backgroundColor: yellow[700], // Button background
                '&:hover': { backgroundColor: yellow[800] },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Grid>

          {/* Right side - Form inputs for details */}
          <Grid
            item
            xs={12} sm={8}
            sx={{
              backgroundColor: light[100], // Light color for the right side background
              borderRadius: 2, // Border radius for right side
              padding: 2,
              boxShadow: 2, // Add shadow to the right side
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Profile Information
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: yellow[700] }}>Name</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  defaultValue="John Doe"
                  sx={{
                    backgroundColor: light[100],
                    marginBottom: 2,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: yellow[700] }}>Email</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  defaultValue="john.doe@example.com"
                  sx={{
                    backgroundColor: light[100],
                    marginBottom: 2,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: yellow[700] }}>Phone Number</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Add your phone number"
                  sx={{
                    backgroundColor: light[100],
                    marginBottom: 2,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: yellow[700] }}>Password</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter new password"
                  sx={{
                    backgroundColor: light[100],
                    marginBottom: 2,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: yellow[700], marginBottom: 1 }}>
                  Gender
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    value={selectedGender}
                    onChange={handleGenderChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio sx={{ color: yellow[700] }} />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio sx={{ color: yellow[700] }} />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    width: '48%',
                    backgroundColor: yellow[700], // Button background
                    '&:hover': { backgroundColor: yellow[800] },
                  }}
                >
                  Discard Changes
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '48%',
                    backgroundColor: yellow[700], // Button background
                    '&:hover': { backgroundColor: yellow[800] },
                  }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
