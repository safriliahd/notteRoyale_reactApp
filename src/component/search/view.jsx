import { styled, alpha } from '@mui/material/styles';    
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { primary } from '../../theme/color';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '50px', // Menggunakan borderRadius yang lebih melengkung
    backgroundColor: theme.palette.common.black, // Background is black
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.85), // Slightly lighter black on hover
    },
    marginLeft: 'auto', // Align to the right
    width: '100%',
    maxWidth: '200px', // Maximum width for larger screens
    height: '40px', // Tinggi komponen pencarian
    display: 'flex', // Menggunakan flexbox untuk mengatur layout
    alignItems: 'center', // Vertikal center
    [theme.breakpoints.up('sm')]: {
        width: '100%', // Lebar tetap untuk layar besar
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '300px', // Lebar maksimum untuk layar kecil
    },
    [theme.breakpoints.down('xs')]: {
        maxWidth: '200px', // Lebar maksimum untuk layar sangat kecil
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1), // Mengurangi padding untuk memperkecil ruang sekitar ikon
    height: '100%',
    position: 'absolute',
    right: '0', // Memindahkan ikon ke sebelah kanan
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: primary[100], // Set icon color to yellow
    fontSize: '1rem', // Mengatur ukuran ikon lebih kecil
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.common.white, // Set text color to white
    width: '100%',
    paddingLeft: theme.spacing(2), // Memberikan padding kiri untuk memberi ruang bagi ikon
    paddingRight: theme.spacing(5), // Memberikan padding kanan untuk memberi ruang bagi ikon
    height: '100%', // Mengatur tinggi input agar sesuai dengan komponen pencarian
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 0), // Mengatur padding input
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '100%', // Lebar input 100% dari komponen pencarian
        },
    },  
}));

export default function SearchUi() {
    return (
        <Search>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
        </Search>
    );
}
