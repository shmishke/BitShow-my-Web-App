import { useState } from "react/cjs/react.development";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import "./cardList.scss";
import { IoSearchCircle, IoSettingsSharp } from "react-icons/io5";
import { AiFillCheckCircle } from "react-icons/ai";
import variables from "../../variables.module.scss";

const CardList = (props) => {
  console.log(variables);
  const [search, searchValue] = useState("");
  const originalData = props.fetchResult.map((e) => e);
  const [sort, changeSort] = useState(originalData);
  const [settingsIconClicked, changeSettingsIconClicked] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(
    props.numberOfCardsDisplaying
  );

  const results = sort.slice(
    props.numberOfCardsDisplaying * props.activePage,
    props.numberOfCardsDisplaying * props.activePage +
      props.numberOfCardsDisplaying
  );

  const originalDataSortedByName = originalData
    .map((e) => e)
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

  const originalDataSortedByRating = originalData
    .map((e) => e)
    .sort((a, b) => {
      if (a.rating.average < b.rating.average) return -1;
      if (a.rating.average > b.rating.average) return 1;
      return 0;
    });

  const searchResult = sort.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="cardlist-settings">
        <div className="sort-and-num-of-cards">
          <label htmlFor="sort">
            Sort by:
            <select
              className="pointer"
              name="sort"
              id="sort"
              onChange={(e) => {
                if (e.target.value === "#") changeSort(originalData);
                if (e.target.value === "a-z")
                  changeSort(originalDataSortedByName);
                if (e.target.value === "z-a")
                  changeSort([...originalDataSortedByName].reverse());
                if (e.target.value === "h-l")
                  changeSort(originalDataSortedByRating);
                if (e.target.value === "l-h")
                  changeSort([...originalDataSortedByRating].reverse());
              }}
            >
              <option value="#">Default</option>
              <option value="a-z"> A - Z</option>
              <option value="z-a"> Z - A</option>
              <option value="l-h"> Ratings (High to Low)</option>
              <option value="h-l"> Ratings (Low to High)</option>
            </select>
          </label>
          <div className="num-of-cards-displaying">
            <h3>
              Displaying {props.numberOfCardsDisplaying} TV shows per page
            </h3>
            <div
              className="settings-icon pointer"
              onClick={() => {
                changeSettingsIconClicked(!settingsIconClicked);
              }}
            >
              {!settingsIconClicked ? (
                <IoSettingsSharp />
              ) : (
                <>
                  <IoSettingsSharp
                    style={{
                      color: `${variables.mainColor}`,
                      backgroundColor: `${variables.textColor}`,
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <div
            className="settings"
            style={
              settingsIconClicked
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          >
            <label htmlFor="num-of-cards">
              Display
              <input
                onChange={(e) => {
                  const number = Number(e.target.value);
                  if (number > props.fetchResult.length)
                    e.target.value = props.fetchResult.length;
                  else if (number < 0) e.target.value = 1;
                  setCardsPerPage(Number(e.target.value));
                }}
                type="text"
                id="num-of-cards"
                name="num-of-cards"
                placeholder={props.numberOfCardsDisplaying}
              ></input>
              TV Shows per Page
            </label>
            <button
              className="pointer"
              onClick={() => {
                props.changeNumberOfCardsDisplaying(cardsPerPage);
              }}
            >
              <AiFillCheckCircle />
            </button>
          </div>
        </div>
        {!search && (
          <div className="pagination-div">
            {!(props.numberOfCardsDisplaying >= props.fetchResult.length) && (
              <Pagination
                fetchResult={props.fetchResult}
                numberOfCardsDisplaying={props.numberOfCardsDisplaying}
                changeNumberOfCardsDisplaying={
                  props.changeNumberOfCardsDisplaying
                }
                activePage={props.activePage}
                changeActivePage={props.changeActivePage}
              />
            )}
          </div>
        )}
        <div className="search">
          <input
            type="text"
            onChange={(e) => searchValue(e.target.value)}
            placeholder="Search TV Shows.."
          />
          <div className="icon">
            <IoSearchCircle />
          </div>
        </div>
      </div>

      {!search && (
        <div className="card-list">
          {results.map((e) => {
            return (
              <Card
                show={e}
                recentlyViewedShows={props.recentlyViewedShows}
                changeRecentlyViewedShows={props.changeRecentlyViewedShows}
                watchList={props.watchList}
                addToWatchList={props.addToWatchList}
                addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
              />
            );
          })}
        </div>
      )}

      {search && (
        <div className="card-list">
          {searchResult.length >= 1 ? (
            searchResult.map((e) => {
              return (
                <Card
                  show={e}
                  recentlyViewedShows={props.recentlyViewedShows}
                  changeRecentlyViewedShows={props.changeRecentlyViewedShows}
                  watchList={props.watchList}
                  addToWatchList={props.addToWatchList}
                  addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
                />
              );
            })
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}

      <div className="bottom-of-page">
        {!search && (
          <div className="pagination-div">
            {!(props.numberOfCardsDisplaying >= props.fetchResult.length) && (
              <Pagination
                fetchResult={props.fetchResult}
                numberOfCardsDisplaying={props.numberOfCardsDisplaying}
                changeNumberOfCardsDisplaying={
                  props.changeNumberOfCardsDisplaying
                }
                activePage={props.activePage}
                changeActivePage={props.changeActivePage}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CardList;
