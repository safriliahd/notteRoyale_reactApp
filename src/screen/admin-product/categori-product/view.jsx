import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { primary, light } from '../../../theme/color'; // Impor warna primary
import { useState } from 'react';


const Item = styled(Paper)(({ theme, active }) => ({
  backgroundColor: active ? primary[100] : light[100], // Gunakan warna primary[100]
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: active ? light[100] : primary[100], // Pastikan ini menggunakan warna yang kontras dengan background
  borderRadius: '8px',
  cursor: 'pointer', 
}));

export default function CategoryProduct() {
  const [activeGrid, setActiveGrid] = React.useState(null); // State untuk melacak grid yang aktif

  const handleClick = (index) => {
    setActiveGrid(index); // Ubah grid aktif sesuai dengan yang di-klik
  };
  return (
    <Box sx={{ width: '100%', marginTop: 2 }}>
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={4}>
        <Item active={activeGrid === 1} onClick={() => handleClick(1)}>Food</Item>
      </Grid>
      <Grid item xs={4}>
        <Item active={activeGrid === 2} onClick={() => handleClick(2)}>Drink</Item>
      </Grid>
      <Grid item xs={4}>
        <Item active={activeGrid === 3} onClick={() => handleClick(3)}>Desert</Item>
      </Grid>
    </Grid>
  </Box>
  );
}
