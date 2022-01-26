import { IoHeart, IoHeartDislike } from "react-icons/io5";
import { AiTwotoneStar } from "react-icons/ai";

import { Link } from "react-router-dom";
import "./card.scss";
import { useState } from "react";

const Card = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <div
        className="card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/show/${props.show.id}`}>
          <div
            className="click-to"
            onClick={() => {
              props.addAndRemoveStorageFunc.add(
                props.recentlyViewedShows,
                props.changeRecentlyViewedShows,
                props.show.id,
                "recentlyViewed"
              );
            }}
          >
            <div className="image">
              <img src={props.show.image.original} alt={props.show.name} />
            </div>
            <div className="card-name">
              <div>{props.show.name}</div>
            </div>
          </div>
        </Link>
        <div className="card-info">
          {props.watchList ? (
            <>
              {!props.watchList.includes(props.show.id) ? (
                <button
                  className="pointer"
                  onClick={() => {
                    props.addAndRemoveStorageFunc.add(
                      props.watchList,
                      props.addToWatchList,
                      props.show.id,
                      "watchList"
                    );
                  }}
                >
                  Add to Watchlist
                  <div className="btn-icon">
                    <IoHeart />
                  </div>
                </button>
              ) : (
                <button
                  className="remove pointer"
                  onClick={() => {
                    props.addAndRemoveStorageFunc.remove(
                      props.watchList,
                      props.addToWatchList,
                      props.show.id,
                      "watchList"
                    );
                  }}
                >
                  Remove from Watchlist
                  <div className="btn-icon">
                    <IoHeartDislike />
                  </div>
                </button>
              )}
            </>
          ) : (
            <button
              className="pointer"
              onClick={() => {
                props.addAndRemoveStorageFunc.add(
                  props.watchList,
                  props.addToWatchList,
                  props.show.id,
                  "watchList"
                );
              }}
            >
              Add to favorites
              <div className="btn-icon">
                <IoHeart />
              </div>
            </button>
          )}
          <div className="genres">
            {props.show.genres.map((e, i) => {
              return (
                <Link to={`/shows/${e}`} key={i}>
                  <p>{e === "Science-Fiction" ? "Sci-Fi" : e} </p>
                </Link>
              );
            })}
          </div>
        </div>
        {props.show.rating.average && isHovered && (
          <div className="rating">
            {" "}
            <span>
              <AiTwotoneStar />
            </span>{" "}
            {props.show.rating.average}
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
