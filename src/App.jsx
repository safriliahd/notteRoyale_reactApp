import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RouterAdmin from './router/routerAdmin/view';
import PageSingIn from './screen/signIn/view';
import DataProductCRUD from './screen/admin-product-crud/view';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // This is just a mock state

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PageSingIn />} />
        <Route path="/*" element={isLoggedIn ? <RouterAdmin /> : <PageSingIn />} />
        
      </Routes>
    </Router>
  );
}

export default App;
