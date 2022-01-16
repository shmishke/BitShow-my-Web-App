import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singlePage.scss";
import { RiStarSLine } from "react-icons/ri";
import { GiStopwatch } from "react-icons/gi";
import { MdOutlineLiveTv } from "react-icons/md";
import moment from "moment";
import variables from "../../variables.module.scss";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import OneEpisode from "../../Components/SingleEpisode.jsx/OneEpisode";
import OnePerson from "../../Components/OnePerson/OnePerson";
import SmallCardlist from "../../Components/SmallCardlist/SmallCardlist";

const SinglePage = (props) => {
  const [seasons, setSeasons] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [background, setBackground] = useState();
  const [numOfCast, changeNumOfCast] = useState(8);

  const [imageSlice, changeImageSlice] = useState(0);
  const [imageSliceEnd, changeImageSliceEnd] = useState(4);

  const { id } = useParams();
  const show = props.fetchResult.find((e) => e.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    changeImageSlice(0);
    changeImageSliceEnd(4);
    changeNumOfCast(8);

    fetch(`http://api.tvmaze.com/shows/${id}/seasons`)
      .then((res) => res.json())
      .then((res) => setSeasons(res));
    fetch(`http://api.tvmaze.com/shows/${id}/cast`)
      .then((res) => res.json())
      .then((res) => setCast(res));
    fetch(`http://api.tvmaze.com/shows/${id}/crew`)
      .then((res) => res.json())
      .then((res) => setCrew(res));
    fetch(`http://api.tvmaze.com/shows/${id}/episodes`)
      .then((res) => res.json())
      .then((res) => setEpisodes(res));
    fetch(`https://api.tvmaze.com/shows/${id}/images`)
      .then((res) => res.json())
      .then((res) => setBackground(res));
  }, [id]);
  const details = (det) => {
    return det.summary
      .replace("<p>", "")
      .replace("</p>", "")
      .replace("</b>", "")
      .replace("<b>", "")
      .replace("<i>", "")
      .replace("</i>", "");
  };

  const bestRatedEpisodes = [...episodes]
    .sort((a, b) => {
      if (a.rating.average > b.rating.average) return -1;
      if (a.rating.average < b.rating.average) return 1;
      return 0;
    })
    .slice(0, 3);

  const mostRecentEpisodes = [...episodes]
    .sort((a, b) => {
      if (a.airdate > b.airdate) return -1;
      if (a.airdate < b.airdate) return 1;
      return 0;
    })
    .slice(0, 3);

  const showCast = (par) => {
    return par.slice(0, numOfCast);
  };

  const allGenresOfShow = [];

  const showMoreShows = (arr) => {
    const genres = arr.map((e) => {
      return props.fetchResult.filter(
        (el) => el.genres.includes(e) && el.id !== show.id
      );
    });
    const all = [];
    genres.forEach((e) => all.push(...e));
    return all.filter((e, i, arr) => i === arr.indexOf(e));
  };

  const moreShows = showMoreShows(show.genres);

  let img = background
    ? background.find((e) => e.type === "background").resolutions.original.url
    : null;

  if (
    episodes.length !== 0 &&
    cast.length !== 0 &&
    seasons.length !== 0 &&
    crew.length !== 0 &&
    background
  )
    return (
      <div className="single-page-container">
        <h2>{show.name} </h2>
        <div
          className="top-of-single-page"
          style={{
            backgroundImage: `url(${img})`,
            backgroundColor: variables.mainColor,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          /
          <div className="image-info">
            <div className="image">
              <img src={show.image.original} alt="#" />
            </div>
            <div className="info">
              <div className="top">
                <div>
                  <RiStarSLine /> Average Rating:
                  <h3>{show.rating.average} </h3>
                </div>
                <div>
                  <GiStopwatch /> Average Runtime:
                  <h3>{show.averageRuntime} min</h3>
                </div>
                <div>
                  <MdOutlineLiveTv /> Premiered:
                  <h3> {moment(show.premiered).format("DD.MM.YYYY.")}</h3>
                </div>
                <div className="add-to-watchlist">
                  <button>Add to watchlist</button>
                  <div className="heart">
                    <FaRegHeart />
                  </div>
                </div>
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
                <p>{details(show)}</p>
              </div>
              {show.genres.length !== 0 && (
                <>
                  <div className="genres-container">
                    <h3>Genres:</h3>
                    <div className="genres">
                      {show.genres.map((e) => {
                        allGenresOfShow.push(e);
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
        </div>
        <div className="main">
          <h3 className="title">Best Rated episodes</h3>
          <div className="episodes">
            {bestRatedEpisodes.slice(0, 3).map((e) => (
              <OneEpisode e={e} details={details} />
            ))}
          </div>
          <div className="cast-and-recent-episode">
            <div className="cast-container">
              <h3 className="title">Cast</h3>
              <div className="cast">
                {showCast(cast).map((e) => (
                  <OnePerson e={e} />
                ))}
              </div>

              {cast.length > 8 ? (
                numOfCast === 8 ? (
                  <div className="show-more">
                    <p onClick={() => changeNumOfCast(cast.length)}>
                      Show all cast
                    </p>
                  </div>
                ) : (
                  <div className="show-more">
                    <p onClick={() => changeNumOfCast(8)}>Hide all cast</p>
                  </div>
                )
              ) : null}
            </div>
            <div className="recent-episodes">
              <h3 className="title">Most recent episodes</h3>
              {mostRecentEpisodes.slice(0, 3).map((e) => (
                <OneEpisode e={e} details={details} />
              ))}
            </div>
          </div>
          {allGenresOfShow.length >= 1 && (
            <div className="more-by-genre">
              <h3 className="title">Similar Shows</h3>
              <SmallCardlist
                showsToDisplay={moreShows}
                recentlyViewedShows={props.recentlyViewedShows}
                changeRecentlyViewedShows={props.changeRecentlyViewedShows}
                changeCurrentShow={props.changeCurrentShow}
                watchList={props.watchList}
                addToWatchList={props.addToWatchList}
              />
            </div>
          )}
        </div>
      </div>
    );
  else return <p>Loading...</p>;
};

export default SinglePage;
