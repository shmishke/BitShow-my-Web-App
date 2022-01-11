import { MdCheckBox } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import "./cardList.scss";

const CardList = (props) => {
  const [search, searchValue] = useState("");
  const originalData = props.fetchResult.map((e) => e);
  const [sort, changeSort] = useState(originalData);
  const [filteredShows, setFilteredShows] = useState([]);

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

  const searchResult = sort
    .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
    .map((e) => {
      return (
        <Link to={`/show/${e.id}`}>
          <Card show={e} />;
        </Link>
      );
    });

  const filteredList = [];
  const filtered = filteredShows.map((e) => {
    return sort.filter((el) => el.genres.includes(e));
  });

  const genres = [];
  props.fetchResult.forEach((e) => genres.push(...e.genres));
  const Allgenres = genres.filter((e, i) => i === genres.indexOf(e));
  // .filter((e, i, arr) => e === arr.indexOf(e));

  console.log(genres);
  console.log(Allgenres);

  console.log(filtered);
  console.log(filteredShows);

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
      <div className="checkbox-div">
        {Allgenres.map((e) => {
          return <></>;
        })}
      </div>
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
                <Link to={`/show/${e.id}`}>
                  <Card show={e} />;
                </Link>
              );
            })}
          </div>
        </>
      )}
      {search && (
        <div className="card-list">
          {searchResult.length >= 1 ? searchResult : <p>No results found.</p>}
        </div>
      )}
    </>
  );
};

export default CardList;
