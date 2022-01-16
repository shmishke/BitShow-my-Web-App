import "./card.scss";
import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";

const Card = (props) => {
  const [addedToWatchlist, setAddedToWatchList] = useState();

  const showsInWatchlist = JSON.parse(window.localStorage.getItem("watchList"));

  const addToStorage = (clickedShows, setClickedShows, storageName) => {
    if (clickedShows) {
      const shows = [
        props.show.id,
        ...clickedShows.filter((e) => e != props.show.id),
      ];
      setClickedShows(shows);
      window.localStorage.setItem(storageName, JSON.stringify(shows));
    } else {
      window.localStorage.setItem(storageName, JSON.stringify([props.show.id]));
      setClickedShows([props.show.id]);
    }
  };

  useEffect(() => {
    if (showsInWatchlist && showsInWatchlist.includes(props.show.id)) {
      setAddedToWatchList(true);
    } else setAddedToWatchList(false);
  }, [showsInWatchlist]);

  return (
    <>
      <div className="card">
        <Link to={`/show/${props.show.id}`}>
          <div
            className="click-to"
            onClick={() => {
              props.changeCurrentShow(props.show.id);
              addToStorage(
                props.recentlyViewedShows,
                props.changeRecentlyViewedShows,
                "recentlyViewed"
              );
            }}
          >
            <img src={props.show.image.original} alt={props.show.name} />
            <div className="card-name">
              <h1>{props.show.name}</h1>
            </div>
          </div>
        </Link>
        <div className="card-info">
          {!addedToWatchlist ? (
            <button
              onClick={() => {
                setAddedToWatchList(true);
                addToStorage(
                  props.watchList,
                  props.addToWatchList,
                  "watchList"
                );
              }}
            >
              <FcLike /> Add to favorites
            </button>
          ) : (
            <button
              onClick={() => {
                setAddedToWatchList(false);
                const shows = JSON.parse(
                  window.localStorage.getItem("watchList")
                ).filter((e) => e !== props.show.id);
                console.log(shows);
                if (shows.length === 0) {
                  props.addToWatchList(null);
                  window.localStorage.removeItem("watchList");
                } else {
                  window.localStorage.setItem(
                    "watchList",
                    JSON.stringify(shows)
                  );
                }
              }}
            >
              <FcLike /> Remove from Favorites
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
