import { motion } from "framer-motion";

const tips = [
  {
    title: "Buy Early Morning",
    desc: "Vendors bring fresh items early in the morning. Prices are often cheaper before 10 AM.",
    img: "/illustration/Shopping bag-pana.png"
  },
  {
    title: "Compare Before Buying",
    desc: "Check prices at 2-3 nearby shops before buying. Use this app to track changes daily.",
    img: "/illustration/Price-cuate.png"
  },
  {
    title: "Shop Midweek",
    desc: "Prices often drop on Tuesdays and Wednesdays due to lower demand. Avoid weekends if possible.",
    img: "/illustration/Date picker-pana.png"
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export default function BuyerTips() {
  return (
    <section className="py-12 min-h-[600px] px-4 md:px-10 lg:px-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl text-gray-800 mb-10 font-gliker"
      >
        <span className="text-primary">Smart</span> Buyer Tips
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6 mt-20">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className=" p-6 rounded-xl hover:shadow-lg transition"
          >
            <img className="w-72" src={tip.img} alt={tip.title} />
            <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
            <p className="text-gray-600 text-sm">{tip.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
