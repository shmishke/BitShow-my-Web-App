import { useState } from "react";
import Card from "../Card/Card";
import "./smallCardlist.scss";

const SmallCardlist = (props) => {
  const [sliceBegin, setSliceBegin] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(4);

  return (
    <div className="small-cardlist-search">
      <button
        className="btn-small-cardlist"
        disabled={sliceBegin === 0}
        onClick={() => {
          setSliceBegin(sliceBegin - (sliceEnd - sliceBegin));
          setSliceEnd(sliceEnd - (sliceEnd - sliceBegin));
        }}
      >
        {"<"}
      </button>
      {props.showsToDisplay.slice(sliceBegin, sliceEnd).map((e) => {
        return (
          <Card
            show={e}
            recentlyViewedShows={props.recentlyViewedShows}
            changeRecentlyViewedShows={props.changeRecentlyViewedShows}
            watchList={props.watchList}
            addToWatchList={props.addToWatchList}
          />
        );
      })}
      <button
        className="btn-small-cardlist"
        disabled={
          sliceBegin >= props.showsToDisplay.length - (sliceEnd - sliceBegin)
        }
        onClick={() => {
          setSliceBegin(sliceBegin + (sliceEnd - sliceBegin));
          setSliceEnd(sliceEnd + (sliceEnd - sliceBegin));
        }}
      >
        {">"}
      </button>
    </div>
  );
};

export default SmallCardlist;
