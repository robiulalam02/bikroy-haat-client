import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Rafiul Hasan",
    role: "Local Buyer",
    image: "/images/user1.jpg",
    review:
      "This platform helps me decide when and where to shop — prices are accurate and up-to-date. Great job!",
  },
  {
    name: "Nur Jahan",
    role: "Home Cook",
    image: "/images/user2.jpg",
    review:
      "Love how easy it is to compare prices. It has saved me both money and time. Highly recommended!",
  },
  {
    name: "Abdullah Al Mamun",
    role: "Vendor - Shantinagar",
    image: "/images/user3.jpg",
    review:
      "Finally a place to share fair prices with transparency. This builds trust with my customers.",
  },
  {
    name: "Abdullah Al Mamun",
    role: "Vendor - Shantinagar",
    image: "/images/user3.jpg",
    review:
      "Finally a place to share fair prices with transparency. This builds trust with my customers.",
  },
];

export default function ReviewSlider() {
  return (
    <section className="py-12 px-4 md:px-10 lg:px-20 bg-gray-50">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center text-gray-800 mb-10"
      >
        💬 People’s Thoughts
      </motion.h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 h-full flex flex-col justify-between"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                “{review.review}”
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
