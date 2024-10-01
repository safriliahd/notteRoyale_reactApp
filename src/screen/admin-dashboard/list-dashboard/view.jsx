import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { light, primary } from '../../../theme/color';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: primary[100],
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 5,
    borderRadius: 15,
}));

const ListData = [
    { id: 1, title: 'Order Recieved', value: '5' },
    { id: 2, title: 'Sales Amount', value: '10' },
    { id: 3, title: 'User', value: '15' }
];

export default function ListDashboardAdmin () {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                {ListData.map((item) => (
                    <Grid xs={2} sm={4} md={4} key={item.id}>
                        <Item>
                            <Typography sx={{
                                fontSize: 24,
                                textAlign: 'left',
                                color: light[100],
                                fontWeight: 'bold',
                            }}
                                gutterBottom
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    fontSize: 32,
                                    textAlign: 'right',
                                    color: light[100],
                                    fontWeight: 'bold',
                                }}
                            >
                                {item.value}
                            </Typography>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
