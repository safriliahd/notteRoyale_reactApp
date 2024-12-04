import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../../../store/endpoint/endpoint-user/product/view"; // Sesuaikan dengan path Anda
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"; // Gunakan ChevronLeftIcon

export default function LeftSideProductDetail({ setProduct }) {
    const { id } = useParams(); // Mengambil ID produk dari parameter URL
    const [product, setLocalProduct] = useState(null); // State untuk menyimpan detail produk lokal
    const [error, setError] = useState(null); // State untuk menangani pesan error jika ada
    const navigate = useNavigate(); // Hook untuk navigasi

    // Fetch data produk berdasarkan ID
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProductById(id);
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

    // Tampilkan pesan error jika terjadi kesalahan
    if (error) {
        return (
            <Typography variant="h6" color="error">
                {error}
            </Typography>
        );
    }

    // Tampilkan loading jika data belum tersedia
    if (!product) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    // Tampilkan detail produk jika data sudah tersedia
    return (
        <Box sx={{ padding: 2, maxWidth: 800, margin: "auto", display: "flex", gap: 5, maxHeight: '100vh', }}>
            {/* Box untuk gambar dan tombol Back */}
            <Box sx={{ position: "relative", flex: "1 1 50%", display: "flex", justifyContent: "center", alignItems: "flex-start", marginTop: 3 }}>
                {/* Gambar Produk */}
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
            <Box sx={{ flex: "1 1 50%", display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: 3 }}>
                <Typography variant="h5" gutterBottom 
                    sx={{
                        fontSize: 38,
                        fontWeight: 'bold',
                    }}
                >
                    {product.name}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ marginBottom: 2 }}>
                    <strong>Category:</strong> {product.category}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ marginBottom: 2 }}>
                    <strong>Price:</strong> Rp {product.price.toLocaleString("id-ID")}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ marginBottom: 2 }}>
                    <strong>Rating:</strong> {product.averageRating}/5
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                    <strong>Description:</strong> {product.description}
                </Typography>
            </Box>
        </Box>
    );
}
