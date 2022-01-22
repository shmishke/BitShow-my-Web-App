import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OneEpisode from "../../Components/SingleEpisode.jsx/OneEpisode";
import OnePerson from "../../Components/OnePerson/OnePerson";
import SmallCardlist from "../../Components/SmallCardlist/SmallCardlist";
import "./singlePage.scss";
import DisplayShowInfo from "../../Components/DisplayShowInfo/DisplayShowInfo";

const SinglePage = (props) => {
  const [cast, setCast] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [background, setBackground] = useState();
  const [numOfCast, changeNumOfCast] = useState(8);

  const { id } = useParams();
  const show = props.fetchResult.find((e) => e.id === Number(id));

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

  const allGenresOfShow = show.genres;

  const showMoreShows = (arr) => {
    const genres = arr.map((e) => {
      return props.fetchResult.filter(
        (el) => el.genres.includes(e) && el.id !== show.id
      );
    });
    const all = [];
    genres.forEach((e) => all.push(...e));
    const allShowsToDisplay = all.filter((e, i, arr) => i === arr.indexOf(e));
    if (!props.recentlyViewedShows) return allShowsToDisplay;
    else {
      const seenShows = allShowsToDisplay.filter((e) =>
        props.recentlyViewedShows.includes(e.id)
      );
      const restOfShows = allShowsToDisplay.filter(
        (e) => !props.recentlyViewedShows.includes(e.id)
      );
      return [...restOfShows, ...seenShows];
    }
  };

  const moreShows = showMoreShows(show.genres);

  let img = background
    ? background.find((e) => e.type === "background").resolutions.original.url
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);

    changeNumOfCast(8);

    fetch(`http://api.tvmaze.com/shows/${id}/cast`)
      .then((res) => res.json())
      .then((res) => setCast(res));

    fetch(`http://api.tvmaze.com/shows/${id}/episodes`)
      .then((res) => res.json())
      .then((res) => setEpisodes(res));
    fetch(`https://api.tvmaze.com/shows/${id}/images`)
      .then((res) => res.json())
      .then((res) => setBackground(res));
  }, [id]);

  if (episodes.length !== 0 && cast.length !== 0 && background)
    return (
      <div className="single-page-container">
        <h2>{show.name} </h2>
        <div
          className="top-of-single-page"
          style={{
            backgroundImage: `url(${img})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          /
          <DisplayShowInfo
            show={show}
            watchList={props.watchList}
            addToWatchList={props.addToWatchList}
            addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
            details={props.details}
          />
        </div>
        <div className="main">
          <h3 className="title">Best Rated episodes</h3>
          <div className="episodes">
            {bestRatedEpisodes.slice(0, 3).map((e) => (
              <OneEpisode e={e} details={props.details} />
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
                <OneEpisode e={e} details={props.details} />
              ))}
            </div>
          </div>
          {show.genres.length >= 1 && (
            <div className="more-by-genre">
              <h3 className="title">Similar Shows</h3>
              <SmallCardlist
                showsToDisplay={moreShows}
                recentlyViewedShows={props.recentlyViewedShows}
                changeRecentlyViewedShows={props.changeRecentlyViewedShows}
                watchList={props.watchList}
                addToWatchList={props.addToWatchList}
                addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
              />
            </div>
          )}
        </div>
      </div>
    );
  else return <p>Loading...</p>;
};

export default SinglePage;
