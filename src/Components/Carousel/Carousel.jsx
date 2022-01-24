import "./carousel.scss";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import DisplayShowInfo from "../../Components/DisplayShowInfo/DisplayShowInfo";

const Carousel = (props) => {
  const [carouselShow, changeCarouselShow] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const bestRatedShows = [...props.fetchResult]
    .sort((a, b) => {
      if (a.rating.average > b.rating.average) return -1;
      if (a.rating.average < b.rating.average) return 1;
      return 0;
    })
    .slice(0, 10);

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DisplayShowInfo
        show={bestRatedShows[carouselShow]}
        watchList={props.watchList}
        addToWatchList={props.addToWatchList}
        addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
        details={props.details}
      />
      <div className="btn1">
        {isHovered && carouselShow !== 0 && (
          <>
            <button
              onClick={() => {
                if (carouselShow > 0) changeCarouselShow(carouselShow - 1);
              }}
            >
              <FaAngleLeft />
            </button>
          </>
        )}
      </div>
      <div className="btn2">
        {isHovered && carouselShow < 9 && (
          <>
            <button
              onClick={() => {
                if (carouselShow < 10) changeCarouselShow(carouselShow + 1);
              }}
            >
              <FaAngleRight />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Carousel;
