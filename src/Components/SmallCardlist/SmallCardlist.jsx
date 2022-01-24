import { useState, useEffect } from "react";
import Card from "../Card/Card";
import "./smallCardlist.scss";

const SmallCardlist = (props) => {
  const [sliceBegin, setSliceBegin] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(4);

  useEffect(() => {
    setSliceBegin(0);
    setSliceEnd(4);
  }, [props.showsToDisplay]);

  return (
    <div className="small-cardlist-search">
      <button
        className="btn-small-cardlist pointer"
        style={{ visibility: sliceBegin === 0 ? "hidden" : "visible" }}
        onClick={() => {
          setSliceBegin(sliceBegin - (sliceEnd - sliceBegin));
          setSliceEnd(sliceEnd - (sliceEnd - sliceBegin));
        }}
      >
        {"<"}
      </button>
      {props.showsToDisplay.slice(sliceBegin, sliceEnd).map((e, i) => {
        return (
          <Card
            key={i}
            show={e}
            recentlyViewedShows={props.recentlyViewedShows}
            changeRecentlyViewedShows={props.changeRecentlyViewedShows}
            watchList={props.watchList}
            addToWatchList={props.addToWatchList}
            addAndRemoveStorageFunc={props.addAndRemoveStorageFunc}
          />
        );
      })}
      <button
        className="btn-small-cardlist pointer"
        style={{
          visibility:
            sliceBegin >= props.showsToDisplay.length - (sliceEnd - sliceBegin)
              ? "hidden"
              : "visible",
        }}
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
