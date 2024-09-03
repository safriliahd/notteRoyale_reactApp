import * as React from 'react';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { createSvgIcon } from '@mui/material/utils';
import { primary } from '../../../theme/color'; // Import warna primary
import { useNavigate } from 'react-router-dom';

// Ikon Plus
const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus',
);

export default function IconButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/data-product-edit');
  }

  return (
    <Stack direction="row" spacing={3}>
      {/* Tombol dengan ikon Plus dan teks "Add" */}
      <Button
        variant="contained"
        startIcon={<PlusIcon />}
        onClick={handleClick}
        sx={{
          backgroundColor: primary[100], // Warna primary dari file color.js
          borderRadius: 15,
            fontWeight: 'bold',
            fontSize: 16,
          '&:hover': {
            backgroundColor: primary[200], // Warna tetap sama saat hover
          },
        }}
      >
        Add
      </Button>
    </Stack>
  );
}
