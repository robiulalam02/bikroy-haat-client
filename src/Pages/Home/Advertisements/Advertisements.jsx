// components/AdvertisementHighlight.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import './ads.css'

const ads = [
  {
    id: 1,
    title: "Special Offer: Buy 2kg Carrot, Get 1kg Free!",
    description: "Only available this week at Karwan Bazar.",
    image: "/Ads/ads-1.jpg",
  },
  {
    id: 2,
    title: "Fresh Fish Fridays!",
    description: "Up to 20% off on all freshwater fish in New Market.",
    image: "/Ads/ads-2.jpg",
  },
  {
    id: 3,
    title: "Chicken Combo Deal",
    description: "Get amazing discounts when buying 5kg or more.",
    image: "/Ads/ads-3.jpg",
  },
  {
    id: 4,
    title: "Chicken Combo Deal",
    description: "Get amazing discounts when buying 5kg or more.",
    image: "/Ads/ads-4.jpg",
  },
  {
    id: 5,
    title: "Chicken Combo Deal",
    description: "Get amazing discounts when buying 5kg or more.",
    image: "/Ads/ads-5.jpg",
  },
  {
    id: 6,
    title: "Chicken Combo Deal",
    description: "Get amazing discounts when buying 5kg or more.",
    image: "/Ads/ads-6.jpg",
  },
];

export default function Advertisements() {
  return (
    <section className="bg-gray-50 py-10 px-4 md:px-10 lg:px-20 h-[500px]">
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
        style={{height: '320px'}}
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad.id} style={{height: '100%', padding: '20px 0'}}>
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
    </section>
  );
}
