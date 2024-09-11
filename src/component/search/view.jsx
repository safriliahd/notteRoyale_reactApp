import { styled, alpha } from '@mui/material/styles';    
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { dark, primary } from '../../theme/color';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '50px', 
    backgroundColor: dark[300], 
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.75),
    },
    marginLeft: 'auto',
    width: '100%',
    maxWidth: '400px',
    height: '40px', 
    display: 'flex', 
    alignItems: 'center', 
    [theme.breakpoints.up('sm')]: {
        width: '100%', 
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '300px', 
    },
    [theme.breakpoints.down('xs')]: {
        maxWidth: '200px', 
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1), 
    height: '100%',
    position: 'absolute',
    right: '0', 
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: primary[100],
    fontSize: '1rem', 
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.common.white, 
    width: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(5),
    height: '100%', 
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 0), 
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '100%', 
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
