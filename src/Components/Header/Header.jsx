import "./header.scss";
import { BsEye, BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import WatchListComponent from "../WatchListComponent/WatchListComponent.jsx";
import SearchButon from "../SearchButton/SearchButton";

const Header = (props) => {
  const [isButtonClicked, changeIsButtonClicked] = useState(false);
  const [width, setWidth] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="header" onClick={() => props.changeActivePage(0)}>
        <div className="logo pointer">
          <Link to="/">
            <h1>BitShow</h1>
          </Link>
        </div>
        <div className="buttons">
          <div className="search-button-container">
            <SearchButon
              onChangeFunc={setSearchValue}
              setSearchValue={setSearchValue}
              width={width}
              setWidth={setWidth}
            />
            {searchValue && (
              <div className="search-list">
                {props.fetchResult.filter((e) =>
                  e.name.toLowerCase().includes(searchValue.toLowerCase())
                ).length > 0 ? (
                  props.fetchResult
                    .filter((e) =>
                      e.name.toLowerCase().includes(searchValue.toLowerCase())
                    )
                    .slice(0, 10)
                    .map((e, i) => (
                      <div className="single-item" key={i}>
                        <Link to={`/show/${e.id}`}>
                          <h1
                            onClick={() => {
                              props.addAndRemoveStorageFunc.add(
                                props.recentlyViewedShows,
                                props.changeRecentlyViewedShows,
                                e.id,
                                "recentlyViewed"
                              );
                            }}
                          >
                            {e.name}
                          </h1>
                        </Link>
                      </div>
                    ))
                ) : (
                  <div className="single-item">
                    <h1>No results..</h1>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="watchlist-btn">
            {isButtonClicked ? (
              <button
                className="watchlist-toggle-btn eye-btn pointer"
                onClick={() => {
                  changeIsButtonClicked(false);
                }}
              >
                <div className="eye">
                  <BsEyeFill />
                </div>
                <div
                  className={
                    props.watchList
                      ? "number pointer"
                      : "number pointer display-none"
                  }
                >
                  {props.watchList ? props.watchList.length : null}
                </div>
              </button>
            ) : (
              <button
                className="watchlist-toggle-btn eye-btn pointer"
                onClick={() => {
                  setSearchValue("");
                  setWidth(0);
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
            className="watchlist-btn"
            style={{ width: isButtonClicked ? "25vw" : 0 }}
          >
            <WatchListComponent
              fetchResult={props.fetchResult}
              watchList={props.watchList}
              addToWatchList={props.addToWatchList}
              addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
              recentlyViewedShows={props.recentlyViewedShows}
              changeRecentlyViewedShows={props.changeRecentlyViewedShows}
              changeIsButtonClicked={changeIsButtonClicked}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
