import CardList from "../../Components/CardList/CardList";
import Carousel from "../../Components/Carousel/Carousel";
import "./homePage.scss";

const HomePage = (props) => {
  return (
    <>
      <div className="top-of-page">
        <div className="top-of-filterpage">
          <h1>Top 10 best-rated shows</h1>
        </div>
        {props.fetchResult && (
          <div className="carousel">
            <Carousel
              fetchResult={props.fetchResult}
              watchList={props.watchList}
              addToWatchList={props.addToWatchList}
              addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
              details={props.details}
            />
          </div>
        )}
        <div className="what-to-watch">
          <h2>What To Watch</h2>
        </div>
      </div>
      <CardList
        fetchResult={props.fetchResult}
        recentlyViewedShows={props.recentlyViewedShows}
        changeRecentlyViewedShows={props.changeRecentlyViewedShows}
        activePage={props.activePage}
        changeActivePage={props.changeActivePage}
        numberOfCardsDisplaying={props.numberOfCardsDisplaying}
        changeNumberOfCardsDisplaying={props.changeNumberOfCardsDisplaying}
        watchList={props.watchList}
        addToWatchList={props.addToWatchList}
        addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
      />
    </>
  );
};

export default HomePage;
