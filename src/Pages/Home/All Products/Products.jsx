import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiEye, FiHeart } from "react-icons/fi"; // Eye and Heart icons
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { PiEyeLight } from "react-icons/pi";
import { TiHeart } from "react-icons/ti";
import { useNavigate } from "react-router";
import Loading from '../../../Components/Loaders/Loading'

export default function Products() {

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { data: products = [], isLoading, isPending } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/card/products');
            return res.data;
        }
    });

    // Variants for the container to stagger children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // Delay between each child animation
                delayChildren: 0.2,    // Delay before the first child animates
            },
        },
    };

    if (isLoading || isPending) {
        return <Loading />
    }

    return (
        <section className="py-12 px-4  min-h-[700px] bg-white">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl text-center mb-10 text-gray-800 font-gliker"
            >
                <span className="text-primary">Featured</span> Products
            </motion.h2>

            <div

                data-aos="fade-up-right"
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-center max-w-screen-2xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Animate once when 30% of the element is in view
            >
                {products?.map(product => (
                    <div
                        key={product._id} // Make sure each product has a unique key
                        className="bg-white rounded-lg overflow-hidden shadow-lg ring ring-primary/40 max-w-md"
                    >
                        <div className="relative">
                            <div className="h-46 w-full overflow-hidden">
                                <img className="h-full w-full object-cover" src={product.image} alt="Product Image" />
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
                                    className="btn btn-primary text-white font-bold py-2 px-4 rounded"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )

}
