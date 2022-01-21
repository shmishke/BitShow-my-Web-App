import "./oneEpisode.scss";
import moment from "moment";
import { RiStarSLine } from "react-icons/ri";
import { GiStopwatch } from "react-icons/gi";
import { MdOutlineLiveTv } from "react-icons/md";

const OneEpisode = (props) => {
  return (
    <div className="single-episode">
      <h3>
        <div className="episode-top">
          {props.e.name}
          <div className="episode-rating">
            <RiStarSLine />
            {props.e.rating.average}
          </div>
        </div>
      </h3>
      <h4>
        Season {props.e.season} / Episode {props.e.number}
      </h4>
      <div className="episode-details">
        <h3>Episode details </h3>
        {props.e.summary ? <p>{props.details(props.e)}</p> : null}
      </div>
      <div className="episode-bottom">
        <div>
          <MdOutlineLiveTv />
          {moment(props.e.airdate).format("DD.MM.YYYY.")}
        </div>
        <div>
          <GiStopwatch /> {props.e.runtime} min
        </div>
      </div>
    </div>
  );
};
export default OneEpisode;
