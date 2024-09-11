import React from 'react';
import { Container, Paper, Typography, Button, Box, Grid } from '@mui/material';

export default function RightSideProduct() {
    return (
        <Container maxWidth="sm" sx={{
            mt: 4, mb: 4, 
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }}>
            <Typography variant="h5" gutterBottom>
                    Order Details
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">
                        Product Name: Awesome Widget
                    </Typography>
                    <Typography variant="body1">
                        Quantity: 3
                    </Typography>
                    <Typography variant="body1">
                        Price: $100
                    </Typography>
                    <Typography variant="body1">
                        Total: $300
                    </Typography>
                </Box>

                {/* Spacer to push the button to the bottom with space in between */}
                <Box sx={{ flexGrow: 1, height: "50vh" }} />

                {/* Order Button Section */}
                <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" size="large">
                        Order
                    </Button>
                </Grid>
            {/* Order Details Section */}

        </Container>
    );
}
