import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Notte from "../../../../public/background.jpg"
import { TextField } from '@mui/material';
import { useState } from 'react';
import { primary } from '../../../theme/color';


export default function LeftDataCRUD() {
    const [focused, setFocused] = React.useState(false);

    return (
        <>
            <Card sx={{ flex: 1, width: '100%' }}>
                <CardMedia
                    sx={{ height: 400 }}
                    image={Notte}
                    title="foto product"
                />
            </Card>
            {/* <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                fullWidth
                rows={4}
                defaultValue="Default Value"
                sx={{
                    marginTop: 5
                }}
            /> */}
            <TextField
                id="outlined-multiline-static"
                label="Deskripsi"
                multiline
                fullWidth
                rows={4}
                placeholder="input your description product"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                sx={{
                    marginTop: 5,
                    '& .MuiInputLabel-root': {
                        color: focused ? primary[100] : 'initial',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: focused ? primary[100] : 'initial',
                        },
                        '&:hover fieldset': {
                            borderColor: focused ? primary[100] : 'initial',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: primary[100],
                        },
                    },
                }}
            />

        </>
    );
}
