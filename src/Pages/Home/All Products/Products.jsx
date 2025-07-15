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

    if (isLoading || isPending) {
        return <Loading />
    }

    console.log(products)

    return (
        <section className="py-12 px-4 md:px-10 lg:px-20 min-h-[700px] bg-white">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl text-center mb-10 text-gray-800 font-gliker"
            >
                <span className="text-primary">Featured</span> Products
            </motion.h2>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-5 justify-center">
                {
                    products?.map(product => (
                        <div class="bg-white rounded-lg overflow-hidden shadow-lg ring ring-primary/40 max-w-md">
                            <div class="relative">
                                <div className="h-46 w-full overflow-hidden">
                                    <img class="h-full w-full object-cover" src={product.image} alt="Product Image" />
                                </div>
                                <div class="absolute top-0 right-0 bg-black/40 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">{product.date}
                                </div>
                            </div>
                            <div class="p-4">
                                <h3 class="text-lg font-medium mb-2">{product.marketName}</h3>
                                <div>
                                    <p>Item name: <span className="text-gray-600">{product.itemName}</span></p>
                                </div>
                                <div class="flex items-center justify-between mt-3">
                                    <p class="font-semibold text-lg"><span className="text-green-600">{product.pricePerUnit}৳</span> /kg</p>
                                    <button onClick={()=> navigate(`/product-details/${product._id}`)} class="btn btn-primary text-white font-bold py-2 px-4 rounded">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )

}
