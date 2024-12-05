import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { primary, light } from '../../../theme/color';

export default function BigButton({ onClick }) {
    return (
        <Stack spacing={2} direction="row">
            <Button 
             onClick={onClick}
                sx={{
                    color: light[100], 
                    backgroundColor: primary[100], 
                    width: '100%', 
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: primary[200], 
                      boxShadow: "none",
                      color: light[200],
                    },
                    marginBottom: 5
                }}
            >
                Order Now
            </Button>
        </Stack>
    )
}
