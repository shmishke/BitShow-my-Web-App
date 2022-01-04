import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import "./carousel.scss";
import { FcLike } from "react-icons/fc";
import { TiStar } from "react-icons/ti";

const Carousel = (props) => {
  const [carouselShow, changeCarouselShow] = useState(0);

  const bestRatedShows = [...props.fetchResult]
    .sort((a, b) => {
      if (a.rating.average > b.rating.average) return -1;
      if (a.rating.average < b.rating.average) return 1;
      return 0;
    })
    .slice(0, 10);

  const details = bestRatedShows[carouselShow].summary
    .replace("<p>", "")
    .replace("</p>", "")
    .replace("</b>", "")
    .replace("<b>", "")
    .replace("<i>", "")
    .replace("</i>", "");

  return (
    <>
      <div className="carousel-container">
        <div className="carousel-img">
          <img src={bestRatedShows[carouselShow].image.original} alt="asd" />
        </div>
        <div className="carousel-info">
          <button>
            <FcLike /> Add to Watch Later
          </button>
          <div className="title-and-rating">
            <h2>{bestRatedShows[carouselShow].name}</h2>
            <div className="rating">
              <TiStar />
              {bestRatedShows[carouselShow].rating.average}
            </div>
          </div>
          <div className="carousel-details">
            <h3>Show details</h3>
            <p> {details} </p>
          </div>
        </div>
        <div className="btn1">
          {carouselShow !== 0 && (
            <>
              <button
                onClick={() => {
                  if (carouselShow > 0) changeCarouselShow(carouselShow - 1);
                }}
              >
                <BsArrowLeft />
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
                <BsArrowRight />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Carousel;