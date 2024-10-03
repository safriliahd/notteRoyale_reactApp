import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Private Route untuk User
const PrivateUserRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role !== 'user') {
    return <Navigate to="/dashboard-admin" />; // Jika bukan user, arahkan ke admin dashboard
  }

  return children;
};

PrivateUserRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateUserRoute;
