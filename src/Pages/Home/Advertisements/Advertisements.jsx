// components/AdvertisementHighlight.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ads = [
  {
    id: 1,
    title: "🥕 Special Offer: Buy 2kg Carrot, Get 1kg Free!",
    description: "Only available this week at Karwan Bazar.",
    image: "/ads/carrot.jpg",
  },
  {
    id: 2,
    title: "🐟 Fresh Fish Fridays!",
    description: "Up to 20% off on all freshwater fish in New Market.",
    image: "/ads/fish.jpg",
  },
  {
    id: 3,
    title: "🍗 Chicken Combo Deal",
    description: "Get amazing discounts when buying 5kg or more.",
    image: "/ads/chicken.jpg",
  },
];

export default function Advertisements() {
  return (
    <section className="bg-white py-10 px-4 md:px-10 lg:px-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Promos for you
      </h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad.id}>
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <img
                src={ad.image}
                alt={ad.title}
                className="h-40 w-full object-cover"
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
