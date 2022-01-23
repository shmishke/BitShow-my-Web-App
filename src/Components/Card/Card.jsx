import "./card.scss";
import { IoHeart, IoHeartDislike } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";

const Card = (props) => {
  const [addedToWatchlist, setAddedToWatchList] = useState(false);

  useEffect(() => {
    props.watchList && props.watchList.includes(props.show.id)
      ? setAddedToWatchList(true)
      : setAddedToWatchList(false);
  }, [props.watchList]);

  return (
    <>
      <div className="card">
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
            <img src={props.show.image.original} alt={props.show.name} />
            <div className="card-name">
              <div>{props.show.name}</div>
            </div>
          </div>
        </Link>
        <div className="card-info">
          {!addedToWatchlist ? (
            <button
              className="pointer"
              onClick={() => {
                setAddedToWatchList(true);
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
          ) : (
            <button
              className="remove pointer"
              onClick={() => {
                setAddedToWatchList(false);
                props.addAndRemoveStorageFunc.remove(
                  props.watchList,
                  props.addToWatchList,
                  props.show.id,
                  "watchList"
                );
              }}
            >
              Remove from Favorites{" "}
              <div className="btn-icon">
                <IoHeartDislike />
              </div>
            </button>
          )}

          <div className="genres">
            {props.show.genres.map((e) => {
              return <p>{e}</p>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
