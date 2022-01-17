import CardList from "../../Components/CardList/CardList";
import "./homePage.scss";
import Carousel from "../../Components/Carousel/Carousel";
import DisplayNCards from "../../Components/DisplayNCards/DisplayNCards";
import variables from "../../variables.module.scss";

const HomePage = (props) => {
  return (
    <>
      <div className="top-of-page">
        <h1>Top 10 best-rated shows</h1>
        {props.fetchResult && (
          <div className="carousel">
            <Carousel fetchResult={props.fetchResult} />
          </div>
        )}
      </div>
      <DisplayNCards
        fetchResult={props.fetchResult}
        changeActivePage={props.changeActivePage}
        changeNumberOfCardsDisplaying={props.changeNumberOfCardsDisplaying}
        numberOfCardsDisplaying={props.numberOfCardsDisplaying}
      />
      <h2>What To Watch</h2>

      <CardList
        fetchResult={props.fetchResult}
        recentlyViewedShows={props.recentlyViewedShows}
        changeRecentlyViewedShows={props.changeRecentlyViewedShows}
        activePage={props.activePage}
        changeActivePage={props.changeActivePage}
        numberOfCardsDisplaying={props.numberOfCardsDisplaying}
        changeNumberOfCardsDisplaying={props.changeNumberOfCardsDisplaying}
        changeCurrentShow={props.changeCurrentShow}
        watchList={props.watchList}
        addToWatchList={props.addToWatchList}
      />
    </>
  );
};

export default HomePage;
