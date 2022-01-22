import "./displayShowInfo.scss";
import { useState } from "react";
import { RiStarSLine } from "react-icons/ri";
import { GiStopwatch } from "react-icons/gi";
import { MdOutlineLiveTv } from "react-icons/md";
import {
  FaAngleLeft,
  FaAngleRight,
  FaHeartBroken,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import moment from "moment";
import { useEffect } from "react/cjs/react.development";
import { Link } from "react-router-dom";

const DisplayShowInfo = (props) => {
  const [imageSlice, changeImageSlice] = useState(0);
  const [imageSliceEnd, changeImageSliceEnd] = useState(4);
  const [addedOrHoveredBtn, setAddedOrHoveredBtn] = useState({
    added: false,
    hovered: false,
  });
  const [crew, setCrew] = useState([]);
  const [cast, setCast] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    changeImageSlice(0);
    changeImageSliceEnd(4);
    if (props.watchList && props.watchList.includes(Number(props.show.id))) {
      setAddedOrHoveredBtn({ added: true, hovered: false });
    } else setAddedOrHoveredBtn({ added: false, hovered: false });

    fetch(`http://api.tvmaze.com/shows/${props.show.id}/crew`)
      .then((res) => res.json())
      .then((res) => setCrew(res));
    fetch(`http://api.tvmaze.com/shows/${props.show.id}/cast`)
      .then((res) => res.json())
      .then((res) => setCast(res));
    fetch(`http://api.tvmaze.com/shows/${props.show.id}/seasons`)
      .then((res) => res.json())
      .then((res) => setSeasons(res));
    fetch(`http://api.tvmaze.com/shows/${props.show.id}/episodes`)
      .then((res) => res.json())
      .then((res) => setEpisodes(res));
  }, [props.show.id]);

  useEffect(() => {
    if (props.watchList && props.watchList.includes(Number(props.show.id))) {
      setAddedOrHoveredBtn({ added: true, hovered: false });
    } else setAddedOrHoveredBtn({ added: false, hovered: false });
  }, [props.watchList]);

  if (
    crew.length > 0 &&
    cast.length > 0 &&
    seasons.length > 0 &&
    episodes.length > 0
  )
    return (
      <div className="image-info">
        <div className="image">
          <img src={props.show.image.original} alt="#" />
        </div>
        <div className="info">
          <div className="top">
            <div>
              <RiStarSLine /> Average Rating:
              <h3>{props.show.rating.average} </h3>
            </div>
            <div>
              <GiStopwatch /> Average Runtime:
              <h3>{props.show.averageRuntime} min</h3>
            </div>
            <div>
              <MdOutlineLiveTv /> Premiered:
              <h3> {moment(props.show.premiered).format("DD.MM.YYYY.")}</h3>
            </div>
            <div
              className="add-to-watchlist"
              onMouseEnter={() =>
                setAddedOrHoveredBtn({
                  added: addedOrHoveredBtn.added,
                  hovered: true,
                })
              }
              onMouseLeave={() =>
                setAddedOrHoveredBtn({
                  added: addedOrHoveredBtn.added,
                  hovered: false,
                })
              }
            >
              {addedOrHoveredBtn.added ? (
                <div
                  className="add-to-watchlist-btn"
                  onClick={() => {
                    props.addAndRemoveStorageFunc.remove(
                      props.watchList,
                      props.addToWatchList,
                      props.show.id,
                      "watchList"
                    );
                    setAddedOrHoveredBtn({ added: false, hovered: false });
                  }}
                >
                  {addedOrHoveredBtn.hovered ? (
                    <div className="add-to-watch-list-text">
                      Remove from watchlist
                      <div className="heart">
                        <FaHeartBroken />
                      </div>
                    </div>
                  ) : (
                    <div className="add-to-watch-list-text">
                      Added to watchlist
                      <div className="heart">
                        <FaHeart />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="add-to-watchlist-btn"
                  onClick={() => {
                    props.addAndRemoveStorageFunc.add(
                      props.watchList,
                      props.addToWatchList,
                      props.show.id,
                      "watchList"
                    );
                    setAddedOrHoveredBtn({ added: true, hovered: false });
                  }}
                >
                  <div className="add-to-watch-list-text">
                    Add to watchlist
                    <div className="heart">
                      <FaRegHeart />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="show-name">
            <Link to={`/show/${props.show.id}`}>
              <h1>{props.show.name}</h1>
            </Link>
          </div>
          <div className="seasons-episodes">
            <h3>
              {seasons.length == 1
                ? "One season"
                : `Seasons (${seasons.length})`}
            </h3>
            <span> {"</>"} </span>
            <h3>
              Episodes (
              {seasons.reduce((acc, e) => {
                const all = acc + Number(e.episodeOrder);
                return all;
              }, 0)}
              )
            </h3>
          </div>
          {episodes[0].image && (
            <div className="images-container">
              <h3>Images</h3>
              <div className="images">
                <button
                  onClick={() => {
                    changeImageSlice(imageSlice - 4);
                    changeImageSliceEnd(imageSliceEnd - 4);
                  }}
                  disabled={imageSlice === 0}
                >
                  <FaAngleLeft />
                </button>
                {episodes.slice(imageSlice, imageSliceEnd).map((e) => {
                  return (
                    <div className="single-image">
                      <img src={e.image.original} alt="" />
                    </div>
                  );
                })}
                <button
                  onClick={() => {
                    changeImageSlice(imageSlice + 4);
                    changeImageSliceEnd(imageSliceEnd + 4);
                  }}
                  disabled={imageSliceEnd >= episodes.length}
                >
                  <FaAngleRight />
                </button>
              </div>
            </div>
          )}
          <h3>Show Details</h3>
          <div className="details">
            <p>{props.details(props.show)}</p>
          </div>
          {props.show.genres.length !== 0 && (
            <>
              <div className="genres-container">
                <h3>Genres:</h3>
                <div className="genres">
                  {props.show.genres.map((e) => {
                    return <h4>{e}</h4>;
                  })}
                </div>
              </div>
            </>
          )}
          <div className="stars-creator">
            <div className="stars">
              {cast.length > 1 ? (
                <h3>
                  Starring: {cast[0].person.name} / {cast[1].person.name}
                </h3>
              ) : (
                <h3>Starring: {cast[0].person.name}</h3>
              )}
            </div>
            <div className="creator">
              {crew.find((e) => e.type === "Creator") ? (
                <h3>
                  Created by:
                  {crew.find((e) => e.type === "Creator").person.name}
                </h3>
              ) : (
                <h3>
                  Produced by:
                  {
                    crew.find((e) => e.type === "Executive Producer").person
                      .name
                  }
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  else return null;
};

export default DisplayShowInfo;
