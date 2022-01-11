import CardList from "../../Components/CardList/CardList";
import "./homePage.scss";
import Carousel from "../../Components/Carousel/Carousel";
import DisplayNCards from "../../Components/DisplayNCards/DisplayNCards";
import variables from "../../variables.module.scss";

console.log(variables);

const HomePage = (props) => {
  console.log(props.fetchResult);
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
        activePage={props.activePage}
        changeActivePage={props.changeActivePage}
        numberOfCardsDisplaying={props.numberOfCardsDisplaying}
        changeNumberOfCardsDisplaying={props.changeNumberOfCardsDisplaying}
      />
    </>
  );
};

export default HomePage;
