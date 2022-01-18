import WatchListCard from "../WatchListCard/WatchListCard";
import "./WatchListComponent.scss";

const WatchListComponent = (props) => {
  const shows = () =>
    props.watchList.map((e) => props.fetchResult.find((el) => e === el.id));

  return (
    <div className="page-container">
      <div className="watchlist-container">
        <h3>Watchlist:</h3>
        {props.watchList ? (
          <div className="list">
            {shows().map((e) => (
              <WatchListCard
                show={e}
                fetchResult={props.fetchResult}
                watchList={props.watchList}
                addToWatchList={props.addToWatchList}
                addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
              />
            ))}
          </div>
        ) : (
          <p>search list empty</p>
        )}
      </div>
    </div>
  );
};

export default WatchListComponent;
