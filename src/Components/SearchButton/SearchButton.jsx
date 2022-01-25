import { FaSearch } from "react-icons/fa";
import "./searchButton.scss";

const SearchButon = (props) => {
  return (
    <div className="search-btn">
      <input
        onChange={(e) => props.setSearchValue(e.target.value)}
        type="text"
        style={{ width: !props.disabled ? props.width : 0 }}
        placeholder="Search TV shows"
      />
      <button
        className="watchlist-toggle-btn pointer "
        onClick={() => {
          if (props.width === 0) {
            props.setWidth(150);
          }
          if (props.width > 0) {
            props.setSearchValue("");
            props.setWidth(0);
          }
        }}
      >
        <FaSearch />
      </button>
    </div>
  );
};
export default SearchButon;
