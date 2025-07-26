// components/AdvertisementHighlight.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
    <section className="bg-gray-50 py-10 px-4 md:px-10 lg:px-20 h-[500px]">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl mb-6 font-gliker">
          <span className="text-primary">Promos</span> for you
        </h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={false}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          style={{ height: '320px', padding: '0 10px' }}
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad._id} style={{ height: '100%', padding: '20px 0' }}>
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 h-full">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{ad.title}</h3>
                  <p className="text-sm text-gray-600">{ad.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
