import { useState } from "react/cjs/react.development";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import "./cardList.scss";

const CardList = (props) => {
  const [search, searchValue] = useState("");

  const searchResult = props.fetchResult
    .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
    .map((e) => <Card show={e} />);

  console.log(searchResult);
  return (
    <>
      <input type="text" onChange={(e) => searchValue(e.target.value)} />
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
            {props.results.map((e) => {
              return <Card show={e} />;
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
