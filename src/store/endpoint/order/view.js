import httpClient from "../../api/httpClient"; // Pastikan file httpClient sudah disetup dengan benar

export const getOrdersInProgress = async () => {
  try {
    const token = localStorage.getItem("token"); // Mengambil token
    const response = await httpClient.get("/admin/orders/in-progress", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Mengembalikan data order
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to fetch in-progress orders");
  }
};

export const getOrdersDone = async () => {
  try {
    const token = localStorage.getItem("token"); // Mengambil token
    const response = await httpClient.get("/admin/orders/done", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Mengembalikan data order
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Failed to fetch done orders");
  }
};

export const updateOrderStatusToDone = async (orderId) => {
    try {
      const token = localStorage.getItem("token"); // Mengambil token
      const response = await httpClient.patch(`/admin/orders/${orderId}/status`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Mengembalikan data hasil update
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : "Failed to update order status");
    }
  };

  export const getUserOrders = async () => {
    try {
      const token = localStorage.getItem("token"); // Mengambil token
      const response = await httpClient.get("/user/my-order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.orders; // Mengembalikan data orders
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : "Failed to fetch user orders");
    }
  };
  
