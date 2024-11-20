import * as React from 'react';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { primary, dark } from '../../../theme/color';

export default function LeftDataCRUD() {
    const [focused, setFocused] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // State untuk menyimpan gambar yang diunggah

    // Fungsi untuk menangani file yang di-drag-and-drop
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    }, []);

    // Menggunakan useDropzone dari react-dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png, image/jpg', // Tipe file yang diterima
        multiple: false, // Hanya menerima satu file
    });

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxheight: '90vh',
                padding: 2,
                '& .MuiTextField-root': {
                    m: 1,
                    width: 'calc(100% - 16px)',
                },
                '& > .MuiBox-root': {
                    marginTop: 2,
                },
            }}
        >
            <Box
                {...getRootProps()}
                sx={{
                    height: 400,
                    border: '2px dashed',
                    borderColor: isDragActive ? primary[100] : 'blue',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: selectedImage ? 'transparent' : dark[200], // Mengubah background menjadi transparan jika ada gambar
                    cursor: 'pointer',
                    transition: 'border 0.3s ease-in-out',
                }}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : selectedImage ? (
                    <Box
                        component="img"
                        src={selectedImage}
                        alt="Preview"
                        sx={{
                            maxHeight: '400px', // Batas tinggi maksimum
                            width: 'auto', // Menjaga proporsi lebar
                            objectFit: 'contain', // Menjaga gambar agar tidak terpotong
                        }}
                    />
                ) : (
                    <p>Drag 'n' drop an image here, or click to select one</p>
                )}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
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
                        marginTop: 2,
                        marginLeft: 2,
                    }}
                />
            </Box>
        </Box>
    );
}
