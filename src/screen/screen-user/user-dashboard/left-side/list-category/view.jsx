import { Box, Paper, Typography, TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import { dark, light, primary } from "../../../../../theme/color";


const subcategories = ["Indonesian", "Italian", "Korean", "American", "Chinese", "Japanese"];
const categories = ["Food", "Drink", "Dessert"];

export default function ListCategoryDashboard() {
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeSubCategory, setActiveSubCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setActiveSubCategory(null);
    };

    const handleSubCategoryClick = (subcategory) => {
        setActiveSubCategory(subcategory);
    };

    const handleCategoryChange = (event) => {
        handleCategoryClick(event.target.value);
    };

    const handleSubCategoryChange = (event) => {
        handleSubCategoryClick(event.target.value);
    };

    // Calculate the number of subcategories
    const itemCount = subcategories.length;

    return (
        <>
            {/* Main Categories */}
            <Box
                sx={{
                    display: { xs: 'none', sm: 'flex' },
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                    marginBottom: 4,
                }}
            >
                {categories.map((category) => (
                    <Paper
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        sx={{
                            padding: 2,
                            paddingTop: 1,
                            paddingBottom: 1,
                            width: {
                                xs: '100%',
                                sm: '30%',
                            },
                            borderRadius: 5,
                            cursor: 'pointer',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            backgroundColor: activeCategory === category ? primary[100] : light[100],
                            transition: 'all 0.3s',
                            '&:hover': {
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            },
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                color: activeCategory === category ? light[100] : primary[100],
                                fontSize: { xs: 'body2', sm: 'h6' },
                            }}
                        >
                            {category}
                        </Typography>
                    </Paper>
                ))}
            </Box>

            {/* Dropdown for mobile view */}
            <Box sx={{ display: { xs: 'block', sm: 'none' }, marginBottom: 2 }}>
                <TextField
                    select
                    label="Category"
                    value={activeCategory || ''}
                    onChange={handleCategoryChange}
                    fullWidth
                    sx={{
                        '& .MuiInputLabel-root': { color: primary[100] },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: primary[100] },
                            '&:hover fieldset': { borderColor: primary[100] },
                            '&.Mui-focused fieldset': { borderColor: primary[100] },
                        },
                        '& .MuiSelect-icon': { color: primary[100] },
                        '& .MuiSelect-select': { color: primary[100] },
                    }}
                >
                    {categories.map((category) => (
                        <MenuItem
                            key={category}
                            value={category}
                            sx={{
                                backgroundColor: dark[600],
                                '&.Mui-selected': {
                                    backgroundColor: primary[100],
                                    color: dark[600],
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: primary[100],
                                    color: dark[600],
                                },
                            }}
                        >
                            {category}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            {/* Subcategories (desktop view) */}
            <Box
                sx={{
                    display: { xs: 'none', sm: 'flex' },
                    overflowX: 'auto',
                    gap: 2,
                    paddingBottom: 2,
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}
            >
                {subcategories.map((subcategory) => (
                    <Paper
                        key={subcategory}
                        onClick={() => handleSubCategoryClick(subcategory)}
                        sx={{
                            padding: 2,
                            paddingTop: 1,
                            paddingBottom: 1,
                            minWidth: '120px',
                            borderRadius: 5,
                            cursor: 'pointer',
                            textAlign: 'center',
                            backgroundColor: activeSubCategory === subcategory ? primary[100] : dark[600],
                            transition: 'all 0.3s',
                            '&:hover': {
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            },
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 'bold',
                                color: activeSubCategory === subcategory ? light[100] : dark[500],
                                fontSize: { xs: 'body2', sm: 'subtitle1' }, // Responsive font size
                            }}
                        >
                            {subcategory}
                        </Typography>
                    </Paper>
                ))}
            </Box>

            {/* Dropdown for subcategories on mobile view */}
            {activeCategory && (
                <Box sx={{ display: { xs: 'block', sm: 'none' }, marginBottom: 2 }}>
                    <TextField
                        select
                        label="Subcategory"
                        value={activeSubCategory || ''}
                        onChange={handleSubCategoryChange}
                        fullWidth
                        sx={{
                            '& .MuiInputLabel-root': { color: primary[100] },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: primary[100] },
                                '&:hover fieldset': { borderColor: primary[100] },
                                '&.Mui-focused fieldset': { borderColor: primary[100] }, // This is correct
                            },
                            '& .MuiSelect-icon': { color: primary[100] },
                        }}
                    >
                        {subcategories.map((subcategory) => (
                            <MenuItem
                                key={subcategory}
                                value={subcategory}
                                sx={{
                                    backgroundColor: dark[600],
                                    '&.Mui-selected': {
                                        backgroundColor: primary[100],
                                        color: dark[600],
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: primary[100],
                                        color: dark[600],
                                    },
                                }}
                            >
                                {subcategory}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

            )}

            {/* Text below subcategories */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginY: 2,
                    paddingX: 2,
                    textAlign: { xs: 'center', sm: 'left' },
                }}
            >
                <Typography sx={{ fontWeight: 'bold', fontSize: { xs: 20, sm: 28 } }}>
                    {activeCategory
                        ? `Category: ${activeCategory} ${activeSubCategory ? `| Subcategory: ${activeSubCategory}` : ''}`
                        : "Select a Category"}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: 16, sm: 20 } }}>
                    {`Items: ${itemCount}`}
                </Typography>
            </Box>
        </>
    );
}
