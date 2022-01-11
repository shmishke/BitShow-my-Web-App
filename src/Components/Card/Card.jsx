import "./card.scss";
import { RiStarSLine } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
import { useState } from "react";

const Card = (props) => {
  const [isHovered, changeHoverState] = useState(false);

  return (
    <>
      <div className="card">
        <img
          onMouseLeave={() => {
            changeHoverState(false);
          }}
          onMouseEnter={() => {
            changeHoverState(true);
          }}
          src={props.show.image.original}
          alt={props.show.name}
        />
        {isHovered && (
          <>
            <div className="rating">
              <RiStarSLine /> {props.show.rating.average}
            </div>
            <button>
              <FcLike /> Add to favorites
            </button>
          </>
        )}
        <div className="card-info">
          <div className="card-name">
            <h1>{props.show.name}</h1>
          </div>
          <div className="genres">
            {props.show.genres.map((e) => {
              return <p>{e}</p>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
