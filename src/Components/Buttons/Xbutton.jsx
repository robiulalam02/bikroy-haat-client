import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

export default function Xbutton({ onClick }) {
    return (
        <motion.button
            // onClick={onClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-gray-500 hover:text-red-500 text-2xl p-1 rounded-full transition"
            aria-label="Close"
        >
            <IoClose />
        </motion.button>
    );
}
