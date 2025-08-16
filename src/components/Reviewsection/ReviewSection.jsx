import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Rashik",
    text: "Amazing experience! The tour guide was very helpful and the destinations were breathtaking.",
    avatar: "https://i.pravatar.cc/100?img=1",
    star: 4,
  },
  {
    name: "Maria",
    text: "Loved every moment! The arrangements were perfect and the support team was friendly.",
    avatar: "https://i.pravatar.cc/100?img=2",
    star: 5,
  },
  {
    name: "John",
    text: "A fantastic journey! Everything was organized perfectly and the team was super supportive.",
    avatar: "https://i.pravatar.cc/100?img=3",
    star: 4,
  },
  {
    name: "Sophia",
    text: "Highly recommend! Beautiful places, amazing service, and unforgettable memories.",
    avatar: "https://i.pravatar.cc/100?img=4",
    star: 5,
  },
];

const ReviewSection = () => {
  return (
    <section className="mb-16">
      <div className="container mx-auto px-6 md:px-0 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-3 text-primary">
          What Our Clients Say
        </h2>
        <p className="text-gray-400 mb-12">
          Hear from our travelers who loved their journey
        </p>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          autoplay={{ delay: 2000 }}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx}>
              <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 my-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={review.avatar}
                    alt="Profile Picture"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-left">
                      {review.name}
                    </h3>
                    <p className="text-gray-600 text-sm dark:text-gray-400">
                      CEO, Coffee Shop App
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <div className="flex text-orange-400">
                    {Array.from({ length: review.star }).map((_, index) => (
                      <span key={index}>★</span>
                    ))}
                  </div>
                  <span className="ml-2 font-bold text-gray-600 dark:text-gray-300">
                    {review.star}.0
                  </span>
                </div>
                <p className="mt-4 text-gray-700 text-sm text-start dark:text-gray-400">
                  {review.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewSection;
