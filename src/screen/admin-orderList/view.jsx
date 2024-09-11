import * as React from "react";
import { Typography, Stack, Box } from "@mui/material";
import SearchUi from "../../component/search/view";
import { light, primary } from "../../theme/color"; // Pastikan ini adalah warna primary yang diimpor dari tema
import OrderListButton from "./orderList-button/view";
import OrderListData from "./orderList-table/view";

export default function ProductListAdmin() {
    return (
        <Box sx={{ marginTop: 3 }}>
            <OrderListButton />

            <Box sx={{ padding: 2, backgroundColor: light[100], marginTop: 5, borderRadius: 5 }}>
                {/* Stack untuk baris pertama */}
                <Stack direction="column" spacing={2}>
                    {/* Baris pertama dengan Food List, SearchUi, dan IconButton */}
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        {/* Teks "Food List" dengan warna primary */}
                        <Typography component="div" sx={{ color: primary[100], fontWeight: 'bold', fontSize: 32 }}>
                            On Progress
                        </Typography>

                        {/* Stack untuk SearchUi dan IconButton */}
                        <Stack direction="row" alignItems="center" spacing={2}>
                            {/* Komponen SearchUi */}
                            <SearchUi />

                        </Stack>
                    </Stack>

                    {/* Baris kedua dengan ProductListData */}
                    <Box>
                    <OrderListData />
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}
