import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getProductsByCategory } from "../../../../../store/endpoint/endpoint-user/product/view";
import { dark, light, primary } from "../../../../../theme/color";
import ListProductDashboard from "../list-poduct/view";

const subcategoriesMap = {
    Food: ["Indonesian Food", "Italian Food", "Korean Food", "American Food", "Chinese Food", "Japanese Food"],
    Drink: ["Hot", "Cold"],
    Dessert: ["Hot", "Cold"],
};

const categories = ["Food", "Drink", "Dessert"];

export default function ListCategoryDashboard() {
    const [activeCategory, setActiveCategory] = useState("Food");
    const [activeSubCategory, setActiveSubCategory] = useState("Indonesian Food"); 
    const [products, setProducts] = useState([]);

    const fetchProducts = async (category, subCategory) => {
        try {
            const data = await getProductsByCategory(category, subCategory);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error.message);
        }
    };

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setActiveSubCategory(null);
    };

    const handleSubCategoryClick = (category, subcategory) => {
        setActiveSubCategory(subcategory);
        fetchProducts(category, subcategory);
    };

    const subcategories = activeCategory ? subcategoriesMap[activeCategory] : [];

    useEffect(() => {
        fetchProducts(activeCategory, activeSubCategory);
    }, [activeCategory, activeSubCategory]);

    return (
        <>
            <Box
                sx={{
                    display: { xs: 'none', sm: 'flex' },
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                    marginBottom: 4,
                    marginLeft: 2,
                    marginRight: 4,
                }}
            >
                {categories.map((category) => (
                    <Paper
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        sx={{
                            padding: 2,
                            borderRadius: 5,
                            cursor: 'pointer',
                            backgroundColor: activeCategory === category ? primary[100] : light[100],
                            transition: 'all 0.3s',
                            '&:hover': {
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            },
                            flexGrow: 1,
                            minWidth: 270,
                            maxWidth: 270,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                color: activeCategory === category ? light[100] : primary[100],
                            }}
                        >
                            {category}
                        </Typography>
                    </Paper>
                ))}
            </Box>

            {activeCategory && subcategories.length > 0 && (
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        marginLeft: 1,
                        marginRight: 4,
                    }}
                >
                    {subcategories.map((subcategory) => (
                        <Paper
                            key={subcategory}
                            onClick={() => handleSubCategoryClick(activeCategory, subcategory)}
                            sx={{
                                padding: 2,
                                minWidth: '120px',
                                borderRadius: 5,
                                cursor: 'pointer',
                                backgroundColor: activeSubCategory === subcategory ? primary[100] : dark[600],
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
                                }}
                            >
                                {subcategory}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            )}

            {activeCategory && activeSubCategory && (
                <ListProductDashboard category={activeCategory} subCategory={activeSubCategory} />
            )}
        </>
    );
}
