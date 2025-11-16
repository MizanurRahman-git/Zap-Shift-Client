import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from '../../../assets/brands/amazon.png'
import amazonVect from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import starPeople from '../../../assets/brands/start_people.png'
import { Autoplay } from "swiper/modules";

 
const images = [starPeople, star, randstad, moonstar, casio, amazonVect, amazon]


const Brands = () => {
  return (
    <div>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
      >
        {
            images.map(image => <SwiperSlide><img src={image} alt="logo" /></SwiperSlide>)
        }
        
      </Swiper>
    </div>
  );
};

export default Brands;
