import httpClient from "../../../API/httpClient";

export const login = async (email, password) => {
  try {
    const response = await httpClient.post('/auth/login', { email, password });
    return response.data; // Return data jika login berhasil
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Login failed');
  }
};