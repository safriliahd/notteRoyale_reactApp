import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getProductsByCategory } from "../../../../../store/endpoint/endpoint-user/product/view"; // Endpoint API untuk fetch data
import { dark, light, primary } from "../../../../../theme/color";
import ListProductDashboard from "../list-poduct/view";

// Subkategori berdasarkan kategori
const subcategoriesMap = {
    Food: ["Indonesian Food", "Italian Food", "Korean Food", "American Food", "Chinese Food", "Japanese Food"],
    Drink: ["Hot", "Cold"],
    Dessert: ["Hot", "Cold"],
};

const categories = ["Food", "Drink", "Dessert"];

export default function ListCategoryDashboard() {
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeSubCategory, setActiveSubCategory] = useState(null);
    const [products, setProducts] = useState([]);

    // Fetch produk berdasarkan kategori dan subkategori
    const fetchProducts = async (category, subCategory) => {
        try {
            const data = await getProductsByCategory(category, subCategory);
            setProducts(data); // Simpan data produk
        } catch (error) {
            console.error("Error fetching products:", error.message);
        }
    };

    // Handle klik kategori
    const handleCategoryClick = (category) => {
        setActiveCategory(category); // Set active category saat kategori diklik
        setActiveSubCategory(null); // Reset subkategori saat kategori berubah
    };

    // Handle klik subkategori
    const handleSubCategoryClick = (category, subcategory) => {
        setActiveSubCategory(subcategory); // Set active subcategory saat subkategori diklik
        fetchProducts(category, subcategory); // Fetch produk sesuai kategori dan subkategori
    };

    // Subkategori untuk kategori yang dipilih
    const subcategories = activeCategory ? subcategoriesMap[activeCategory] : [];

    // Memanggil fetchProducts setiap kali kategori atau subkategori berubah
    useEffect(() => {
        if (activeCategory && activeSubCategory) {
            fetchProducts(activeCategory, activeSubCategory);
        }
    }, [activeCategory, activeSubCategory]);

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
                            borderRadius: 5,
                            cursor: 'pointer',
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
                            }}
                        >
                            {category}
                        </Typography>
                    </Paper>
                ))}
            </Box>

            {/* Subcategories */}
            {activeCategory && subcategories.length > 0 && (
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    {subcategories.map((subcategory) => (
                        <Paper
                            key={subcategory}
                            onClick={() => handleSubCategoryClick(activeCategory, subcategory)} // Menambahkan kategori ke parameter
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

            {/* Display Produk */}
             {/* Tampilkan produk sesuai kategori dan subkategori */}
             {activeCategory && activeSubCategory && (
                <ListProductDashboard category={activeCategory} subCategory={activeSubCategory} />
            )}
        </>
    );
}
