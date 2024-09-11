import { Box, Typography, Paper } from "@mui/material";
import ListProductDashboard from "./list-poduct/view";
import { Container } from "@mui/system";
import SearchUi from "../../../../component/search/view";
import { useState } from "react";
import { light, primary } from "../../../../theme/color";
import ListCategoryDashboard from "./list-category/view";


export default function LeftSideDashboard() {

    return (
        <Box sx={{ padding: 0, backgroundColor: 'none', }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: 4,
                }}
            >
                <Box
                    sx={{
                        maxWidth: 600,
                    }}
                >
                    <SearchUi />
                </Box>
            </Box>

            {/* Category options */}
            <ListCategoryDashboard />
            
            {/* List Product */}
            <ListProductDashboard />
        </Box>
    );
}
