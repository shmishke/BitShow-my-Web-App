import { useState } from "react";

const Pagination = (props) => {
  const [button1, changeButton1] = useState(4);
  const [button2, changeButton2] = useState(5);
  const [button3, changeButton3] = useState(6);

  const lastActivePage =
    props.fetchResult.length % props.numberOfCardDisplaying === 0
      ? Math.floor(props.fetchResult.length / props.numberOfCardDisplaying) - 1
      : Math.floor(props.fetchResult.length / props.numberOfCardDisplaying);

  return (
    <div className="pagination">
      {props.activePage < 4 && (
        <>
          <button
            disabled={props.activePage === 0}
            onClick={() => props.changeActivePage(props.activePage - 1)}
          >
            {"<"}
          </button>
          <button onClick={() => props.changeActivePage(0)}>1</button>
          <button onClick={() => props.changeActivePage(1)}>2</button>
          {props.fetchResult.length > 2 * props.numberOfCardDisplaying && (
            <button onClick={() => props.changeActivePage(2)}>3</button>
          )}
          {props.fetchResult.length > 3 * props.numberOfCardDisplaying && (
            <button onClick={() => props.changeActivePage(3)}>4</button>
          )}
          {props.fetchResult.length > 4 * props.numberOfCardDisplaying && (
            <button onClick={() => props.changeActivePage(4)}>5</button>
          )}
          {props.fetchResult.length >= 5 * props.numberOfCardDisplaying && (
            <>
              <button>...</button>
              <button
                onClick={() => {
                  props.changeActivePage(lastActivePage);
                }}
              >
                {Math.floor(
                  props.fetchResult.length / props.numberOfCardDisplaying
                )}
              </button>
            </>
          )}
          <button
            disabled={
              props.numberOfCardDisplaying * props.activePage +
                props.numberOfCardDisplaying >=
              props.fetchResult.length
            }
            onClick={() => props.changeActivePage(props.activePage + 1)}
          >
            {">"}
          </button>
        </>
      )}
      {props.activePage >= 4 && props.activePage <= lastActivePage - 4 && (
        <>
          <button
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
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              props.changeActivePage(0);
              changeButton1(4);
              changeButton2(5);
              changeButton3(6);
            }}
          >
            1
          </button>
          <button>...</button>
          <button
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
          <button>{button2}</button>
          <button
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
          <button>...</button>
          <button
            onClick={() => {
              props.changeActivePage(lastActivePage);
            }}
          >
            {Math.floor(
              props.fetchResult.length / props.numberOfCardDisplaying
            )}
          </button>
          <button
            disabled={props.activePage === lastActivePage}
            onClick={() => {
              changeButton1(button1 + 1);
              changeButton2(button2 + 1);
              changeButton3(button3 + 1);
              props.changeActivePage(props.activePage + 1);
            }}
          >
            {">"}
          </button>
        </>
      )}
      {props.activePage >= 4 && props.activePage >= lastActivePage - 3 && (
        <>
          <button
            onClick={() => {
              if (props.activePage === lastActivePage - 3) {
                changeButton1(lastActivePage - 4);
                changeButton2(lastActivePage - 3);
                changeButton3(lastActivePage - 2);
              }
              props.changeActivePage(props.activePage - 1);
            }}
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              props.changeActivePage(0);
              changeButton1(4);
              changeButton2(5);
              changeButton3(6);
            }}
          >
            1
          </button>
          <button>...</button>
          <button
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
            onClick={() => {
              props.changeActivePage(lastActivePage - 3);
            }}
          >
            {lastActivePage - 2}
          </button>
          <button
            onClick={() => {
              props.changeActivePage(lastActivePage - 2);
            }}
          >
            {lastActivePage - 1}
          </button>
          <button
            onClick={() => {
              props.changeActivePage(lastActivePage - 1);
            }}
          >
            {lastActivePage}
          </button>
          <button
            onClick={() => {
              props.changeActivePage(lastActivePage);
            }}
          >
            {lastActivePage + 1}
          </button>
          <button
            disabled={props.activePage === lastActivePage}
            onClick={() => {
              props.changeActivePage(props.activePage + 1);
            }}
          >
            {">"}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
