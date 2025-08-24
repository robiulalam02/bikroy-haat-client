import React from 'react'
import useUserRole from '../../../Hooks/useUserRole'
import AdminDashboardHome from '../Admin/AdminDashboardHome';
import VendorDashboardHome from '../Vendor/VendorDashboardHome';
import UserDashboardHome from '../User/UserDashboardHome';

const DashboardHome = () => {
const {isAdmin, isVendor} = useUserRole();

if (isAdmin) {
  return <AdminDashboardHome />
}
if (isVendor) {
  return <VendorDashboardHome />
} else{
  return <UserDashboardHome />
}
}

export default DashboardHome
