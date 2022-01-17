import { useState } from "react/cjs/react.development";
import WatchListCard from "../WatchListCard/WatchListCard";
import "./watchList.scss";

const WatchList = (props) => {
  const [showsToDisplay, setShowsToDisplay] = useState();
  const showsm = JSON.parse(window.localStorage.getItem("watchList"));

  return (
    <div className="page-container">
      <div className="watchlist-container">
        <div className="list">
          {showsm && (
            <>
              {showsm.map((e) => (
                <WatchListCard show={e} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchList;
