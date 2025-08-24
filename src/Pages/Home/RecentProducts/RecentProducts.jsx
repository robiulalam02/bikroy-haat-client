import React from 'react'
import { motion } from "framer-motion";
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { PiEyeLight } from 'react-icons/pi';

const RecentProducts = () => {

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { data: products = [], isLoading, isPending } = useQuery({
        queryKey: ['recent-products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/recent-products');
            return res.data;
        }
    });

    return (
        <section className="py-12 px-4 min-h-[700px] bg-white">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl text-center mb-10 text-gray-800 font-gliker"
            >
                <span className="text-primary">Recent</span> Products
            </motion.h2>

            <motion.div
                data-aos="fade-up-left"
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center max-w-screen-2xl mx-auto px-4"
            // variants={containerVariants}
            // initial="hidden"
            // whileInView="visible"
            // viewport={{ once: true, amount: 0.3 }} // Animate once when 30% of the element is in view
            >
                {products?.map(product => (
                    <motion.div
                        key={product._id} // Make sure each product has a unique key
                        className="bg-white rounded-lg overflow-hidden shadow-lg ring ring-primary/40 max-w-md"
                    // variants={cardVariants}
                    >
                        <div className="relative">
                            <div className="h-48 lg:h-60 w-full overflow-hidden flex justify-center">
                                <img className="h-full" src={product.image} alt="Product Image" />
                            </div>
                            <div className="absolute top-0 right-0 bg-black/40 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                                {product.date}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-medium mb-2">{product.itemName}</h3>
                            <div>
                                <p><span className="text-gray-600">{product.marketName}</span></p>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                                <p className="font-semibold text-lg"><span className="text-green-600">{product.pricePerUnit}৳</span> /kg</p>
                                <button
                                    onClick={() => navigate(`/product-details/${product._id}`)}
                                    className="group relative btn btn-primary text-white font-bold py-2 px-4 rounded"
                                >
                                    <div class="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100"><PiEyeLight className="w-5 h-5" /></div><span>Details</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}

export default RecentProducts
