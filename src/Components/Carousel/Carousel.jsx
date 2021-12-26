import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import "./carousel.scss";
import { FcLike } from "react-icons/fc";
import { TiStar } from "react-icons/ti";

const Carousel = (props) => {
  const [carouselShow, changeCarouselShow] = useState(0);

  const bestRatedShows = findTop10Shows(props.shows);
  const details = bestRatedShows[carouselShow].summary
    .replace("<p>", "")
    .replace("</p>", "")
    .replace("</b>", "")
    .replace("<b>", "")
    .replace("<i>", "")
    .replace("</i>", "");

  function findTop10Shows(arr) {
    const top10 = [];

    const top10Ratings = arr
      .map((e) => {
        return e.rating.average;
      })
      .sort((a, b) => {
        return a - b;
      })
      .reverse()
      .slice(0, 10)
      .filter((e, i, arr) => {
        return i === arr.indexOf(e);
      });

    const top10Shows = top10Ratings.map((e) => {
      return arr.filter((el) => {
        return e === el.rating.average;
      });
    });
    top10Shows.forEach((e) => {
      for (let i = 0; i < e.length; i++) {
        top10.push(e[i]);
      }
    });
    return top10.slice(0, 10);
  }
  console.log(bestRatedShows);
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
