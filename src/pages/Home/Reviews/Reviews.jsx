import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewsCard from "./ReviewsCard";

const Reviews = ({ reviewsPromise }) => {
  const reviewsData = use(reviewsPromise);
  return (
    <div className="my-24">
      <div className="text-center mb-18">
        <h1 className="text-2xl text-center font-bold my-5">Reviews</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
          laboriosam dicta dolores suscipit numquam cumque, libero, optio
          reiciendis eos ratione doloremque eligendi. In, quidem reiciendis.
          Aperiam maiores cum error voluptates.
        </p>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={30}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          scale: 0.75,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        pagination={true}
        className="mySwiper"
      >
        {reviewsData.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewsCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
