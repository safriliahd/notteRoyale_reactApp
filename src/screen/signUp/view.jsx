import React, { useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import backgroundLogin from "../../../public/background.jpg";
import { dark, light, primary } from "../../theme/color";
import { register } from "../../store/endpoint/auth/signUp/view"

export default function PageSignUp() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");


    const handleSignUpClick = async (e) => {
        e.preventDefault(); // Prevent page refresh
        setError(""); // Reset error state sebelum submit

        try {
            const result = await register(name, email, password); 
            console.log(result); 
            navigate('/login'); 
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <Grid container component="main" sx={{ height: "100vh" }}>
                {/* Left side: Image */}
                <Grid
                    item
                    xs={false}
                    sm={8}
                    md={8}
                    sx={{
                        backgroundImage: `url(${backgroundLogin})`,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
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
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: theme.spacing(4), 
                        backgroundColor: dark[500],
                    }}
                >
                    <Typography
                        sx={{
                            color: primary[100],
                            fontSize: 32,
                            fontWeight: "bold",
                        }}
                    >
                        Sign Up
                    </Typography>

                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}

                    <Box component="form" noValidate sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            fullWidth
                            name="name"
                            id="name"
                            label="Name"
                            value={ name }
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name"
                            sx={{
                                "& .MuiInputLabel-root": { color: dark[100] },
                                "& .MuiInputLabel-root.Mui-focused": { color: dark[100] },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: dark[100],
                                    },
                                    "&:hover fieldset": {
                                        borderColor: dark[100],
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: dark[200],
                                    },
                                    "& input": {
                                        color: dark[100],
                                        backgroundColor: "transparent",
                                    },
                                    "& input:-webkit-autofill": {
                                        WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                                        WebkitTextFillColor: dark[100],
                                        transition: "background-color 5000s ease-in-out 0s",
                                    },
                                },
                            }}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            name="email"
                            id="email"
                            label="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            sx={{
                                "& .MuiInputLabel-root": { color: dark[100] },
                                "& .MuiInputLabel-root.Mui-focused": { color: dark[100] },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: dark[100],
                                    },
                                    "&:hover fieldset": {
                                        borderColor: dark[100],
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: dark[200],
                                    },
                                    "& input": {
                                        color: dark[100],
                                        backgroundColor: "transparent",
                                    },
                                    "& input:-webkit-autofill": {
                                        WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                                        WebkitTextFillColor: dark[100],
                                        transition: "background-color 5000s ease-in-out 0s",
                                    },
                                },
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            id="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            autoComplete="current-password"
                            sx={{
                                "& .MuiInputLabel-root": { color: dark[100] },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: dark[100],
                                    },
                                    "&:hover fieldset": {
                                        borderColor: dark[100],
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: dark[200],
                                    },
                                    "& input": {
                                        color: dark[100],
                                        backgroundColor: "transparent",
                                    },
                                },
                            }}
                        />
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            mt={3}
                            mb={2}
                        >
                            <Button
                                type="button" // Ubah ini dari "submit" menjadi "button"
                                onClick={handleSignUpClick} // Pastikan ini ada
                                variant="contained"
                                sx={{
                                    width: 125,
                                    backgroundColor: primary[100],
                                    color: light[200],
                                    borderRadius: 10,
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        color: light[100],
                                        backgroundColor: primary[200],
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                            <Typography
                                sx={{
                                    color: light[100],
                                    mr: 1, // Margin kanan untuk memberi jarak antara teks dan tautan
                                }}
                            >
                                Don’t have an account yet?
                            </Typography>
                            <Typography
                                onClick={handleSignUpClick}
                                sx={{
                                    color: primary[100],
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        color: primary[200],
                                    },
                                }}
                            >
                                Sign In
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}