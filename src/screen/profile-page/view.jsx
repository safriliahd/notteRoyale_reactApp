import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid,
} from '@mui/material';
import { yellow } from '@mui/material/colors';
import { dark, light, primary } from '../../theme/color';
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
        sx={{
          width: '100%',
          maxWidth: 1500,
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Grid
          container
          spacing={1}
          sx={{
            display: 'flex',
            justifyContent: 'space-between', // Space between left and right sides
          }}
        >
          {/* Left Side - Avatar and Options */}
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: light[100],
              borderRadius: 2,
              padding: 2,
              boxShadow: 2,
              marginRight: 1
            }}
          >
            <Avatar
              sx={{
                width: 170,
                height: 170,
                bgcolor: primary[100],
                color: 'white',
                fontSize: 50,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              {photo ? (
                <img
                  src={photo}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
              ) : (
                'A'
              )}
            </Avatar>
            <Button
              variant="outlined"
              sx={{
                marginTop: 2,
                borderColor: primary[100],
                    color: primary[100],
                    '&:hover': { borderColor: primary[200], color: primary[200]},
              }}
              onClick={() => console.log('Add profile photo functionality here')}
            >
              Add Photo
            </Button>
            <Button
              variant="outlined"
              sx={{
                marginTop: 2,
                borderColor: primary[100],
                    color: primary[100],
                    '&:hover': { borderColor: primary[200], color: primary[200], },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Grid>

          {/* Right Side - Form Inputs for Details */}
          <Grid
            item
            xs={12}
            sm={8}
            sx={{
              backgroundColor: light[100],
              borderRadius: 2,
              padding: 2,
              boxShadow: 2,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 5, marginTop: 3, }}>
              Profile Information
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: dark[300], fontWeight: 'bold' }}>
                  Name
                </Typography>
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
                <Typography variant="body1" sx={{ color: dark[300], fontWeight: 'bold' }}>
                  Email
                </Typography>
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
                <Typography variant="body1" sx={{ color: dark[300], fontWeight: 'bold' }}>
                  Phone Number
                </Typography>
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
                <Typography variant="body1" sx={{ color: dark[300], fontWeight: 'bold' }}>
                  Password
                </Typography>
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
                <Typography variant="body1" sx={{ color: dark[300], fontWeight: 'bold', marginBottom: 1 }}>
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
                      control={
                        <Radio
                          sx={{
                            color: 'grey', // Warna default saat tidak dipilih
                            '&.Mui-checked': {
                              color: yellow[700], // Warna saat dipilih
                            },
                          }}
                        />
                      }
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={
                        <Radio
                          sx={{
                            color: 'grey', // Warna default saat tidak dipilih
                            '&.Mui-checked': {
                              color: yellow[700], // Warna saat dipilih
                            },
                          }}
                        />
                      }
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>

              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, marginBottom: 1 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    width: '48%',
                    borderColor: primary[100],
                    color: primary[100],
                    '&:hover': { borderColor: primary[200], color: primary[200], },
                  }}
                >
                  Discard Changes
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '48%',
                    backgroundColor: primary[100],
                    '&:hover': { backgroundColor: primary[200] },
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
