import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { primary, light } from '../../../theme/color';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme, active }) => ({
  backgroundColor: active ? primary[100] : light[100],
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: active ? light[100] : primary[100],
  borderRadius: 20, // Capsule shape
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1.2rem',  
  boxShadow: 5,
  transition: 'background-color 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',  
    padding: theme.spacing(1),  
  },
}));

const ListData = [
  { id: 1, title: 'Food' },
  { id: 2, title: 'Drink' },
  { id: 3, title: 'Dessert' }
];

export default function CategoryProduct() {
  // Initialize with index 0 to make "Food" active by default
  const [activeGrid, setActiveGrid] = React.useState(0);

  const handleClick = (index) => {
    setActiveGrid(index);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 0 }}>
      <Grid 
        container 
        spacing={{ xs: 0, sm: 2, md: 3 }}  // No spacing on mobile, spacing on larger screens
        columns={{ xs: 1, sm: 8, md: 12 }} 
        justifyContent="center"
      >
        {ListData.map((item, index) => (
          <Grid 
            item 
            xs={12} 
            sm={4} 
            md={4} 
            key={item.id} 
            sx={{ display: 'flex', justifyContent: 'center' }}  // Ensure items are centered
          >
            <Box sx={{ maxWidth: 600, width: '100%' }}> {/* Constrain width */}
              <Item
                active={activeGrid === index}
                onClick={() => handleClick(index)}
              >
                <Typography
                  sx={{
                    fontSize: 24,
                    textAlign: 'center',
                    color: activeGrid === index ? light[100] : primary[100], 
                    fontWeight: 'bold',
                  }}
                  gutterBottom
                >
                  {item.title}
                </Typography>
              </Item>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
