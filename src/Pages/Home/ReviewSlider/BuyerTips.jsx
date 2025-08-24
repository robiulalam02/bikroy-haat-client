import { motion } from "framer-motion";

const tips = [
  {
    id: 1,
    title: "Buy Early Morning",
    desc: "Vendors bring fresh items early in the morning. Prices are often cheaper before 10 AM.",
    img: "/illustration/Shopping bag-pana.png"
  },
  {
    id: 2,
    title: "Compare Before Buying",
    desc: "Check prices at 2-3 nearby shops before buying. Use this app to track changes daily.",
    img: "/illustration/Price-cuate.png"
  },
  {
    id: 3,
    title: "Shop Midweek",
    desc: "Prices often drop on Tuesdays and Wednesdays due to lower demand. Avoid weekends if possible.",
    img: "/illustration/Date picker-pana.png"
  },
];

export default function BuyerTips() {
  return (
    <section className="py-12 min-h-[600px] px-4 bg-white">
      <div className="max-w-screen-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }} // Changed heading animation to slide from left
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.7,
          }}
          viewport={{ once: true }}
          className="text-4xl text-gray-800 mb-10 font-gliker text-center" // Added text-center for small screens
        >
          <span className="text-primary">Smart</span> Buyer Tips
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="p-6 rounded-xl border border-primary/20 shadow shadow-primary/10 flex flex-col items-center text-center"
            // Added flex for centering content
            >
              {/* Content wrapper for staggered text */}
              <div
                className="w-full" // Ensure it takes full width of the card
              >
                <img
                  className="w-72 mx-auto mb-4" // Centered image
                  src={tip.img}
                  alt={tip.title}
                />
                <h3
                  className="text-xl font-semibold mb-2"
                >
                  {tip.title}
                </h3>
                <p
                  className="text-gray-600 text-sm px-10"
                >
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
