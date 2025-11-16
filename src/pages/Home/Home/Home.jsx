import React from "react";
import Bannar from "../Bannar/Bannar";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";

const reviewsPromise = fetch('/reviews.json').then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Bannar />
      <Brands />
      <Reviews reviewsPromise={reviewsPromise} />
    </div>
  );
};

export default Home;
