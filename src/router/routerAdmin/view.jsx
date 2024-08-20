// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// file route
import DashboardAdmin from '../../screen/admin-dashboard/view';
import UserListAdmin from '../../screen/admin-userList/view';
import ProductListAdmin from '../../screen/admin-product/view';
import OrderListAdmin from '../../screen/admin-orderList/view';
import SidebarApp from '../../component/sidebar/view';

export default function RouterAdmin() {
  return (
    <Router>
      <SidebarApp>
        <Routes>
          <Route path="/" element={<DashboardAdmin />} />
          <Route path="/user-list" element={<UserListAdmin />} />
          <Route path="/product-list" element={<ProductListAdmin />} />
          <Route path="/order-list" element={<OrderListAdmin />} />
        </Routes>
      </SidebarApp>
    </Router>
  );
}


