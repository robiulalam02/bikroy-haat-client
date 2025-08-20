import React from 'react'
import { motion } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const TopSeller = () => {

    const axiosPublic = useAxiosPublic();

    const { data: sellers = [], isLoading, isPending } = useQuery({
        queryKey: ['topSeller'],
        queryFn: async () => {
            const res = await axiosPublic.get('/top-selling-products');
            return res.data;
        }
    });

    console.log(sellers)

    return (
        <section className="py-12 px-4  min-h-[400px] bg-white">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl text-center text-gray-800 font-gliker"
            >
                <span className="text-primary">Top Sellers</span> this Month
            </motion.h2>

            <div className='grid grid-cols-5 mt-20'>
                {
                    sellers?.map(seller=> (
                        <div className='flex flex-col items-center gap-4'>
                            <img src="store.png" className='w-14' alt="" />
                            <h3 className='text-xl font-semibold'>{seller._id.marketName}</h3>
                            <p className='font-medium text-lg'>Total Sell: {seller.totalQuantity > 10 ? seller.totalQuantity : `0${seller.totalQuantity}`}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default TopSeller
