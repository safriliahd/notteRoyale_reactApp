import React, { useState } from 'react';
import { Container, Typography, Button, Box, Grid, IconButton, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import BigButton from '../../../../component/button-component/fulfill-button/view';
import OutlineButton from '../../../../component/button-component/outline-button/view';

export default function RightSideProduct() {
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    return (
        <Container maxWidth="sm" sx={{
            mt: 4, mb: 4,
            display: 'flex',
            flexDirection: 'column',
            height: "80vh",
        }}>
            <Typography variant="h5" gutterBottom>
                Order Details
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Quantity:
                    </Typography>

                    <Box display="flex" alignItems="center">
                        <IconButton
                            onClick={handleDecrease}
                            aria-label="decrease quantity"
                            sx={{ bgcolor: 'white', border: '1px solid #ccc', borderRadius: '4px', ml: 1 }}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <Typography variant="body1" sx={{ mx: 1 }}>
                            {quantity}
                        </Typography>
                        <IconButton
                            onClick={handleIncrease}
                            aria-label="increase quantity"
                            sx={{ bgcolor: 'white', border: '1px solid #ccc', borderRadius: '4px', ml: 1 }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Box>


                {/* Notes Section */}
                <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold' }}>
                    Notes
                </Typography>
                <TextField
                    variant="outlined"
                    multiline
                    rows={4}
                    value={notes}
                    onChange={handleNotesChange}
                    sx={{ mt: 1, bgcolor: 'white', borderRadius: '4px', width: '100%' }}
                    placeholder="Add your notes here..."
                />
            </Box>
           

            {/* Spacer to push the button to the bottom with space in between */}
            <Box sx={{ flexGrow: 1 }} />

            <Typography variant="body1" sx={{fontWeight: 'bold' }}>
                Sub Total: Rp.{quantity * 100}
            </Typography>

            {/* Order Button Section */}
            <Box sx={{marginTop: 2}}>
            <BigButton/>
            </Box>
            <Box  sx={{marginTop: 2}}>
            <OutlineButton />
            </Box>
          
        </Container>
    );
}
