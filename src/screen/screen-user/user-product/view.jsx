import { Box, Grid, Paper } from "@mui/material";
import RightSideProduct from "./right-side/view";
import LeftSideProductDetail from "./left-side/view";
import React, { useState } from "react";

export default function PageUserProduct() {
    const [product, setProduct] = useState(null); // Menyimpan data produk

    return (
        <Box sx={{ marginTop: 3, padding: 0 }}>
            <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ paddingLeft: 0 }}>
                {/* Left Side */}
                <Grid item xs={4} sm={8} md={8}>
                    <Paper sx={{ backgroundColor: "white", height: "100%", borderRadius: 5 }}>
                        <LeftSideProductDetail setProduct={setProduct} />
                    </Paper>
                </Grid>

                {/* Right Side */}
                <Grid item xs={4} sm={8} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Paper sx={{ backgroundColor: "white", height: "100%", borderRadius: 5 }}>
                        <RightSideProduct product={product} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
