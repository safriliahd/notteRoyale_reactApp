import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { primary, light } from '../../../theme/color';
import { useState } from 'react';


const Item = styled(Paper)(({ theme, active }) => ({
  backgroundColor: active ? primary[100] : light[100], 
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: active ? light[100] : primary[100], 
  borderRadius: 15,
  cursor: 'pointer', 
  fontWeight: 'bold',
  fontSize:24,
}));

export default function OrderListButton() {
  const [activeGrid, setActiveGrid] = React.useState(null); 

  const handleClick = (index) => {
    setActiveGrid(index); 
  };
  return (
    <Box sx={{ width: '100%', marginTop: 2 }}>
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={4}>
        <Item active={activeGrid === 1} onClick={() => handleClick(1)}>On Progress</Item>
      </Grid>
      <Grid item xs={4}>
        <Item active={activeGrid === 2} onClick={() => handleClick(2)}>Done</Item>
      </Grid>
    </Grid>
  </Box>
  );
}
