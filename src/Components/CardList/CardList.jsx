import { useEffect, useState } from "react";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import "./cardList.scss";
import { IoSettingsSharp } from "react-icons/io5";
import { AiFillCheckCircle } from "react-icons/ai";
import variables from "../../variables.module.scss";
import SearchButon from "../SearchButton/SearchButton";

const CardList = (props) => {
  const [showsToDisplay, setShowsToDisplay] = useState(props.fetchResult);
  const [search, getSearchValue] = useState("");
  const [sort, changeSort] = useState(showsToDisplay.map((e) => e));
  const [settingsIconClicked, changeSettingsIconClicked] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(
    props.numberOfCardsDisplaying
  );
  const [width, setWidth] = useState(0);

  const results = sort.slice(
    props.numberOfCardsDisplaying * props.activePage,
    props.numberOfCardsDisplaying * props.activePage +
      props.numberOfCardsDisplaying
  );

  const sortBy = (name) => {
    const arr = sort.map((e) => e);
    if (name === "name")
      return arr.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    if (name === "rating")
      return arr.sort((a, b) => {
        if (a.rating.average < b.rating.average) return -1;
        if (a.rating.average > b.rating.average) return 1;
        return 0;
      });
  };

  const searchResult = sort.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    changeSort(props.fetchResult);
    setShowsToDisplay(props.fetchResult);
  }, [props.fetchResult]);

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
                if (e.target.value === "#") changeSort(sort);
                if (e.target.value === "a-z") changeSort(sortBy("name"));
                if (e.target.value === "z-a")
                  changeSort(sortBy("name").reverse());
                if (e.target.value === "h-l") changeSort(sortBy("rating"));
                if (e.target.value === "l-h")
                  changeSort(sortBy("rating").reverse());
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
            {props.fetchResult.length > props.numberOfCardsDisplaying ? (
              <h3>
                Displaying {props.numberOfCardsDisplaying} TV shows per page
              </h3>
            ) : (
              <h3>Displaying ALL TV shows</h3>
            )}
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
                  let numberInput = Number(e.target.value);
                  if (numberInput > props.fetchResult.length) {
                    e.target.value = props.fetchResult.length;
                  } else if (numberInput <= 0) {
                    numberInput = 1;
                  }
                  setCardsPerPage(numberInput);
                  props.changeActivePage(0);
                }}
                type="number"
                id="num-of-cards"
                name="num-of-cards"
                min={"0"}
                placeholder={
                  props.fetchResult.length <= props.numberOfCardsDisplaying
                    ? props.fetchResult.length
                    : cardsPerPage
                }
              ></input>
              Shows (max {props.fetchResult.length})
            </label>
            <button
              className="pointer"
              onClick={() => {
                props.changeNumberOfCardsDisplaying(cardsPerPage);
                changeSettingsIconClicked(!settingsIconClicked);
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
          <SearchButon
            onChangeFunc={getSearchValue}
            setSearchValue={getSearchValue}
            width={width}
            setWidth={setWidth}
          />
        </div>
      </div>

      {!search && (
        <div className="card-list">
          {results.map((e, i) => {
            return (
              <Card
                key={i}
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
            searchResult.map((e, i) => {
              return (
                <Card
                  show={e}
                  key={i}
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
