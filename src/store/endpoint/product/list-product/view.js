import httpClient from "../../../API/httpClient"; // Pastikan file httpClient sudah disetup dengan benar

export const listProduct = async () => {
  try {
    const token = localStorage.getItem("token"); // Mengambil token
    const response = await httpClient.get('/admin/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Mengembalikan data produk
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch products');
  }
};
