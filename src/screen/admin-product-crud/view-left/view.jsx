import * as React from 'react';
import axios from 'axios';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { primary, dark } from '../../../theme/color';

export default function LeftDataCRUD() {
    const [focused, setFocused] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // State untuk menyimpan gambar yang diunggah
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'food', // default category is food
        subcategory: 'Indonesian Food', // default subcategory for food
        description: '',
        image: null,
    });
    const [loading, setLoading] = useState(false); // Untuk melacak status upload

    // Fungsi untuk menangani file yang di-drag-and-drop
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // Menyimpan URL gambar
                setFormData(prevData => ({ ...prevData, image: file })); // Menyimpan file gambar ke form data
            };
            if (file) reader.readAsDataURL(file); // Membaca gambar sebagai URL
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    return (
        <Box
            // Form submission handler
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh',
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
            {/* Image Upload Box */}
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
                    <p>Drop the files here...</p>
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

            {/* Input Fields */}

            {/* Description Input */}
            <TextField
                id="product-description"
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
                sx={{ marginTop: 2 }}
            />
        </Box>
    );
}
