import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { primary } from '../../../theme/color'; 

export default function OutlineButton() {
  return (
    <Stack spacing={2} direction="row">
      <Button 
        variant="outlined" 
        sx={{
          color: primary[100], // Mengatur warna teks tombol dari warna primary
          borderColor: primary[100], // Mengatur warna outline dari primary
          width: '100%', // Membuat tombol lebih panjang
          marginTop: 5, // Memberikan jarak margin top
          "&:hover": {
            backgroundColor: 'transparent', // Warna background tetap transparan saat hover
            borderColor: primary[100], // Garis border tetap primary[100] saat hover
          },
        }}
      >
        Add to Cart
      </Button>
    </Stack>
  );
}
