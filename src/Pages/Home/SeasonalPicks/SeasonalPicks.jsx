import { motion } from "framer-motion";

const seasonalItems = [
  {
    name: "Pumpkin",
    desc: "Perfect for curries this rainy season. Fresh and sweet.",
    image: "/pimpkin.jpg",
    season: "Rainy Season",
  },
  {
    name: "Green Chili",
    desc: "Abundant this month. Buy fresh to save more.",
    image: "/green-chilli.jpg",
    season: "All Season",
  },
  {
    name: "Spinach",
    desc: "Best for soups and stir fry. Nutritious & affordable now.",
    image: "/spinach.jpg",
    season: "Monsoon",
  },
  {
    name: "Carrot",
    desc: "Freshly harvested — great for salads and juices.",
    image: "/public/carror-farm.jpg",
    season: "Winter Special",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

export default function SeasonalPicks() {
  return (
    <section className="py-12 px-4 md:px-10 lg:px-20 min-h-[500px] bg-white">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl text-center mb-10 text-gray-800 font-gliker"
      >
        <span className="text-primary">Seasonal</span> Picks
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-2xl mx-auto">
        {seasonalItems.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-xl overflow-hidden shadow-md flex flex-col justify-between hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-36 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 my-1">{item.desc}</p>
              <span className="text-xs px-3 py-1 inline-block rounded-full bg-green-100 text-green-700 mt-2">
                🌿 {item.season}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
