import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import SinglePage from "./Pages/SinglePage/SinglePage";
import FilterPage from "./Pages/FilterPage/FilterPage";
import "./app.scss";

function App() {
  const [fetchResult, getFetchResult] = useState(false);
  const [numberOfCardsDisplaying, changeNumberOfCardsDisplaying] = useState(30);
  const [activePage, changeActivePage] = useState(0);
  const [recentlyViewedShows, changeRecentlyViewedShows] = useState(
    JSON.parse(window.localStorage.getItem("recentlyViewed"))
  );
  const [watchList, addToWatchList] = useState(
    JSON.parse(window.localStorage.getItem("watchList"))
  );

  useEffect(() => {
    fetch(`http://api.tvmaze.com/shows`)
      .then((res) => res.json())
      .then((res) => getFetchResult(res));
  }, []);

  const details = (det) => {
    return det.summary
      .replace("<p>", "")
      .replace("</p>", "")
      .replace("</b>", "")
      .replace("<b>", "")
      .replace("<i>", "")
      .replace("</i>", "");
  };

  const addToStorage = (clickedShows, setClickedShows, id, storageName) => {
    if (clickedShows) {
      const shows = [
        Number(id),
        ...clickedShows.filter((e) => e !== Number(id)),
      ];
      setClickedShows(shows);
      window.localStorage.setItem(storageName, JSON.stringify(shows));
    } else {
      window.localStorage.setItem(storageName, JSON.stringify([Number(id)]));
      setClickedShows([Number(id)]);
    }
  };

  const removeFromStorage = (
    clickedShows,
    setClickedShows,
    id,
    storageName
  ) => {
    if (clickedShows) {
      const shows = JSON.parse(window.localStorage.getItem(storageName)).filter(
        (e) => e !== Number(id)
      );
      if (shows.length === 0) {
        setClickedShows(null);
        window.localStorage.removeItem(storageName);
      } else {
        setClickedShows(shows);
        window.localStorage.setItem(storageName, JSON.stringify(shows));
      }
    }
  };

  const addAndRemoveStorageFunc = {
    add: addToStorage,
    remove: removeFromStorage,
  };

  return (
    <Router>
      <>
        {fetchResult && (
          <>
            <Header
              fetchResult={fetchResult}
              watchList={watchList}
              addToWatchList={addToWatchList}
              addAndRemoveStorageFunc={addAndRemoveStorageFunc}
              recentlyViewedShows={recentlyViewedShows}
              changeRecentlyViewedShows={changeRecentlyViewedShows}
              changeActivePage={changeActivePage}
            />
            <div className="main">
              <Switch>
                <Route exact path="/">
                  <HomePage
                    fetchResult={fetchResult}
                    numberOfCardsDisplaying={numberOfCardsDisplaying}
                    changeNumberOfCardsDisplaying={
                      changeNumberOfCardsDisplaying
                    }
                    activePage={activePage}
                    changeActivePage={changeActivePage}
                    recentlyViewedShows={recentlyViewedShows}
                    changeRecentlyViewedShows={changeRecentlyViewedShows}
                    watchList={watchList}
                    addToWatchList={addToWatchList}
                    addAndRemoveStorageFunc={addAndRemoveStorageFunc}
                    details={details}
                  />
                </Route>
                <Route path="/show/:id">
                  <SinglePage
                    fetchResult={fetchResult}
                    recentlyViewedShows={recentlyViewedShows}
                    changeRecentlyViewedShows={changeRecentlyViewedShows}
                    watchList={watchList}
                    addToWatchList={addToWatchList}
                    addAndRemoveStorageFunc={addAndRemoveStorageFunc}
                    details={details}
                  />
                </Route>
                <Route path="/shows/:genre">
                  <FilterPage
                    fetchResult={fetchResult}
                    recentlyViewedShows={recentlyViewedShows}
                    changeRecentlyViewedShows={changeRecentlyViewedShows}
                    activePage={activePage}
                    changeActivePage={changeActivePage}
                    numberOfCardsDisplaying={numberOfCardsDisplaying}
                    changeNumberOfCardsDisplaying={
                      changeNumberOfCardsDisplaying
                    }
                    watchList={watchList}
                    addToWatchList={addToWatchList}
                    addAndRemoveStorageFunc={addAndRemoveStorageFunc}
                  />
                </Route>
              </Switch>
            </div>
            <Footer
              fetchResult={fetchResult}
              recentlyViewedShows={recentlyViewedShows}
              changeRecentlyViewedShows={changeRecentlyViewedShows}
              watchList={watchList}
              addToWatchList={addToWatchList}
              addAndRemoveStorageFunc={addAndRemoveStorageFunc}
            />
          </>
        )}
      </>
    </Router>
  );
}

export default App;
