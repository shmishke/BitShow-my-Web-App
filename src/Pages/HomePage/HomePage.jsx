import CardList from "../../Components/CardList/CardList";
import "./homePage.scss";
import Carousel from "../../Components/Carousel/Carousel";

const HomePage = (props) => {
  return (
    <>
      <h2>Top 10 best-rated shows</h2>
      {props.fetchResult && (
        <div className="carousel">
          <Carousel shows={props.fetchResult} />
        </div>
      )}
      <h2>What To Watch</h2>
      <CardList fetchResult={props.fetchResult} />
    </>
  );
};

export default HomePage;
