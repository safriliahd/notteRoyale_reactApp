import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Sesuaikan dengan base URL backend Anda
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;