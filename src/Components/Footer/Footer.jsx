import "./footer.scss";
import { DiReact } from "react-icons/di";
import { DiJavascript1 } from "react-icons/di";
import SmallCardlist from "../SmallCardlist/SmallCardlist";
import { useLocation } from "react-router-dom";

const Footer = (props) => {
  const location = useLocation();
  const currentShow = Number.parseInt(location.pathname.split("/")[2]);

  const showsToDisplay = () => {
    const ids = JSON.parse(
      window.localStorage.getItem("recentlyViewed")
    ).filter((e) => Number(e) !== currentShow);
    return ids.map((e) => props.fetchResult.find((el) => el.id === Number(e)));
  };

  return (
    <>
      <div className="footer">
        <div className="cardlist-similar">
          {props.recentlyViewedShows &&
            (props.recentlyViewedShows.length > 1 ? (
              <>
                <h3>Recently Viewed</h3>

                <SmallCardlist
                  showsToDisplay={showsToDisplay()}
                  recentlyViewedShows={props.recentlyViewedShows}
                  changeRecentlyViewedShows={props.changeRecentlyViewedShows}
                  watchList={props.watchList}
                  addToWatchList={props.addToWatchList}
                  addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
                />
              </>
            ) : null)}
        </div>
        <div className="footer-text">
          <h6>
            <DiReact /> Milos Delic 2022 <DiJavascript1 />
          </h6>
          <div className="icons"></div>
        </div>
        <button
          className="pointer"
          onClick={() => {
            window.localStorage.removeItem("watchList");
            window.localStorage.removeItem("recentlyViewed");
            props.changeRecentlyViewedShows(null);
            props.addToWatchList(null);
          }}
        >
          Clear Local Storage
        </button>
      </div>
    </>
  );
};

export default Footer;
