import httpClient from "../../../API/httpClient"; // Pastikan file httpClient sudah disetup dengan benar

export const getProductsByCategory = async (category, subCategory) => {
  try {
    const token = localStorage.getItem('token'); // Mengambil token
    const response = await httpClient.get(
      `/user/products/${category || ''}/${subCategory || ''}`, // Rute dinamis
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Mengembalikan data produk
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

export const getProductById = async (id) => {
  try {
    const token = localStorage.getItem('token'); // Mengambil token
    const response = await httpClient.get(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Mengembalikan data produk
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : 'Failed to fetch product details'
    );
  }
};
