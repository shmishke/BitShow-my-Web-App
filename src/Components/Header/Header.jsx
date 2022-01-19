import "./header.scss";
import { FaSearch } from "react-icons/fa";
import { BsEye, BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import WatchListComponent from "../WatchListComponent/WatchListComponent.jsx";

const Header = (props) => {
  const [searchWidth, setSearchWidth] = useState(0);
  const [isButtonClicked, changeIsButtonClicked] = useState(false);
  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to="/">
            <h1>BitShow</h1>
          </Link>
        </div>
        <div className="buttons">
          <div className="search-btn">
            <input
              type="text"
              style={{ width: searchWidth }}
              placeholder="Search TV shows"
            />
            <button
              className="watchlist-toggle-btn "
              onClick={() => {
                if (searchWidth === 0) setSearchWidth(150);
                if (searchWidth > 0) setSearchWidth(0);
              }}
            >
              <FaSearch />
            </button>
          </div>
          <div className="watchlist-btn">
            {isButtonClicked ? (
              <button
                className="watchlist-toggle-btn eye-btn"
                onClick={() => {
                  changeIsButtonClicked(false);
                }}
              >
                <div className="eye">
                  <BsEyeFill />
                </div>
                <div
                  className={props.watchList ? "number" : "number display-none"}
                >
                  {props.watchList ? props.watchList.length : null}
                </div>
              </button>
            ) : (
              <button
                className="watchlist-toggle-btn eye-btn"
                onClick={() => {
                  changeIsButtonClicked(true);
                }}
              >
                <div className="eye">
                  <BsEye />
                </div>
                <div
                  className={props.watchList ? "number" : "number display-none"}
                >
                  {props.watchList ? props.watchList.length : null}
                </div>
              </button>
            )}
          </div>

          <div
            className="watchlist-btn "
            style={{ width: isButtonClicked ? "20vw" : 0 }}
          >
            <WatchListComponent
              fetchResult={props.fetchResult}
              watchList={props.watchList}
              addToWatchList={props.addToWatchList}
              addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
              recentlyViewedShows={props.recentlyViewedShows}
              changeRecentlyViewedShows={props.changeRecentlyViewedShows}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
