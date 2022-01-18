import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import "./app.scss";
import SinglePage from "./Pages/SinglePage/SinglePage";

function App() {
  const [fetchResult, getFetchResult] = useState(false);
  const [numberOfCardsDisplaying, changeNumberOfCardsDisplaying] = useState(10);
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

  return (
    <Router>
      <>
        {fetchResult && (
          <>
            <Header
              fetchResult={fetchResult}
              watchList={watchList}
              addToWatchList={addToWatchList}
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
                  />
                </Route>
                <Route path="/show/:id">
                  <SinglePage
                    fetchResult={fetchResult}
                    recentlyViewedShows={recentlyViewedShows}
                    changeRecentlyViewedShows={changeRecentlyViewedShows}
                    watchList={watchList}
                    addToWatchList={addToWatchList}
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
            />
          </>
        )}
      </>
    </Router>
  );
}

export default App;
