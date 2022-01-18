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
              if (props.watchList) {
                const shows = JSON.parse(
                  window.localStorage.getItem("watchList")
                ).filter((e) => e !== props.show.id);
                if (shows.length === 0) {
                  props.addToWatchList(null);
                  window.localStorage.removeItem("watchList");
                } else {
                  props.addToWatchList(shows);
                  window.localStorage.setItem(
                    "watchList",
                    JSON.stringify(shows)
                  );
                }
              }
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
