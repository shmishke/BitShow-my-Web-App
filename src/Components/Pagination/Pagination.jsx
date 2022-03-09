import { useState } from "react";
import "./pagination.scss";

const Pagination = (props) => {
  const [button1, changeButton1] = useState(4);
  const [button2, changeButton2] = useState(5);
  const [button3, changeButton3] = useState(6);

  const lastActivePage =
    props.fetchResult.length % props.numberOfCardsDisplaying === 0
      ? props.fetchResult.length / props.numberOfCardsDisplaying - 1
      : Math.floor(props.fetchResult.length / props.numberOfCardsDisplaying);

  return (
    <div className="pagination">
      {props.activePage < 4 && (
        <>
          <div className="no-hover">
            <button
              className="pointer"
              style={props.activePage === 0 ? { visibility: "hidden " } : null}
              onClick={() => props.changeActivePage(props.activePage - 1)}
            >
              {"<"}
            </button>
          </div>
          <button
            className={props.activePage === 0 ? "current pointer" : "pointer"}
            onClick={() => props.changeActivePage(0)}
          >
            1
          </button>
          <button
            className={props.activePage === 1 ? "current pointer" : "pointer"}
            onClick={() => props.changeActivePage(1)}
          >
            2
          </button>
          {props.fetchResult.length > 2 * props.numberOfCardsDisplaying && (
            <button
              className={props.activePage === 2 ? "current pointer" : "pointer"}
              onClick={() => props.changeActivePage(2)}
            >
              3
            </button>
          )}
          {props.fetchResult.length > 3 * props.numberOfCardsDisplaying && (
            <button
              className={props.activePage === 3 ? "current pointer" : "pointer"}
              onClick={() => props.changeActivePage(3)}
            >
              4
            </button>
          )}
          {props.fetchResult.length > 4 * props.numberOfCardsDisplaying && (
            <button
              className="pointer"
              onClick={() => props.changeActivePage(4)}
            >
              5
            </button>
          )}
          {props.fetchResult.length >= 5 * props.numberOfCardsDisplaying && (
            <>
              <div className="no-hover">
                <button>...</button>
              </div>
              <button
                className="pointer"
                onClick={() => {
                  props.changeActivePage(lastActivePage);
                }}
              >
                {lastActivePage + 1}
              </button>
            </>
          )}
          <div className="no-hover ">
            <button
              className="pointer"
              disabled={props.activePage === lastActivePage}
              onClick={() => props.changeActivePage(props.activePage + 1)}
              style={{
                visibility:
                  props.activePage === lastActivePage ? "hidden" : "visible",
              }}
            >
              {">"}
            </button>
          </div>
        </>
      )}
      {props.activePage >= 4 && props.activePage <= lastActivePage - 4 && (
        <>
          <div className="no-hover">
            <button
              className="pointer"
              disabled={props.activePage === 0}
              onClick={() => {
                if (props.activePage <= 4) {
                  changeButton1(4);
                  changeButton2(5);
                  changeButton3(6);
                } else {
                  changeButton1(button1 - 1);
                  changeButton2(button2 - 1);
                  changeButton3(button3 - 1);
                }
                props.changeActivePage(props.activePage - 1);
              }}
              style={{
                visibility: props.activePage === 0 ? "hidden" : "visible",
              }}
            >
              {"<"}
            </button>
          </div>

          <button
            className="pointer"
            onClick={() => {
              props.changeActivePage(0);
              changeButton1(4);
              changeButton2(5);
              changeButton3(6);
            }}
          >
            1
          </button>
          <div className="no-hover">
            <button>...</button>
          </div>
          <button
            className="pointer"
            onClick={() => {
              props.changeActivePage(props.activePage - 1);
              changeButton1(button1 - 1);
              changeButton2(button2 - 1);
              changeButton3(button3 - 1);
              if (props.activePage <= 4) {
                changeButton1(4);
                changeButton2(5);
                changeButton3(6);
              }
            }}
          >
            {button1}
          </button>
          <button className={"current pointer"}>{button2}</button>
          <button
            className="pointer"
            onClick={() => {
              if (props.activePage <= 4) {
                changeButton1(4);
                changeButton2(5);
                changeButton3(6);
              }
              props.changeActivePage(props.activePage + 1);
              changeButton1(button1 + 1);
              changeButton2(button2 + 1);
              changeButton3(button3 + 1);
            }}
          >
            {button3}
          </button>
          <div className="no-hover">
            <button>...</button>
          </div>
          <button
            className="pointer"
            onClick={() => {
              props.changeActivePage(lastActivePage);
            }}
          >
            {lastActivePage + 1}
          </button>
          <div className="no-hover">
            <button
              className="pointer"
              disabled={props.activePage === lastActivePage}
              onClick={() => {
                changeButton1(button1 + 1);
                changeButton2(button2 + 1);
                changeButton3(button3 + 1);
                props.changeActivePage(props.activePage + 1);
              }}
              style={{
                visibility:
                  props.activePage === lastActivePage ? "hidden" : "visible",
              }}
            >
              {">"}
            </button>
          </div>
        </>
      )}
      {props.activePage >= 4 && props.activePage >= lastActivePage - 3 && (
        <>
          <div className="no-hover">
            <button
              className="pointer"
              onClick={() => {
                if (props.activePage === lastActivePage - 3) {
                  changeButton1(lastActivePage - 4);
                  changeButton2(lastActivePage - 3);
                  changeButton3(lastActivePage - 2);
                }
                props.changeActivePage(props.activePage - 1);
              }}
              style={{
                visibility: props.activePage === 0 ? "hidden" : "visible",
              }}
            >
              {"<"}
            </button>
          </div>
          <button
            className="pointer"
            onClick={() => {
              props.changeActivePage(0);
              changeButton1(4);
              changeButton2(5);
              changeButton3(6);
            }}
          >
            1
          </button>
          <div className="no-hover">
            <button>...</button>
          </div>
          <button
            className={
              props.activePage === lastActivePage - 4
                ? "current pointer"
                : "pointer"
            }
            onClick={() => {
              props.changeActivePage(lastActivePage - 4);
              changeButton1(lastActivePage - 4);
              changeButton2(lastActivePage - 3);
              changeButton3(lastActivePage - 2);
            }}
          >
            {lastActivePage - 3}
          </button>
          <button
            className={
              props.activePage === lastActivePage - 3
                ? "current pointer"
                : "pointer"
            }
            onClick={() => {
              props.changeActivePage(lastActivePage - 3);
            }}
          >
            {lastActivePage - 2}
          </button>
          <button
            className={
              props.activePage === lastActivePage - 2
                ? "current pointer"
                : "pointer"
            }
            onClick={() => {
              props.changeActivePage(lastActivePage - 2);
            }}
          >
            {lastActivePage - 1}
          </button>
          <button
            className={
              props.activePage === lastActivePage - 1
                ? "current pointer"
                : "pointer"
            }
            onClick={() => {
              props.changeActivePage(lastActivePage - 1);
            }}
          >
            {lastActivePage}
          </button>
          <button
            className={
              props.activePage === lastActivePage
                ? "current pointer"
                : "pointer"
            }
            onClick={() => {
              props.changeActivePage(lastActivePage);
            }}
          >
            {lastActivePage + 1}
          </button>
          <div className="no-hover">
            <button
              className="pointer"
              disabled={props.activePage === lastActivePage}
              onClick={() => {
                props.changeActivePage(props.activePage + 1);
              }}
              style={{
                visibility:
                  props.activePage === lastActivePage ? "hidden" : "visible",
              }}
            >
              {">"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
