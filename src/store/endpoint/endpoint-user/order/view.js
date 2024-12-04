import httpClient from '../../../api/httpClient';

// Fungsi untuk membuat order
export const createOrder = async (orderData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await httpClient.post('/user/orders', orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Kembalikan data order yang baru dibuat
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Gagal membuat order');
  }
};

// Fungsi untuk mendapatkan nomor order
export const getOrderNumber = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await httpClient.get('/user/order-number', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Kembalikan nomor order
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Gagal mendapatkan nomor order');
  }
};
