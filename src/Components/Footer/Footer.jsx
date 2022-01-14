import "./footer.scss";
import { DiReact } from "react-icons/di";
import { DiJavascript1 } from "react-icons/di";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-recently-viewed">
          <h3>Recently Viewed</h3>
        </div>
        <div className="footer-text">
          <h6>
            <DiReact /> Milos Delic 2021 <DiJavascript1 />
          </h6>
        </div>
      </div>
    </>
  );
};

export default Footer;
