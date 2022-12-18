import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Stars({ ratingAvg, halfStar }) {
  const stars = [];

  for (let index = 0; index < ratingAvg ; index++) {
    stars.push(<FontAwesomeIcon key={index} icon={faStar} />);
  }

  return (
    <div>
      {stars}
      {halfStar && (
        <FontAwesomeIcon style={{ color: "yellow" }} icon={faStarHalf} />
      )}
    </div>
  );
}
