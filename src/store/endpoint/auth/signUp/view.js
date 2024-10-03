import httpClient from "../../../API/httpClient";

export const register = async (name, email, password) => {
  try {
    const response = await httpClient.post('/auth/register', { name, email, password });
    return response.data; // Return data jika login berhasil
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Register failed');
  }
};