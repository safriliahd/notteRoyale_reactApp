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
    const response = await httpClient.get(`/user/products/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { id: productId, name, price, category, description, photo, averageRating, ratings } = response.data;
    return {
      productId,
      name,
      price,
      category: `${category.main} - ${category.sub}`,
      description,
      photo,
      averageRating,
      ratings,
    };
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : 'Failed to fetch product details'
    );
  }
};
