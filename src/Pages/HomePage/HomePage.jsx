import CardList from "../../Components/CardList/CardList";
import "./homePage.scss";
import Carousel from "../../Components/Carousel/Carousel";
import DisplayNCards from "../../Components/DisplayNCards/DisplayNCards";

const HomePage = (props) => {
  const results = props.fetchResult.slice(
    props.numberOfCardsDisplaying * props.activePage,
    props.numberOfCardsDisplaying * props.activePage +
      props.numberOfCardsDisplaying
  );

  return (
    <>
      <h2>Top 10 best-rated shows</h2>
      {props.fetchResult && (
        <div className="carousel">
          <Carousel shows={props.fetchResult} />
        </div>
      )}
      <DisplayNCards
        fetchResult={props.fetchResult}
        changeActivePage={props.changeActivePage}
        changeNumberOfCardsDisplaying={props.changeNumberOfCardsDisplaying}
        numberOfCardsDisplaying={props.numberOfCardsDisplaying}
      />
      <h2>What To Watch</h2>
      <CardList
        fetchResult={props.fetchResult}
        activePage={props.activePage}
        changeActivePage={props.changeActivePage}
        numberOfCardsDisplaying={props.numberOfCardsDisplaying}
        changeNumberOfCardsDisplaying={props.changeNumberOfCardsDisplaying}
        results={results}
      />
    </>
  );
};

export default HomePage;
