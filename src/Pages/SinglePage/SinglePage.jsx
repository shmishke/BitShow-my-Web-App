import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import "./singlePage.scss";
import { RiStarSLine } from "react-icons/ri";
import { GiStopwatch } from "react-icons/gi";
import { MdOutlineLiveTv } from "react-icons/md";
import moment from "moment";
import { FcLike } from "react-icons/fc";

const SinglePage = (props) => {
  const [seasons, setSeasons] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [sliceCrew, changeSliceCrew] = useState(5);

  const { id } = useParams();
  const show = props.fetchResult.find((e) => e.id === Number(id));

  useEffect(() => {
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
  }, []);

  console.log(show);

  const sliceThem = (par) => {
    return par.slice(0, sliceCrew);
  };

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
  console.log(bestRatedEpisodes);

  if (
    crew.length !== 0 &&
    episodes.length !== 0 &&
    cast.length !== 0 &&
    seasons.length !== 0
  )
    return (
      <div className="single-page-container">
        <h2>{show.name} </h2>
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
              <div>
                <button>
                  <FcLike />
                  Add to watchlist
                </button>
              </div>
            </div>
            {show.genres.length !== 0 && (
              <>
                <h3>Genres:</h3>
                <div className="genres">
                  {show.genres.map((e) => (
                    <h4>{e}</h4>
                  ))}
                </div>
              </>
            )}

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
            <div className="details">
              <h3>Show Details</h3>
              <p>{details(show)}</p>
            </div>
          </div>
        </div>
        <h3 className="title">Best Rated episodes</h3>
        <div className="episodes">
          <div className="single-episode">
            <h3>
              <div className="episode-top">
                {bestRatedEpisodes[0].name}
                <div className="episode-rating">
                  <RiStarSLine />
                  {bestRatedEpisodes[0].rating.average}
                </div>
              </div>
            </h3>
            <div className="episode-details">
              <h4>
                Season:{bestRatedEpisodes[0].season}, Episode:
                {bestRatedEpisodes[0].number}
              </h4>
              <p>{details(bestRatedEpisodes[0])}</p>
            </div>
            <div className="episode-bottom">
              <div>
                <MdOutlineLiveTv />
                {moment(bestRatedEpisodes[0].airdate).format("DD.MM.YYYY.")}
              </div>
              <div>
                <GiStopwatch /> {bestRatedEpisodes[0].runtime} min
              </div>
            </div>
          </div>
          <div className="single-episode">
            <h3>
              <div className="episode-top">
                {bestRatedEpisodes[1].name}
                <div className="episode-rating">
                  <RiStarSLine />
                  {bestRatedEpisodes[1].rating.average}
                </div>
              </div>
            </h3>
            <div className="episode-details">
              <h4>
                Season:{bestRatedEpisodes[1].season}, Episode:
                {bestRatedEpisodes[1].number}
              </h4>
              <p>{details(bestRatedEpisodes[1])}</p>
            </div>
            <div className="episode-bottom">
              <div>
                <MdOutlineLiveTv />
                {moment(bestRatedEpisodes[1].airdate).format("DD.MM.YYYY.")}
              </div>
              <div>
                <GiStopwatch /> {bestRatedEpisodes[1].runtime} min
              </div>
            </div>
          </div>
          <div className="single-episode">
            <h3>
              <div className="episode-top">
                {bestRatedEpisodes[2].name}
                <div className="episode-rating">
                  <RiStarSLine />
                  {bestRatedEpisodes[2].rating.average}
                </div>
              </div>
            </h3>
            <div className="episode-details">
              <h4>
                Season:{bestRatedEpisodes[2].season}, Episode:
                {bestRatedEpisodes[2].number}
              </h4>
              <p>{details(bestRatedEpisodes[2])}</p>
            </div>
            <div className="episode-bottom">
              <div>
                <MdOutlineLiveTv />
                {moment(bestRatedEpisodes[2].airdate).format("DD.MM.YYYY.")}
              </div>
              <div>
                <GiStopwatch /> {bestRatedEpisodes[2].runtime} min
              </div>
            </div>
          </div>
        </div>
        <h3 className="title">Cast and Crew</h3>
        <div className="cast-crew">
          <div className="cast">
            <h3>Cast</h3>
            {sliceThem(cast).map((e) => {
              return (
                <div className="single-person">
                  {e.person.image != null && e.person.image != undefined ? (
                    <img src={e.person.image.medium} alt="" />
                  ) : (
                    <img
                      src="https://www.neils.org/wp-content/uploads/2016/06/no-image.png"
                      alt=""
                    />
                  )}
                  <h3>
                    {e.person.name} as {e.character.name}
                  </h3>
                </div>
              );
            })}
          </div>
          <div className="crew">
            <h3>Crew</h3>
            {sliceThem(crew).map((e) => {
              return (
                <div className="single-person">
                  {e.person.image != null && e.person.image != undefined ? (
                    <img src={e.person.image.medium} alt="" />
                  ) : (
                    <img
                      src="https://www.neils.org/wp-content/uploads/2016/06/no-image.png"
                      alt=""
                    />
                  )}

                  <h3>
                    {e.person.name} as {e.type}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
        {sliceCrew === 5 ? (
          <p onClick={() => changeSliceCrew(crew.length)}>
            Show all cast and crew
          </p>
        ) : (
          <p onClick={() => changeSliceCrew(5)}>Hide cast and crew</p>
        )}
      </div>
    );
  else return <p>Loading...</p>;
};

export default SinglePage;
