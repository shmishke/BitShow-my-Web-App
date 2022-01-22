import { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import "./carousel.scss";
import { FcLike } from "react-icons/fc";
import { TiStar } from "react-icons/ti";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import DisplayShowInfo from "../../Components/DisplayShowInfo/DisplayShowInfo";

const Carousel = (props) => {
  const [carouselShow, changeCarouselShow] = useState(0);

  const bestRatedShows = [...props.fetchResult]
    .sort((a, b) => {
      if (a.rating.average > b.rating.average) return -1;
      if (a.rating.average < b.rating.average) return 1;
      return 0;
    })
    .slice(0, 10);

  const showId = bestRatedShows[carouselShow].id;

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${showId}/images`)
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, [showId]);
  console.log(bestRatedShows);

  return (
    <div className="carousel-container">
      <DisplayShowInfo
        show={bestRatedShows[carouselShow]}
        watchList={props.watchList}
        addToWatchList={props.addToWatchList}
        addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
        details={props.details}
      />
      <div className="btn1">
        {carouselShow !== 0 && (
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
        {carouselShow < 9 && (
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
