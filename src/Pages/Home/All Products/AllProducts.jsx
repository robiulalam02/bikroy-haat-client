import { motion } from "framer-motion";
import { FiEye, FiHeart } from "react-icons/fi"; // Eye and Heart icons

// Dummy product data
const dummyProducts = [
    {
        id: 1,
        image: "/images/onion.jpg",
        market: "Karwan Bazar",
        date: "2025-07-07",
        items: [
            { name: "Onion", price: 32 },
            { name: "Potato", price: 20 },
            { name: "Tomato", price: 40 },
        ],
    },
    {
        id: 2,
        image: "/images/vegetables.jpg",
        market: "Mohammadpur Krishi Market",
        date: "2025-07-07",
        items: [
            { name: "Eggplant", price: 35 },
            { name: "Pumpkin", price: 25 },
        ],
    },
    {
        id: 3,
        image: "/images/fish.jpg",
        market: "New Market",
        date: "2025-07-07",
        items: [
            { name: "Rui Fish", price: 300 },
            { name: "Tilapia", price: 180 },
        ],
    },
    {
        id: 4,
        image: "/images/meat.jpg",
        market: "Mirpur 1",
        date: "2025-07-07",
        items: [
            { name: "Beef", price: 750 },
            { name: "Chicken", price: 180 },
        ],
    },
    {
        id: 5,
        image: "/images/fruits.jpg",
        market: "Shantinagar Bazar",
        date: "2025-07-07",
        items: [
            { name: "Mango", price: 120 },
            { name: "Banana", price: 30 },
        ],
    },
    {
        id: 6,
        image: "/images/spices.jpg",
        market: "Jatrabari Bazar",
        date: "2025-07-07",
        items: [
            { name: "Turmeric", price: 80 },
            { name: "Dry Chili", price: 100 },
        ],
    },
];

// Framer Motion animation variants
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const card = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AllProducts() {
    return (
        <section className="px-4 md:px-10 lg:px-20 pt-10 pb-20 ">
            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl text-center mb-20 font-gliker"
            >
                <span className="text-primary">Latest</span> Market Prices
            </motion.h2>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
                {dummyProducts.map((product) => (
                    <motion.div
                        key={product.id}
                        variants={card}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        className="relative bg-white rounded-xl shadow-md overflow-hidden transition group"
                    >
                        <div className="relative">
                            <img
                                src={product.image}
                                alt={product.market}
                                className="w-full h-48 object-cover"
                            />

                            {/* Sliding Icon Buttons */}
                            <motion.div
                                variants={{
                                    rest: { opacity: 0, x: 50 },
                                    hover: {
                                        opacity: 1,
                                        x: 0,
                                        transition: { type: "tween", duration: 0.3 },
                                    },
                                }}
                                className="absolute top-5 right-5 flex flex-col gap-2 z-10"
                            >
                                <button
                                    className="w-9 h-9 rounded-md flex items-center justify-center shadow hover:bg-primary hover:text-white transition"
                                    title="View"
                                >
                                    <FiEye className="text-lg" />
                                </button>
                                <button
                                    className="w-9 h-9 rounded-md text-rose-600 flex items-center justify-center shadow hover:bg-rose-600 hover:text-white transition"
                                    title="Wishlist"
                                >
                                    <FiHeart className="text-lg" />
                                </button>
                            </motion.div>
                        </div>

                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {product.market}
                            </h3>
                            <p className="text-sm text-gray-500 mb-3">{product.date}</p>
                            <ul className="text-sm text-gray-700 space-y-1 mb-4">
                                {product.items.map((item, index) => (
                                    <li key={index}>
                                        <span className="font-medium">{item.name}</span> — ৳{item.price}/kg
                                    </li>
                                ))}
                            </ul>
                            <button className="px-4 py-2 bg-primary text-white font-medium rounded hover:bg-primary/90 transition">
                                View Details
                            </button>
                        </div>
                    </motion.div>

                ))}
            </motion.div>
        </section>
    );
}
