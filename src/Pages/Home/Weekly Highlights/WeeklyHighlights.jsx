import { motion } from "framer-motion";

const highlights = [
  {
    title: "🥦 Most Bought Item",
    item: "Broccoli",
    desc: "Broccoli sales soared in Karwan Bazar due to seasonal demand.",
    image: "/images/broccoli.jpg",
  },
  {
    title: "💸 Best Deal Market",
    item: "Mohammadpur Krishi Market",
    desc: "This week, overall prices were lowest here on average.",
    image: "/images/market.jpg",
  },
  {
    title: "🧑‍🌾 Vendor Spotlight",
    item: "Sultan Mia",
    desc: "Known for fair pricing & fresh fish daily at Shantinagar Bazar.",
    image: "/images/vendor.jpg",
  },
];

const highlightVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

export default function WeeklyHighlights() {
  return (
    <section className="py-12 px-4 md:px-10 lg:px-20 bg-white">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-10 text-gray-800"
      >
        🧺 Weekly Market Highlights
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {highlights.map((highlight, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            variants={highlightVariants}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <img
              src={highlight.image}
              alt={highlight.item}
              className="w-full h-40 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {highlight.title}
              </h3>
              <p className="text-base font-medium text-primary mb-1">
                {highlight.item}
              </p>
              <p className="text-sm text-gray-600">{highlight.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
