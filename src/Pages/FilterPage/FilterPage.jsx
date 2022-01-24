import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardList from "../../Components/CardList/CardList";
import "./filterPage.scss";

const FilterPage = (props) => {
  const [activePageFilter, changeActivePageFilter] = useState(0);
  const { genre } = useParams();

  const showsToDisplay = props.fetchResult.filter((e) =>
    e.genres.includes(genre)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    changeActivePageFilter(0);
  }, [genre]);
  if (showsToDisplay.length > 0)
    return (
      <>
        <div className="top-of-filterpage">
          <h1>
            Shows Filtered by <span>{genre}</span>
          </h1>
        </div>
        <div className="cards">
          <CardList
            fetchResult={showsToDisplay}
            recentlyViewedShows={props.recentlyViewedShows}
            changeRecentlyViewedShows={props.changeRecentlyViewedShows}
            activePage={activePageFilter}
            changeActivePage={changeActivePageFilter}
            numberOfCardsDisplaying={props.numberOfCardsDisplaying}
            changeNumberOfCardsDisplaying={props.changeNumberOfCardsDisplaying}
            watchList={props.watchList}
            addToWatchList={props.addToWatchList}
            addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
          />
        </div>
      </>
    );
  else return <p>Loading...</p>;
};

export default FilterPage;
