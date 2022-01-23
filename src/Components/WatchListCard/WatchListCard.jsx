import { useEffect, useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import "./watchListCard.scss";
import { RiStarSLine } from "react-icons/ri";
import { BsFillPlayFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdLocalMovies } from "react-icons/md";
import { BsCameraReelsFill } from "react-icons/bs";
import moment from "moment";

const WatchListCard = (props) => {
  const [seasonsAndEpisodes, setSeasonsAndEpisodes] = useState([]);

  const genre = props.show.genres.find((e, i) => {
    if (props.show.genres.length === 1) return i === 0;
    else return i === 1;
  });

  useEffect(() => {
    fetch(`http://api.tvmaze.com/shows/${props.show.id}/seasons`)
      .then((res) => res.json())
      .then((res) => setSeasonsAndEpisodes(res));
  }, [props.watchList]);
  console.log(props.show);
  return (
    <div className="watchlist-single-card">
      <div className="watchlist-img">
        <img src={props.show.image.original} alt="" />
      </div>
      <div className="watchlist-info">
        <div className="watchlist-top">
          <h3>{props.show.name}</h3>
          <div className="watchlist-rating">
            {props.show.rating.average && (
              <>
                <RiStarSLine />
                <h3>{props.show.rating.average} </h3>
              </>
            )}
          </div>
        </div>
        <div className="watchlist-main">
          <div className="seasons-episodes">
            <p>Seasons {seasonsAndEpisodes.length}</p>
            <p>
              Episodes{" "}
              {seasonsAndEpisodes.reduce((acc, e) => {
                const all = acc + Number(e.episodeOrder);
                return all;
              }, 0)}
            </p>
          </div>
          <div className="watchlist-show-info">
            <div className="watchlist-show-genre">
              {props.show.genres && genre === "Science-Fiction" ? "SF" : genre}
            </div>
            <div className="watchlist-show-date">
              <p>
                {moment(props.show.premiered).format("MMM YYYY")}
                {" - "}
                {props.show.ended
                  ? moment(props.show.ended).format("MMM YYYY")
                  : "Ongoing"}
              </p>
              <span>
                <BsCameraReelsFill />
              </span>
            </div>
          </div>
        </div>
        <div className="watchlist-buttons">
          <div className="pointer">
            <RiDeleteBin6Line
              onClick={() => {
                props.addAndRemoveStorageFunc.remove(
                  props.watchList,
                  props.addToWatchList,
                  props.show.id,
                  "watchList"
                );
              }}
            />
          </div>
          <div>
            <Link to={`/show/${props.show.id}`}>
              <BsFillPlayFill
                className="pointer"
                className="pointer"
                onClick={() => {
                  props.addAndRemoveStorageFunc.add(
                    props.recentlyViewedShows,
                    props.changeRecentlyViewedShows,
                    props.show.id,
                    "recentlyViewed"
                  );
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchListCard;
