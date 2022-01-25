import "./onePerson.scss";
import { useState, useEffect } from "react";

const OnePerson = (props) => {
  const [characterImageClick, setCharacterImageClick] = useState(false);

  useEffect(() => {
    setCharacterImageClick(false);
  }, [props.e]);
  return (
    <div className="single-person">
      <div className="single-person-img">
        {!characterImageClick ? (
          <>
            {props.e.person.image && props.e.person.image ? (
              <img src={props.e.person.image.medium} alt="" />
            ) : (
              <img
                src="https://www.neils.org/wp-content/uploads/2016/06/no-image.png"
                alt=""
              />
            )}
          </>
        ) : (
          <>
            {props.e.character.image ? (
              <img src={props.e.character.image.medium} alt="" />
            ) : (
              <>
                {props.e.person.image ? (
                  <img src={props.e.person.image.medium} alt="" />
                ) : (
                  <img
                    src="https://www.neils.org/wp-content/uploads/2016/06/no-image.png"
                    alt=""
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="single-person-name">
        <h3
          onClick={() => setCharacterImageClick(false)}
          className={!characterImageClick ? "pointer active " : "pointer"}
        >
          {props.e.person.name}
        </h3>
        {!props.e.self ? (
          <>
            <p>as</p>
            <h3
              onClick={() => setCharacterImageClick(true)}
              className={characterImageClick ? "pointer active " : "pointer"}
            >
              {props.e.character.name} {props.e.voice ? "(voice)" : null}
            </h3>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default OnePerson;
