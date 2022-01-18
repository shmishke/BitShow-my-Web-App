import "./watchListCard.scss";

const WatchListCard = (props) => {
  return (
    <div className="watchlist-single-card">
      <div className="watchlist-img">
        <img
          src={props.show.image.original}
          style={{ height: "12vh" }}
          alt=""
        />
      </div>
      <div className="watchlist-info">
        <div className="watchlist-top">
          <h3>{props.show.name}</h3>
          <button
            onClick={() => {
              props.addAndRemoveStorageFunc.remove(
                props.watchList,
                props.addToWatchList,
                props.show.id,
                "watchList"
              );
            }}
          >
            x
          </button>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default WatchListCard;
