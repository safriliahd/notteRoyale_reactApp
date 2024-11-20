import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { primary, dark } from '../../../theme/color';
import StarIcon from '@mui/icons-material/Star';

const currencies = [
    { value: 'indonesian food', label: 'indonesian food' },
    { value: 'italian food', label: 'italian food' },
    { value: 'korean food', label: 'korean food' },
    { value: 'american food', label: 'american food' },
    { value: 'chinesse food', label: 'chinesse food' },
    { value: 'japanesse food', label: 'japanesse food' },
];

export default function RightDataCRUD() {
    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh', // Batasi tinggi maksimum menjadi 100vh
                padding: 2,
                '& .MuiTextField-root': {
                    m: 1,
                    width: '100%',
                },
                position: 'relative' // Untuk positioning tombol di dalam Box
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                required
                id="outlined-required"
                label="Nama"
                defaultValue="Hello World"
                fullWidth
                sx={{
                    marginBottom: 3,
                    '& .MuiInputLabel-root': {
                        color: primary[100],
                        fontWeight: 'bold',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: primary[100], // Warna border default
                        },
                        '&:hover fieldset': {
                            borderColor: primary[100], // Warna border saat hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: primary[100], // Warna border saat fokus
                        },
                        '& input': {
                            color: 'black', // Warna teks input
                        },
                    },
                }}
            />
            <TextField
                required
                id="outlined-required"
                label="Price"
                defaultValue="Hello World"
                fullWidth
                sx={{
                    marginBottom: 3,
                    '& .MuiInputLabel-root': {
                        color: primary[100],
                        fontWeight: 'bold',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: primary[100], // Warna border default
                        },
                        '&:hover fieldset': {
                            borderColor: primary[100], // Warna border saat hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: primary[100], // Warna border saat fokus
                        },
                        '& input': {
                            color: 'black', // Warna teks input
                        },
                    },
                }}
            />
            <TextField
                id="outlined-select-currency"
                select
                label="Category"
                defaultValue="EUR"
                fullWidth
                sx={{
                    marginBottom: 3,
                    '& .MuiInputLabel-root': {
                        color: primary[100],
                        fontWeight: 'bold',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: primary[100], // Warna border default
                        },
                        '&:hover fieldset': {
                            borderColor: primary[100], // Warna border saat hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: primary[100], // Warna border saat fokus
                        },
                        '& input': {
                            color: 'black', // Warna teks input
                        },
                    },
                }}
            >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                disabled
                id="outlined-disabled"
                label="Rating"
                defaultValue=""
                sx={{
                    marginBottom: 3,
                    '& .MuiInputLabel-root': {
                        color: primary[100],
                        fontWeight: 'bold',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: primary[100], // Warna border default
                        },
                        '&:hover fieldset': {
                            borderColor: primary[100], // Warna border saat hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: primary[100], // Warna border saat fokus
                        },
                        '& input': {
                            color: 'black', // Warna teks input
                        },
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                ml: 1, // Spasi antara input dan ikon
                            }}
                        >
                            <StarIcon sx={{ color: primary[100] }} />
                        </Box>
                    ),
                }}
            />

            <Box sx={{ flexGrow: 1 }} />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    justifyContent: 'flex-end', // Tempatkan tombol di bagian bawah
                }}
            >
                <Button
                    variant="contained"
                    type="button"
                    sx={{
                        backgroundColor: primary[100], // Ganti warna tombol sesuai primary[100]
                        boxShadow: 'none',
                        borderRadius: '20px', // Membuat sudut tombol lebih melengkung
                        '&:hover': {
                            backgroundColor: primary[200], // Menjaga warna saat hover
                        },
                        alignSelf: 'flex-end', // Posisikan tombol di kanan
                        fontWeight: 'bold', // Sama dengan font-weight label
                        color: 'white', // Warna teks tombol
                        fontSize: '16px' // Ukuran font yang sesuai
                    }}
                >
                    Save
                </Button>
            </Box>
        </Box>
    );
}
