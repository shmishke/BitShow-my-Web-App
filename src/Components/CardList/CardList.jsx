import { useState } from "react/cjs/react.development";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import "./cardList.scss";

const CardList = (props) => {
  const [numberOfCardDisplaying, changeNumberOfCardsDisplaying] = useState(12);
  const [activePage, changeActivePage] = useState(0);

  const results = props.fetchResult.slice(
    numberOfCardDisplaying * activePage,
    numberOfCardDisplaying * activePage + numberOfCardDisplaying
  );

  return (
    <>
      <h3>
        Displaying {numberOfCardDisplaying} out of {props.fetchResult.length}{" "}
        movies
      </h3>
      <button
        onClick={() => {
          changeActivePage(0);
          changeNumberOfCardsDisplaying(60);
        }}
      >
        60
      </button>
      <button
        onClick={() => {
          changeActivePage(0);
          changeNumberOfCardsDisplaying(120);
        }}
      >
        120
      </button>
      <button
        onClick={() => {
          changeActivePage(0);
          changeNumberOfCardsDisplaying(props.fetchResult.length);
        }}
      >
        All
      </button>
      {!(numberOfCardDisplaying >= props.fetchResult.length) && (
        <Pagination
          fetchResult={props.fetchResult}
          numberOfCardDisplaying={numberOfCardDisplaying}
          activePage={activePage}
          changeActivePage={changeActivePage}
        />
      )}

      <div className="card-list">
        {results.map((e) => {
          return <Card show={e} />;
        })}
      </div>
    </>
  );
};

export default CardList;
