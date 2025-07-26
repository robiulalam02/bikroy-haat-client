import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import banner from '../../../assets/banner.jpg'

const banners = [
    {
        id: 1,
        image: "/banner-3.jpeg",
        title: "Track Daily Market Prices",
        subtitle: "Live updates from your local bazaar",
    },
    {
        id: 2,
        image: "/banner-2.jpg",
        title: "Compare Prices Instantly",
        subtitle: "Buy smarter. Save more.",
    },
    {
        id: 3,
        image: "/banner-1.jpg",
        title: "Fresh Deals from Vendors",
        subtitle: "Exclusive offers and daily price drops.",
    },
];

export default function BannerSlider() {
    return (
        <div className="relative w-full h-[600px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        // navigation={true}
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20 z-10" />

              {/* Content */}
              <div className="max-w-screen-2xl mx-auto absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 z-20">
                <motion.h1
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9 }}
                  className="text-white text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg"
                >
                  {banner.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                  className="text-white text-lg md:text-xl mt-4 max-w-xl drop-shadow-md"
                >
                  {banner.subtitle}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-6 px-6 py-2 bg-primary hover:bg-primary/90 transition-all duration-300 text-white font-semibold rounded shadow-lg"
                >
                  Explore
                </motion.button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    );
}
