// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// file route
import SidebarUI from '../../component/sidebar/view';

import DashboardAdmin from '../../screen/admin-dashboard/view';
import UserListAdmin from '../../screen/admin-userList/view';
import ProductListAdmin from '../../screen/admin-product/view';
import OrderListAdmin from '../../screen/admin-orderList/view';


export default function RouterAdmin() {
  return (
    <Router>
      <SidebarUI>
        <Routes>
          <Route path="/" element={<DashboardAdmin/>} />
          <Route path="/user-list" element={<UserListAdmin />} />
          <Route path="/product-list" element={<ProductListAdmin />} />
          <Route path="/order-list" element={<OrderListAdmin />} />
        </Routes>
      </SidebarUI>
    </Router>
  );
}


