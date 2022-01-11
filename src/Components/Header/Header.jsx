import "./header.scss";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [searchWidth, setSearchWidth] = useState(0);

  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to="/">
            <h1>BitShow</h1>
          </Link>
        </div>
        <div className="search">
          <input
            type="text"
            style={{ width: searchWidth }}
            placeholder="Search TV shows"
          />
          <button
            onClick={() => {
              if (searchWidth === 0) setSearchWidth(150);
              if (searchWidth > 0) setSearchWidth(0);
            }}
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
