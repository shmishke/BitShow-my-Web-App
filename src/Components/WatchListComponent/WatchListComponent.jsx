import WatchListCard from "../WatchListCard/WatchListCard";
import "./WatchListComponent.scss";

const WatchListComponent = (props) => {
  const shows = () =>
    props.watchList.map((e) => props.fetchResult.find((el) => e === el.id));

  return (
    <div className="page-container">
      <div className="watchlist-container">
        <div className="list-container">
          <div className="title">
            <h3>Watchlist</h3>
          </div>
          {props.watchList ? (
            <div className="list">
              {shows().map((e, i) => (
                <WatchListCard
                  show={e}
                  key={i}
                  fetchResult={props.fetchResult}
                  watchList={props.watchList}
                  addToWatchList={props.addToWatchList}
                  addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
                  recentlyViewedShows={props.recentlyViewedShows}
                  changeRecentlyViewedShows={props.changeRecentlyViewedShows}
                />
              ))}
            </div>
          ) : (
            <p className="empty">Watchlist empty.</p>
          )}
        </div>
        <div className="btn-container">
          <button
            className="pointer"
            onClick={() => {
              props.changeIsButtonClicked(false);
            }}
          >
            Close Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchListComponent;
