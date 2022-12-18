import React, { useState } from "react";
import Stars from "./Stars";

export default function StarsRating({ rating, ratingTotal }) {
  const renderStars = () => {
    if (rating) {
      if (Number.isInteger(rating)) {
        return <Stars ratingAvg={rating} halfStar={false} />;
      } else {
        return <Stars ratingAvg={Math.floor(rating)} halfStar={true} />;
      }
    }
  };

  return (
    <div>
      <div>{renderStars()}</div>
      <div>{ratingTotal}ratings</div>
    </div>
  );
}
