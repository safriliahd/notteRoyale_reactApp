import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SidebarUser from '../../screen/screen-user/sidebar-user/view';
import PageDashboardUser from '../../screen/screen-user/user-dashboard/view';
import TableUser from '../../screen/screen-user/user-table/view';
import OrderUser from '../../screen/screen-user/user-order/view';

export default function RouterUser() {
    return (
        <>
        <SidebarUser>
            <Routes>
                <Route path='/' element={<PageDashboardUser />} />
                <Route path='/table' element={<TableUser />} />
                <Route path='/my-order' element={<OrderUser />} />
            </Routes>
        </SidebarUser>
        </>
    )
}