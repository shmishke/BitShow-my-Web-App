import { useState } from "react/cjs/react.development";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import "./cardList.scss";

const CardList = (props) => {
  const [search, searchValue] = useState("");
  const originalData = props.fetchResult.map((e) => e);
  const [sort, changeSort] = useState(originalData);

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
      <input type="text" onChange={(e) => searchValue(e.target.value)} />
      <label htmlFor="sort">
        Sort by:
        <select
          name="sort"
          id="sort"
          onChange={(e) => {
            if (e.target.value === "#") changeSort(originalData);
            if (e.target.value === "a-z") changeSort(originalDataSortedByName);
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
      {!search && (
        <>
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
        </>
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
    </>
  );
};

export default CardList;
