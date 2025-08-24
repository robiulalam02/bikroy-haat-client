import React from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AdminOrdersCharts from '../../../Components/AdminOrdersChart/AdminOrdersChart';
import useAuth from '../../../Hooks/useAuth';

const UserDashboardHome = () => {

    const axiosSecure = useAxiosSecure();
    const {profile} = useAuth()

    const { data: states = [], isLoading, isPending } = useQuery({
        queryKey: ['userStates'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/dashboard/stats?email=${profile?.email}`);
            return res.data;
        }
    });

    return (
        <section className='p-4 bg-white min-h-dvh'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5'>
                <div className='p-5 flex flex-col items-center justify-center gap-2 min-h-[170px] rounded-lg shadow bg-[#ecf2ff]'>
                    <img src="/watchlist.png" className='w-10' alt="" />
                    <div className='text-center text-blue-500'>
                        <p className='text-lg font-semibold'>Total Watchlist</p>
                        <p className='text-xl font-medium'>{states.totalWatchlist > 10 ? states.totalWatchlist : `0${states.totalWatchlist}`}</p>
                    </div>
                </div>
                <div className='p-5 flex flex-col items-center justify-center gap-2 min-h-[170px] rounded-lg shadow bg-[#ecf2ff]'>
                    <img src="/order.png" className='w-10' alt="" />
                    <div className='text-center text-blue-500'>
                        <p className='text-lg font-semibold'>Total Orders</p>
                        <p className='text-xl font-medium'>{states.totalOrders > 10 ? states.totalOrders : `0${states.totalOrders}`}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserDashboardHome