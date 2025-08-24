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

    return (
        <section className="py-12 px-4 bg-white">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl text-center mb-10 text-gray-800 font-gliker"
            >
                <span className="text-primary">Top Sellers</span> this Month
            </motion.h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 max-w-screen-2xl mx-auto px-4'>
                {
                    sellers?.map(seller=> (
                        <div className='flex flex-col items-center justify-between gap-4 p-4 shadow rounded lg:shadow-none text-center'>
                            <motion.img 
                            initial={{opacity:0, y:50}}
                            whileInView={{opacity:1, y:0}}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                            src="store.png" className='w-14' alt="" />
                            <h3 className='text-lg lg:text-xl font-semibold'>{seller._id.marketName}</h3>
                            <p className='font-medium text-lg'>Total Sells: {seller.totalQuantity > 10 ? seller.totalQuantity : `0${seller.totalQuantity}`}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default TopSeller
