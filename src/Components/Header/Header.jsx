import "./header.scss";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="logo">
          <h1>BitShow</h1>
        </div>
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
