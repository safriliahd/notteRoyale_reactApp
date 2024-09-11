import React from 'react';
import { Container, Paper, Typography, Button, Box, Grid, TextField, MenuItem } from '@mui/material';
import { dark } from '../../../../theme/color';
import BigButton from '../../../../component/button-component/fulfill-button/view'

export default function RightSideDashboard() {
    const currencies = [
        {
            value: 'vvip',
            label: 'A1',
        },
        {
            value: 'vip',
            label: 'B1',
        },
        {
            value: 'reguler',
            label: 'C1',
        },
        {
            value: 'outdoor',
            label: 'O1',
        },
    ];

    return (
        <Container maxWidth="sm" sx={{
            mt: 4, mb: 4,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }}>
            <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={8}>
                    <Typography 
                    variant="body1" 
                    sx={{ 
                        fontWeight: 'bold',
                        fontSize: 24,
                        color: dark[400],
                    }}
                    >
                        Curent Order
                    </Typography>
                    <Typography 
                    variant="body1" 
                    sx={{ 
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                    >
                        #00001
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Table"
                        defaultValue="vvip"
                        variant="standard"
                        fullWidth
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            <Box sx={{ flexGrow: 1 }} />

            <Box container  sx={{ mt: 2 }}>
                <BigButton />
            </Box>
        </Container>
    );
}
