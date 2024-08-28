import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from '@mui/material';
import { danger, primary } from '../../../../theme/color';


export default function DailySalesCharts() {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
      }}
    >
      <LineChart
        xAxis={[{ data: [9, 10, 11, 12, 13, 14] }]}
        series={[
          {
            data: [2, 6, 4, 9, 15, 5],
            color: primary[100],
          },
        ]}
        height={400}
      />
    </Box>
  );
}
