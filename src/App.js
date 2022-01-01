import { useEffect, useState } from "react";

import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";

import "./app.scss";

function App() {
  const [fetchResult, fetchFunc] = useState(false);
  const [numberOfCardsDisplaying, changeNumberOfCardsDisplaying] = useState(10);
  const [activePage, changeActivePage] = useState(0);

  useEffect(() => {
    fetch(`http://api.tvmaze.com/shows`)
      .then((res) => res.json())
      .then((res) => fetchFunc(res));
  }, []);
  return (
    <>
      {fetchResult && (
        <>
          <Header />
          <div className="main">
            <HomePage
              fetchResult={fetchResult}
              numberOfCardsDisplaying={numberOfCardsDisplaying}
              changeNumberOfCardsDisplaying={changeNumberOfCardsDisplaying}
              activePage={activePage}
              changeActivePage={changeActivePage}
            />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
