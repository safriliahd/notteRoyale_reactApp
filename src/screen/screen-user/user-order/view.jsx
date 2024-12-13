import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  List,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getUserOrders } from "../../../store/endpoint/order/view"; // Import fungsi HTTP
import OrderList from "./order-list"; // Import komponen daftar order
import { dark, primary } from "../../../theme/color";

export default function OrderUser() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        console.log("Orders fetched:", data);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error("Error in fetchOrders:", err); // Debug error
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const filteredOrders =
    selectedTab === 0
      ? orders.filter((order) => order.status === "in-progress")
      : orders.filter((order) => order.status === "done");

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography
        align="center"
        gutterBottom
        sx={{
          fontSize: 32,
          fontWeight: "bold",
          color: dark[300],
          mb: 3,
        }}
      >
        My Orders
      </Typography>

      {/* Tabs untuk kategori */}
      <Tabs
        value={selectedTab}
        onChange={handleChangeTab}
        centered
        TabIndicatorProps={{ style: { backgroundColor: primary[100] } }}
        sx={{
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: 22,
            fontWeight: 600,
            color: "#888",
          },
          "& .Mui-selected": {
            color: dark[300],
          },
        }}
      >
        <Tab label="On-Process" />
        <Tab label="Done" />
      </Tabs>

      {/* Konten berdasarkan kategori */}
      <Box sx={{ mt: 2 }}>
        {filteredOrders.length > 0 ? (
          <OrderList orders={filteredOrders} />
        ) : (
          <Typography align="center" sx={{ mt: 4, color: "#888" }}>
            No orders found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
