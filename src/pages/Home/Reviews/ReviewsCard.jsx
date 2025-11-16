import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewsCard = ({ review }) => {
  const {userName, user_photoURL, review:description} = review;
  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl shadow-lg bg-base-100 border border-gray-200">
      <FaQuoteLeft className="text-3xl text-primary mb-4" />

      <p className="text-gray-600 leading-relaxed mb-6">
        {description}
      </p>

      <div className="border-t border-dashed border-gray-300 mt-4 pt-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary">
            <img src={user_photoURL} alt="image" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800">{userName}</h3>
          <p className="text-sm text-gray-500">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;
