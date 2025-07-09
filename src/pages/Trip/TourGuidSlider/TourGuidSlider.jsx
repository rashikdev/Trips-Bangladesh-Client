import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import GuideCard from "../../../components/tourismAndTravelGuide/GuideCard";

const TourGuideSlider = ({ guides, guidesLoading }) => {
  if (guidesLoading) return <div>Loading...</div>;
  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
        Our Tour Guides
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {guides.map((guide, idx) => (
          <SwiperSlide key={idx}>
            <GuideCard guide={guide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TourGuideSlider;
