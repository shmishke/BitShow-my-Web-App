import "./header.scss";
import { FaSearch } from "react-icons/fa";
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
              onClick={() => {
                if (searchWidth === 0) setSearchWidth(150);
                if (searchWidth > 0) setSearchWidth(0);
              }}
            >
              <FaSearch />
            </button>
          </div>
          {isButtonClicked ? (
            <button
              onClick={() => {
                changeIsButtonClicked(false);
              }}
            >
              close watchlist
            </button>
          ) : (
            <button
              onClick={() => {
                changeIsButtonClicked(true);
              }}
            >
              watchlist
            </button>
          )}

          <div
            className="watchlist-btn "
            style={{ width: isButtonClicked ? "20vw" : 0 }}
          >
            <WatchListComponent
              fetchResult={props.fetchResult}
              watchList={props.watchList}
              addToWatchList={props.addToWatchList}
              addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
