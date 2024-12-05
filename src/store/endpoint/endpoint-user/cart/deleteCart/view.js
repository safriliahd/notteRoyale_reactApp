import httpClient from "../../../../api/httpClient";

export const deleteCartItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await httpClient.delete(`/user/deletecart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data; // Mengembalikan respons dari server
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : 'Failed to delete cart item');
    }
  };
  