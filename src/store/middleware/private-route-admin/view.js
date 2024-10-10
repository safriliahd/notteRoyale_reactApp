import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Private Route untuk Admin
const PrivateAdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role !== 'admin') {
    return <Navigate to="/user-dashboard" />; // Jika bukan admin, arahkan ke user dashboard
  }

  return children;
};

PrivateAdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateAdminRoute;
