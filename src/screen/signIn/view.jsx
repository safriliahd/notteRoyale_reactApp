import React from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import backgroundLogin from "../../../public/background.jpg";
import { dark, primary } from '../../theme/color';

export default function PageSignIn() {
  const theme = useTheme();

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* Left side: Image */}
      <Grid
        item
        xs={false}
        sm={8}
        md={8}
        sx={{
          backgroundImage: `url(${backgroundLogin})`, // Replace with your image URL
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Right side: Sign-in form */}
      <Grid
        item
        xs={12}
        sm={4}
        md={4}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing(4),
          backgroundColor: dark[500],
        }}
      >
        <Typography  
        sx={{
          color: primary[100],
          fontSize: 32,
          fontWeight: 'bold',
        }}>
          Sign In
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
