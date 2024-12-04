import httpClient from "../../../api/httpClient";

export const getAvailableTables = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await httpClient.get('/user/tables/available', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the list of items in the cart
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : 'Failed to fetch cart items');
    }
  };