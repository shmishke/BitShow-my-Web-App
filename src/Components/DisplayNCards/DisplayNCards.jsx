import "./displayNCards.scss";

const DisplayNCards = (props) => {
  return (
    <>
      <h3>
        Displaying {props.numberOfCardsDisplaying} out of{" "}
        {props.fetchResult.length} movies
      </h3>
      <button
        onClick={() => {
          props.changeActivePage(0);
          props.changeNumberOfCardsDisplaying(60);
        }}
      >
        60
      </button>
      <button
        onClick={() => {
          props.changeActivePage(0);
          props.changeNumberOfCardsDisplaying(120);
        }}
      >
        120
      </button>
      <button
        onClick={() => {
          props.changeActivePage(0);
          props.changeNumberOfCardsDisplaying(props.fetchResult.length);
        }}
      >
        All
      </button>
    </>
  );
};

export default DisplayNCards;
