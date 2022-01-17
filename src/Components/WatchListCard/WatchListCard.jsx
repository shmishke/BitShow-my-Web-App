import "./watchListCard.scss";

const WatchListCard = (props) => {
  return (
    <div className="watchlist-single-card">
      <div className="watchlist-img">
        {/* <img src={props.show.image.original} alt="" /> */}
      </div>
      <div className="watclist-info">
        <h3>{props.show.name}</h3>
        <p></p>
      </div>
    </div>
  );
};

export default WatchListCard;
