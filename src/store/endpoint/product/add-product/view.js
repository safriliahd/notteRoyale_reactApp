import httpClient from "../../../API/httpClient"; // Pastikan file httpClient Anda sudah disetup dengan benar

export const addProduct = async (formData) => {
  try {
    // Mengambil token dari localStorage atau tempat yang sesuai untuk menyimpan token JWT
    const token = localStorage.getItem("token"); 

    // Mengirim permintaan POST untuk menambahkan produk dengan FormData dan JWT di header
    const response = await httpClient.post('/admin/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Pastikan header ini untuk meng-upload file
        Authorization: `Bearer ${token}`, // Menambahkan Bearer token di header
      },
    });

    return response.data; // Mengembalikan data jika berhasil
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to add product');
  }
};
