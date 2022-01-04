import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import "./app.scss";
import SinglePage from "./Pages/SinglePage/SinglePage";

function App() {
  const [fetchResult, getFetchResult] = useState(false);
  const [numberOfCardsDisplaying, changeNumberOfCardsDisplaying] = useState(30);
  const [activePage, changeActivePage] = useState(0);

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
            <Header />
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
                  />
                </Route>
                <Route path="/show/:id">
                  <SinglePage fetchResult={fetchResult} />
                </Route>
              </Switch>
            </div>
            <Footer />
          </>
        )}
      </>
    </Router>
  );
}

export default App;
