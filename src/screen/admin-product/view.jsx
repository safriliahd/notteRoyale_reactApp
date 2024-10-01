import * as React from "react";
import { Typography, Stack, Box } from "@mui/material";
import CategoryProduct from "./categori-product/view";
import IconButton from "./add-button/view";
import SearchUi from "../../component/search/view";
import { light, primary } from "../../theme/color";
import ProductListData from "./data-product/view";

export default function ProductListAdmin() {
  return (
    <Box sx={{ marginTop: 3, paddingX: { xs: 1, sm: 2, md: 3 } }}>
      <CategoryProduct />

      <Box sx={{ padding: 2, backgroundColor: light[100], marginTop: 2, borderRadius: 5 }}>
        {/* Stack untuk baris pertama */}
        <Stack direction="column" spacing={2}>
          {/* Baris pertama dengan Food List, SearchUi, dan IconButton */}
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            alignItems={{ xs: 'flex-start', md: 'center' }} 
            justifyContent="space-between"
            spacing={{ xs: 2, md: 0 }}
          >
            {/* Teks "Food List" */}
            <Typography component="div" sx={{ color: primary[100], fontWeight: 'bold', fontSize: { xs: 24, md: 32 } }}>
              Food List
            </Typography>

            {/* Stack untuk SearchUi dan IconButton */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <SearchUi />
              <IconButton />
            </Stack>
          </Stack>

          {/* Baris kedua dengan ProductListData */}
          <Box>
            <ProductListData />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
