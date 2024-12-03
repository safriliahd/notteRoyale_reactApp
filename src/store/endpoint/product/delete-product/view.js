import httpClient from "../../../API/httpClient"; // Pastikan setup httpClient sudah benar

export const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await httpClient.delete(`/admin/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to delete product');
  }
};
