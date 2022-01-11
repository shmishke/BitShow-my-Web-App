import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singlePage.scss";
import { RiStarSLine } from "react-icons/ri";
import { GiStopwatch } from "react-icons/gi";
import { MdOutlineLiveTv } from "react-icons/md";
import moment from "moment";
import Card from "../../Components/Card/Card";
import { Link } from "react-router-dom";
import variables from "../../variables.module.scss";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const SinglePage = (props) => {
  const [seasons, setSeasons] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [background, setBackground] = useState();
  const [numOfCast, changeNumOfCast] = useState(8);
  const [genreOneSliceBegin, setGenreOneSliceBegin] = useState(0);
  const [genreOneSliceEnd, setGenreOneSliceEnd] = useState(4);
  const [genreTwoSliceBegin, setGenreTwoSliceBegin] = useState(0);
  const [genreTwoSliceEnd, setGenreTwoSliceEnd] = useState(4);
  const [genreThreeSliceBegin, setGenreThreeSliceBegin] = useState(0);
  const [genreThreeSliceEnd, setGenreThreeSliceEnd] = useState(4);
  const [imageSlice, changeImageSlice] = useState(0);
  const [imageSliceEnd, changeImageSliceEnd] = useState(4);

  const { id } = useParams();
  const show = props.fetchResult.find((e) => e.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
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
  console.log(bestRatedEpisodes);
  console.log(props.fetchResult);
  console.log(episodes);

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
  console.log(episodes);

  const showMoreShows = (arr) => {
    return arr.map((e) => {
      return props.fetchResult.filter(
        (el) => el.genres.includes(e) && el.id !== show.id
      );
    });
  };

  const moreShowsByGenre = showMoreShows(show.genres);
  console.log(moreShowsByGenre);

  let img = background
    ? background.find((e) => e.type === "background").resolutions.original.url
    : null;

  console.log(crew);

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
            background: img ? `url(${img})` : variables.mainColor,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          \
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
                      Starring: {cast[0].person.name} , {cast[1].person.name}
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
              {bestRatedEpisodes[0].summary ? (
                <p>{details(bestRatedEpisodes[0])}</p>
              ) : null}
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
              {bestRatedEpisodes[1].summary ? (
                <p>{details(bestRatedEpisodes[1])}</p>
              ) : null}
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
              {bestRatedEpisodes[2].summary ? (
                <p>{details(bestRatedEpisodes[2])}</p>
              ) : null}
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
        <div className="cast-and-recent-episode">
          <div className="cast-container">
            <h3 className="title">Cast</h3>
            <div className="cast">
              {showCast(cast).map((e) => {
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
            {cast.length > 8 ? (
              numOfCast === 8 ? (
                <p onClick={() => changeNumOfCast(cast.length)}>
                  Show all cast
                </p>
              ) : (
                <p onClick={() => changeNumOfCast(8)}>Hide all cast</p>
              )
            ) : null}
          </div>

          <div className="recent-episodes">
            <h3 className="title">Most recent episodes</h3>
            <div className="single-episode">
              <h3>
                <div className="episode-top">
                  {mostRecentEpisodes[0].name}
                  <div className="episode-rating">
                    <RiStarSLine />
                    {mostRecentEpisodes[0].rating.average}
                  </div>
                </div>
              </h3>
              <div className="episode-details">
                <h4>
                  Season:{mostRecentEpisodes[0].season}, Episode:
                  {mostRecentEpisodes[0].number}
                </h4>
                {mostRecentEpisodes[0].summary ? (
                  <p>{details(mostRecentEpisodes[0])}</p>
                ) : null}
              </div>
              <div className="episode-bottom">
                <div>
                  <MdOutlineLiveTv />
                  {moment(mostRecentEpisodes[0].airdate).format("DD.MM.YYYY.")}
                </div>
                <div>
                  <GiStopwatch /> {mostRecentEpisodes[0].runtime} min
                </div>
              </div>
            </div>
            <div className="single-episode">
              <h3>
                <div className="episode-top">
                  {mostRecentEpisodes[1].name}
                  <div className="episode-rating">
                    <RiStarSLine />
                    {mostRecentEpisodes[1].rating.average}
                  </div>
                </div>
              </h3>
              <div className="episode-details">
                <h4>
                  Season:{mostRecentEpisodes[1].season}, Episode:
                  {mostRecentEpisodes[1].number}
                </h4>
                {mostRecentEpisodes[1].summary ? (
                  <p>{details(mostRecentEpisodes[1])}</p>
                ) : null}
              </div>
              <div className="episode-bottom">
                <div>
                  <MdOutlineLiveTv />
                  {moment(mostRecentEpisodes[1].airdate).format("DD.MM.YYYY.")}
                </div>
                <div>
                  <GiStopwatch /> {mostRecentEpisodes[1].runtime} min
                </div>
              </div>
            </div>
            <div className="single-episode">
              <h3>
                <div className="episode-top">
                  {mostRecentEpisodes[2].name}
                  <div className="episode-rating">
                    <RiStarSLine />
                    {mostRecentEpisodes[2].rating.average}
                  </div>
                </div>
              </h3>
              <div className="episode-details">
                <h4>
                  Season:{mostRecentEpisodes[2].season}, Episode:
                  {mostRecentEpisodes[2].number}
                </h4>
                {mostRecentEpisodes[2].summary ? (
                  <p>{details(mostRecentEpisodes[2])}</p>
                ) : null}
              </div>
              <div className="episode-bottom">
                <div>
                  <MdOutlineLiveTv />
                  {moment(mostRecentEpisodes[2].airdate).format("DD.MM.YYYY.")}
                </div>
                <div>
                  <GiStopwatch /> {mostRecentEpisodes[2].runtime} min
                </div>
              </div>
            </div>
          </div>
        </div>
        {allGenresOfShow.length >= 1 && (
          <div className="more-by-genre">
            <h3>More {allGenresOfShow[0]}</h3>
            <div className="single-genre-search">
              <button
                disabled={genreOneSliceBegin === 0}
                onClick={() => {
                  setGenreOneSliceBegin(genreOneSliceBegin - 4);
                  setGenreOneSliceEnd(genreOneSliceEnd - 4);
                }}
              >
                {"<"}
              </button>
              {moreShowsByGenre[0]
                .slice(genreOneSliceBegin, genreOneSliceEnd)
                .map((e) => {
                  return (
                    <Link to={`/show/${e.id}`}>
                      <Card show={e} />;
                    </Link>
                  );
                })}
              <button
                disabled={genreOneSliceBegin >= moreShowsByGenre[0].length - 4}
                onClick={() => {
                  setGenreOneSliceBegin(genreOneSliceBegin + 4);
                  setGenreOneSliceEnd(genreOneSliceEnd + 4);
                }}
              >
                {">"}
              </button>
            </div>
            {allGenresOfShow.length >= 2 && (
              <>
                <h3>More {allGenresOfShow[1]}</h3>
                <div className="single-genre-search">
                  <button
                    disabled={genreTwoSliceBegin === 0}
                    onClick={() => {
                      setGenreTwoSliceBegin(genreTwoSliceBegin - 4);
                      setGenreTwoSliceEnd(genreTwoSliceEnd - 4);
                    }}
                  >
                    {"<"}
                  </button>

                  {moreShowsByGenre[1]
                    .slice(genreTwoSliceBegin, genreTwoSliceEnd)
                    .map((e) => {
                      return (
                        <Link to={`/show/${e.id}`}>
                          <Card show={e} />;
                        </Link>
                      );
                    })}
                  <button
                    disabled={
                      genreTwoSliceBegin >= moreShowsByGenre[1].length - 4
                    }
                    onClick={() => {
                      setGenreTwoSliceBegin(genreTwoSliceBegin + 4);
                      setGenreTwoSliceEnd(genreTwoSliceEnd + 4);
                    }}
                  >
                    {">"}
                  </button>
                </div>
              </>
            )}
            {allGenresOfShow.length >= 3 && (
              <>
                <h3>More {allGenresOfShow[2]}</h3>
                <div className="single-genre-search">
                  <button
                    disabled={genreThreeSliceBegin === 0}
                    onClick={() => {
                      setGenreThreeSliceBegin(genreThreeSliceBegin - 4);
                      setGenreThreeSliceEnd(genreThreeSliceEnd - 4);
                    }}
                  >
                    {"<"}
                  </button>

                  {moreShowsByGenre[2]
                    .slice(genreThreeSliceBegin, genreThreeSliceEnd)
                    .map((e) => {
                      return (
                        <Link to={`/show/${e.id}`}>
                          <Card show={e} />;
                        </Link>
                      );
                    })}
                  <button
                    disabled={
                      genreThreeSliceBegin >= moreShowsByGenre[2].length - 4
                    }
                    onClick={() => {
                      setGenreThreeSliceBegin(genreThreeSliceBegin + 4);
                      setGenreThreeSliceEnd(genreThreeSliceEnd + 4);
                    }}
                  >
                    {">"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  else return <p>Loading...</p>;
};

export default SinglePage;
