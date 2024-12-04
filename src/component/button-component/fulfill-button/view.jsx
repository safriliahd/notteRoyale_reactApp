import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { primary, light } from '../../../theme/color';

export default function BigButton({ onClick }) {
    return (
        <Stack spacing={2} direction="row">
            <Button 
             onClick={onClick}
                sx={{
                    color: light[100], // Mengatur warna teks tombol dari warna light
                    backgroundColor: primary[100], // Akses warna dari file color.js
                    width: '100%', // Mengatur lebar tombol
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: primary[100], // Latar belakang tetap primary[100] saat di-hover
                      boxShadow: "none",
                    },
                    marginBottom: 5
                }}
            >
                Order Now
            </Button>
        </Stack>
    )
}
