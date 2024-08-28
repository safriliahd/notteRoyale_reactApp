import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { danger, primary, succes } from '../../../../theme/color';
import { Box, Grid, Typography } from '@mui/material';

const data = [
    { value: 15, label: 'Food', color: succes[100] },
    { value: 15, label: 'Drink', color: primary[100] },
    { value: 15, label: 'Desert', color: danger[100] },
];

const size = {
    width: 400,
    height: 200,
};

export default function IncomeChartsData() {
    return (
        <Box sx={{
            textAlign: 'center',
            width: '100%',
            height: 'auto',
            padding: 2,
            display: 'flex', 
            justifyContent: 'center'
        }}>

            <PieChart
                spacing={2}
                series={[
                    {
                        arcLabelMinAngle: 45,
                        data,
                        colorField: 'color',
                        innerRadius: 80,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -90,
                    },
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                        fontWeight: 'bold',             
                    },
                    paddingRight: 2,
                }}
                {...size}
            />
        </Box>

    );
}
