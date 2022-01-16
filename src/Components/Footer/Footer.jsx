import "./footer.scss";
import { DiReact } from "react-icons/di";
import { DiJavascript1 } from "react-icons/di";
import SmallCardlist from "../SmallCardlist/SmallCardlist";

const Footer = (props) => {
  const showsToDisplay = () => {
    const ids = JSON.parse(
      window.localStorage.getItem("recentlyViewed")
    ).filter((e) => e != props.currentShow);

    return ids.map((e) => props.fetchResult.find((el) => el.id === e));
  };
  return (
    <>
      <div className="footer">
        <div className="footer-recently-viewed">
          {props.recentlyViewedShows &&
            (props.recentlyViewedShows.length > 1 ? (
              <>
                <h3>Recently Viewed</h3>
                <SmallCardlist
                  showsToDisplay={showsToDisplay()}
                  recentlyViewedShows={props.recentlyViewedShows}
                  changeRecentlyViewedShows={props.changeRecentlyViewedShows}
                  changeCurrentShow={props.changeCurrentShow}
                  watchList={props.watchList}
                  addToWatchList={props.addToWatchList}
                />
              </>
            ) : null)}
        </div>
        <div className="footer-text">
          <h6>
            <DiReact /> Milos Delic 2021 <DiJavascript1 />
          </h6>
        </div>
        <button
          onClick={() => {
            window.localStorage.removeItem("watchList");
            window.localStorage.removeItem("recentlyViewed");
            props.changeRecentlyViewedShows(null);
            props.addToWatchList(null);
          }}
        >
          aewee
        </button>
      </div>
    </>
  );
};

export default Footer;
