import React, { use } from "react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewsCard from "./ReviewsCard";

const Reviews = ({ reviewsPromise }) => {
  const reviewsData = use(reviewsPromise);
  console.log(reviewsData);
  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl text-center font-bold">Reviews</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
          laboriosam dicta dolores suscipit numquam cumque, libero, optio
          reiciendis eos ratione doloremque eligendi. In, quidem reiciendis.
          Aperiam maiores cum error voluptates.
        </p>
      </div>
      <>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {reviewsData.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewsCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default Reviews;
