import httpClient from "../../../API/httpClient";// Pastikan file httpClient sudah dikonfigurasi

export const updateProduct = async (productId, formData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await httpClient.put(`/admin/products/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to update product');
  }
};
