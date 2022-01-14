import "./onePerson.scss";
import { useState, useEffect } from "react";

const OnePerson = (props) => {
  const [characterImageClick, setCharacterImageClick] = useState(false);

  useEffect(() => {
    setCharacterImageClick(false);
  }, []);
  return (
    <div className="single-person">
      <div className="single-person-img">
        {!characterImageClick ? (
          <>
            {props.e.person.image != null &&
            props.e.person.image != undefined ? (
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
            {props.e.character.image != null &&
            props.e.character.image != undefined ? (
              <img src={props.e.character.image.medium} alt="" />
            ) : (
              <>
                {props.e.person.image != null &&
                props.e.person.image != undefined ? (
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
        <h3 onClick={() => setCharacterImageClick(false)}>
          {props.e.person.name}
        </h3>
        {!props.e.self ? (
          <>
            <p>as</p>
            <h3 onClick={() => setCharacterImageClick(true)}>
              {props.e.character.name} {props.e.voice ? "(voice)" : null}
            </h3>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default OnePerson;
