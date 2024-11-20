import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { light } from '../../theme/color';
import LeftDataCRUD from './view-left/view';
import RightDataCRUD from './view-right/view';

const Container = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr', // Two equal-width columns
  gap: theme.spacing(2), // Space between columns
  padding: theme.spacing(2), // Padding around the container
  height: '90vh', // Limit height to viewport height
  overflow: 'hidden', // Disable scrolling
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr', // Stack columns on smaller screens
    height: 'auto', // Allow scroll on smaller screens
    overflow: 'auto', // Allow scrolling on smaller screens
  },
}));

const Column = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: light[100],
  border: `1px solid ${theme.palette.divider}`,
  height: '100%', // Ensure column takes full height
  overflow: 'hidden', // Disable scrolling inside each column
}));

export default function DataProductCRUD() {
  return (
    <Container>
      <Column sx={{ padding: 0 }}>
        <Box sx={{ flex: 1, width: '100%', padding: 0 }}>
          <LeftDataCRUD />
        </Box>
      </Column>
      <Column sx={{ padding: 0 }}>
        <Box sx={{ flex: 1, width: '100%', padding: 0 }}>
          <RightDataCRUD />
        </Box>
      </Column>
    </Container>
  );
}
