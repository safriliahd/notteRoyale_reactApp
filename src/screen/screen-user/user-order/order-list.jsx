import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

function OrderList({ orders }) {
  return (
    <List>
      {orders.map((order) => (
        <ListItem key={order._id} sx={{ border: "1px solid #ccc", mb: 2 }}>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6">
              Order ID: {order._id}
            </Typography>
            <Typography>
              Table: {order.table?.number || "N/A"} ({order.table?.area || "N/A"})
            </Typography>
            <Typography>Status: {order.status}</Typography>
            <Typography>
              Total Price: Rp {order.totalPrice?.toLocaleString()}
            </Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}

export default OrderList;
