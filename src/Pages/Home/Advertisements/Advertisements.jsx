import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

import './ads.css'
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function Advertisements() {
  const axiosPublic = useAxiosPublic();

  const getAdvertisements = async () => {
    const res = await axiosPublic.get('/advertisements');
    return res.data;
  };

  const { data: ads = [], isLoading, isPending, error } = useQuery({
    queryKey: ['advertisements'],
    queryFn: getAdvertisements,
  });

  return (
    <section className="bg-gray-50 py-10 px-4 h-[500px]s">
      <div className="max-w-screen-2xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl mb-6 font-gliker text-center">
          <span className="text-primary">Promos</span> for you
        </motion.h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1} // Default for extra small devices
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={false}
          breakpoints={{
            // Very small devices (e.g., mobile portrait, less than 640px)
            320: { slidesPerView: 1 },
            // Small devices (sm breakpoint - 640px and up)
            640: { slidesPerView: 2 },
            // Medium devices (md breakpoint - 768px and up)
            768: { slidesPerView: 2 },
            // Large devices (lg breakpoint - 1024px and up)
            1024: { slidesPerView: 3 },
            // Extra large devices (xl breakpoint - 1280px and up)
            1280: { slidesPerView: 3 },
          }}
          // Removed fixed height here, let content dictate
          style={{ height: 'auto', padding: '0 10px' }}
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad._id} style={{ height: 'auto', padding: '20px 0' }}>
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full"> {/* Added flex flex-col h-full */}
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4 flex-grow flex flex-col justify-between"> {/* Added flex-grow, flex, flex-col, justify-between */}
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{ad.title}</h3>
                    <p className="text-sm text-gray-600">{ad.description}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}