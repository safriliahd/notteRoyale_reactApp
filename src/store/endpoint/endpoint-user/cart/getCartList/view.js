import httpClient from "../../../../api/httpClient";

export const getCartList = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await httpClient.get('/user/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Extract the items array and map it into the correct structure
    const cartItems = response.data.items.map(item => {
      return {
        id: item._id,  // ID dari item cart
        productId: item.product ? item.product._id : null,  // Menambahkan ID produk
        name: item.product ? item.product.name : 'Unknown Product',
        price: item.product ? item.product.price : 0,
        quantity: item.quantity,
        image: item.product ? item.product.photo : '', // Mengambil URL gambar produk
      };
    });

    return { cartItems };
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch cart items');
  }
};
