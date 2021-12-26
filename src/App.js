import { useEffect, useState } from "react";

import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";

import "./app.scss";

function App() {
  const [fetchResult, fetchFunc] = useState(false);
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
            <HomePage fetchResult={fetchResult} />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
