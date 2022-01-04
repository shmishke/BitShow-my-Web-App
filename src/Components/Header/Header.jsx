import "./header.scss";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header">
        <Link to="/">
          <div className="logo">
            <h1>BitShow</h1>
          </div>
        </Link>
        <div className="search">
          <input type="text" />
          <button>
            <FaSearch />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
