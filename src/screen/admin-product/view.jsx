import * as React from "react";
import { Card, CardContent, Typography, Stack } from "@mui/material";
import DataProductList from "./data-product/view";
import CategoryProduct from "./categori-product/view";

export default function ProductListAdmin() {
  return (
    <>
    <CategoryProduct />
    <DataProductList />
    </>
  );
}
