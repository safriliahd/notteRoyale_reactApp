import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { primary, dark } from '../../../theme/color';
import { Box } from '@mui/system';
import Notte from "../../../../public/background.jpg";

export default function LeftDataCRUD() {
    const [focused, setFocused] = useState(false);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh', // Pastikan Box utama mengisi tinggi viewport
                padding: 2,
                '& .MuiTextField-root': {
                    m: 1,
                    width: 'calc(100% - 16px)', // Mengurangi lebar TextField untuk memberikan padding di sisi kiri
                },
                '& > .MuiBox-root': {
                    // Menjaga TextField sejajar dengan CardMedia
                    marginTop: 2,
                },
            }}
        >
            <CardMedia
                sx={{ height: 400 }}
                image={Notte}
                title="foto product"
            />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start', // Menyelaraskan kotak deskripsi dengan batas kiri
                }}
            >
                <TextField
                    id="outlined-multiline-static"
                    label="Deskripsi"
                    multiline
                    fullWidth
                    rows={4}
                    placeholder="Input your description"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: focused ? primary[100] : 'initial',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: focused ? primary[100] : 'initial',
                            },
                            '&:hover fieldset': {
                                borderColor: focused ? primary[100] : 'initial',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: primary[100],
                            },
                            '& input': {
                                color: focused ? primary[100] : 'initial',
                            },
                            '& .MuiInputBase-input': {
                                color: focused ? dark[300] : 'initial',
                            },
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: focused ? dark[500] : 'initial',
                        },
                        marginTop: 2, // Jarak antara gambar dan kotak deskripsi
                        marginLeft: 2, // Menggeser kotak deskripsi sedikit ke kiri
                    }}
                />
            </Box>
        </Box>
    );
}
