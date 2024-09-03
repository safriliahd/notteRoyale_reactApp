// src/router/routerAdmin/view.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SidebarUI from '../../component/sidebar/view';

import DashboardAdmin from '../../screen/admin-dashboard/view';
import UserListAdmin from '../../screen/admin-userList/view';
import ProductListAdmin from '../../screen/admin-product/view';
import OrderListAdmin from '../../screen/admin-orderList/view';
import DataProductCRUD from '../../screen/admin-product-crud/view';

export default function RouterAdmin() {
  return (
    <SidebarUI>
      <Routes>
        <Route path="/" element={<DashboardAdmin />} />
        <Route path="/user-list" element={<UserListAdmin />} />
        <Route path="/product-list" element={<ProductListAdmin />} />
        <Route path="/order-list" element={<OrderListAdmin />} />
        <Route path='/data-product-edit' element={<DataProductCRUD />} />
      </Routes>
    </SidebarUI>
  );
}
