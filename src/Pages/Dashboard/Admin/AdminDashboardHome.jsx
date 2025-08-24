import React from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AdminOrdersCharts from '../../../Components/AdminOrdersChart/AdminOrdersChart';

const AdminDashboardHome = () => {

  const axiosSecure = useAxiosSecure();

  const { data: states = [], isLoading, isPending } = useQuery({
    queryKey: ['adminStates'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data;
    }
  });

  return (
    <section className='p-4 bg-white min-h-dvh'>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5'>
        <div className='p-5 flex flex-col items-center justify-center gap-2 min-h-[170px] rounded-lg shadow bg-[#ecf2ff]'>
          <img src="/user.png" className='w-10' alt="" />
          <div className='text-center text-blue-500'>
            <p className='text-lg font-semibold'>Total Users</p>
            <p className='text-xl font-medium'>{states.totalUsers>10 ? states.totalUsers : `0${states.totalUsers}`}</p>
          </div>
        </div>
        <div className='p-5 flex flex-col items-center justify-center gap-2 min-h-[170px] rounded-lg shadow bg-[#fdf5e5]'>
          <img src="/market-place.png" className='w-10' alt="" />
          <div className='text-center text-orange-400'>
            <p className='text-lg font-semibold'>Total Vendors</p>
            <p className='text-xl font-medium'>{states.totalVendors>10 ? states.totalVendors : `0${states.totalVendors}`}</p>
          </div>
        </div>
        <div className='p-5 flex flex-col items-center justify-center gap-2 min-h-[170px] rounded-lg shadow bg-[#ecf2ff]'>
          <img src="/delivery-box.png" className='w-10' alt="" />
          <div className='text-center text-blue-500'>
            <p className='text-lg font-semibold'>Total Products</p>
            <p className='text-xl font-medium'>{states.totalProducts>10 ? states.totalProducts : `0${states.totalProducts}`}</p>
          </div>
        </div>
        <div className='p-5 flex flex-col items-center justify-center gap-2 min-h-[170px] rounded-lg shadow col-span-1 md:col-span-2 bg-[#e6fefa]'>
          <img src="/money-bag.png" className='w-10' alt="" />
          <div className='text-center text-green-500'>
            <p className='text-lg font-semibold'>Total Sales</p>
            <p className='text-xl font-medium'>৳ {states.totalSales>10 ? states.totalSales : `0${states.totalSales}`}</p>
          </div>
        </div>
        <div className='p-5 flex flex-col items-center justify-center gap-2 max-h-[170px] rounded-lg shadow col-span-1 bg-[#ecf2ff]'>
          <img src="/megaphone.png" className='w-10' alt="" />
          <div className='text-center text-blue-500'>
            <p className='text-lg font-semibold'>Advertisements</p>
            <p className='text-xl font-medium'>{states.totalAdvertisements>10 ? states.totalAdvertisements : `0${states.totalAdvertisements}`}</p>
          </div>
        </div>
        <div className='p-5 flex flex-col items-center justify-between rounded-lg shadow col-span-1 md:col-span-4'>
          <AdminOrdersCharts />
        </div>
      </div>
    </section>
  )
}

export default AdminDashboardHome
