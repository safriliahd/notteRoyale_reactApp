import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../../store/endpoint/endpoint-user/product/view"; // Sesuaikan dengan path Anda

export default function LeftSideProductDetail({ setProduct }) {
    const { id } = useParams(); // Mengambil ID produk dari parameter URL
    const [product, setLocalProduct] = useState(null); // State untuk menyimpan detail produk lokal
    const [error, setError] = useState(null); // State untuk menangani pesan error jika ada

    // Fetch data produk berdasarkan ID
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProductById(id);
                console.log("Fetched Product Data:", productData); // Log data produk yang didapat
                const processedProduct = {
                    ...productData,
                    averageRating: productData.averageRating || 0, // Default rating jika tidak ada
                };
                setLocalProduct(processedProduct); // Menyimpan data lokal
                setProduct(processedProduct); // Meneruskan data ke komponen induk
            } catch (err) {
                setError(err.message); // Menangkap error jika ada
            }
        };
        fetchProduct();
    }, [id, setProduct]);
    

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    if (!product) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    // Tampilkan detail produk jika data sudah tersedia
    return (
        <Box sx={{ padding: 2, maxWidth: 800, margin: "auto", display: "flex", gap: 3 }}>
            {/* Gambar Produk */}
            <Box sx={{ flex: "1 1 50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img
                    src={product.photo || "https://via.placeholder.com/400"}
                    alt={product.name}
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: 8,
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                />
            </Box>

            {/* Detail Produk */}
            <Box sx={{ flex: "1 1 50%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Typography variant="h5" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Category:</strong> {product.category}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Price:</strong> Rp {product.price.toLocaleString("id-ID")}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Rating:</strong> {product.averageRating}/5
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Description:</strong> {product.description}
                </Typography>
            </Box>
        </Box>
    );
}
