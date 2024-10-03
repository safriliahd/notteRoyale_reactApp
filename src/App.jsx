import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RouterAdmin from './router/routerAdmin/view';
import PageSingIn from './screen/signIn/view';
import PageSignUp from './screen/signUp/view';
import RouterUser from './router/router user/view';

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false); // This is just a mock state
  const [role, setRole] = useState('');

  // const [role, setRole] = useState('admin');


  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');

    if (token && savedRole) {
      setIsLoggedIn(true);
      setRole(savedRole);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Route untuk login */}
        <Route path="/login" element={<PageSingIn />} />
        {/* Route untuk sign-up */}
        <Route path="/sign-up" element={<PageSignUp />} />

        {/* Cek apakah user sudah login dan arahkan sesuai role */}
        <Route
          path="/*"
          element={
            isLoggedIn ? (
              role === 'admin' ? <RouterAdmin /> : <RouterUser />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Route untuk user dashboard (jika user belum login akan diarahkan ke login) */}
        <Route
          path="/dashboard-user/*"
          element={
            isLoggedIn && role === 'user' ? (
              <RouterUser />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Route untuk admin dashboard */}
        <Route
          path="/dashboard-admin/*"
          element={
            isLoggedIn && role === 'admin' ? (
              <RouterAdmin />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
