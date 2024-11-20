import { useNavigate } from 'react-router-dom';
import httpClient from "../../../API/httpClient";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Panggil endpoint logout dari backend
      await httpClient.post('/auth/logout');

      // Hapus token dari localStorage (atau sessionStorage)
      localStorage.removeItem('token'); // Sesuaikan dengan nama token yang digunakan
      sessionStorage.removeItem('token');

      // Redirect ke halaman login setelah logout berhasil
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error.response ? error.response.data.message : 'Logout failed');
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
