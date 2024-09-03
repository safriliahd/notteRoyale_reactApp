// export default function DataProductCRUD () {
//     return (
//         <h1>test crud</h1>
//     )
// }

import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { light } from '../../theme/color';
import LeftDataCRUD from './view-left/view';

const Container = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr', // Two equal-width columns
  gap: theme.spacing(2), // Space between columns
  padding: theme.spacing(2), // Padding around the container
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr', // Stack columns on smaller screens
  },
}));

const Column = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: light[100],
  border: `1px solid ${theme.palette.divider}`,
}));

export default function DataProductCRUD() {
  return (
    <Container>
      <Column sx={{padding: 0}}>
        <Typography variant="h6">Left Column</Typography>
        <Box  sx={{ flex: 1, width: '100%', padding: 0 }}>
        <LeftDataCRUD />
        </Box>
      </Column>
      <Column sx={{padding: 0}}> 
        <Typography variant="h6">Right Column</Typography>
        <Box  sx={{ flex: 1, width: '100%', padding: 0 }}>
        </Box>
      </Column>
    </Container>
  );
}
