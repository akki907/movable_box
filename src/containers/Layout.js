import React, { useState, useEffect, useCallback, useRef,memo } from "react";
import Box from "../components/Box";
import { Colors } from "../constants/common";

function Layout() {
  const containerRef = useRef(null);

  const [boxesData, setboxesData] = useState({
    boxes: [],
    boxLength: 0,
    add: 0,
    active: 0,
    height: 0,
    width: 0,
  });


  /**
   * @description add all the events
   *  */ 
  const keypressHandler = useCallback(
    (event) => {
      switch (event.key) {
        case "ArrowUp":
        case "W":
        case "w":
          if (boxesData.active !== 0) {
            setboxesData((prevState) => {
              const boxes = [...prevState.boxes];
              const index = boxes.findIndex((el) => el.id === prevState.active); // find the index and manupulate the date

              if (boxes[index].top - 10 > 0) {
                boxes[index] = { ...boxes[index], top: boxes[index].top - 10 };
                return { ...prevState, boxes: boxes };
              } else return prevState;
            });
          }
          break;
        case "ArrowDown":
        case "S":
        case "s":
          if (boxesData.active !== 0) {
            setboxesData((prevState) => {
              const boxes = [...prevState.boxes];
              const index = boxes.findIndex((el) => el.id === prevState.active);
              if (boxes[index].top + 10 < boxesData.height) {
                boxes[index] = { ...boxes[index], top: boxes[index].top + 10 };
                return { ...prevState, boxes: boxes };
              } else return prevState;
            });
          }
          break;
        case "ArrowLeft":
        case "A":
        case "a":
          if (boxesData.active !== 0) {
            setboxesData((prevState) => {
              const boxes = [...prevState.boxes];
              const index = boxes.findIndex((el) => el.id === prevState.active);
              if (boxes[index].left - 10 > 0) {
                boxes[index] = {
                  ...boxes[index],
                  left: boxes[index].left - 10,
                };
                return { ...prevState, boxes: boxes };
              } else return prevState;
            });
          }
          break;
        case "ArrowRight":
        case "D":
        case "d":
          if (boxesData.active !== 0) {
            setboxesData((prevState) => {
              let boxes = [...prevState.boxes];
              let index = boxes.findIndex((el) => el.id === prevState.active);
              if (boxes[index].left + 10 < boxesData.width) {
                boxes[index] = {
                  ...boxes[index],
                  left: boxes[index].left + 10,
                };
                return { ...prevState, boxes: boxes };
              } else return prevState;
            });
          }
          break;
        case "Delete":
        case "Backspace":
          if (boxesData.active !== 0) {
            setboxesData((prev) => {
              const boxes = [...prev.boxes];
              const index = boxes.findIndex((el) => el.id === prev.active);
              boxes.splice(index, 1);
              return { ...prev, active: 0, boxes: boxes };
            });
          }
          break;
        default:
          break;
      }
    },
    [boxesData]
  );

  useEffect(() => {
    document.addEventListener("keydown", keypressHandler, false);

    return () => {
      document.removeEventListener("keydown", keypressHandler, false);
    };
  }, [keypressHandler]);

  useEffect(() => {
    let height = parseInt(containerRef.current.offsetHeight) - 200;
    let width = parseInt(containerRef.current.offsetWidth) - 200;
    setboxesData((prev) => ({ ...prev, height: height, width: width }));
  }, []);


  const OnAddHAndle = () => {
    setboxesData((prev) => {
      let top,
        left,
        add = prev.add;
      if (prev.boxes.length < 1) {
        top = 10;
        left = 10;
        add = 1;
      } else if (prev.add !== 0) {
        top = prev.boxes[prev.boxes.length - 1].top;
        left = prev.boxes[prev.boxes.length - 1].left;
        if (prev.add === 1) {
          if (top + 20 > prev.height) {
            add = 2;
          } else if (left + 20 > prev.width) {
            add = 3;
          } else {
            top = top + 20;
            left = left + 20;
          }
        } else if (prev.add === 2) {
          if (left + 20 > prev.width) {
            add = 4;
          } else if (top - 20 < 0) {
            add = 1;
          } else {
            top = top - 20;
            left = left + 20;
          }
        } else if (prev.add === 3) {
          if (top + 20 > prev.height) {
            add = 4;
          } else if (left - 20 < 0) {
            add = 1;
          } else {
            top = top + 20;
            left = left - 20;
          }
        } else if (prev.add === 4) {
          if (left - 20 < 0) {
            add = 2;
          } else if (top - 20 < 0) {
            add = 3;
          } else {
            top = top - 20;
            left = left - 20;
          }
        }
      }
      return {
        ...prev,
        add: add,
        boxLength: prev.boxLength + 1,
        boxes: [
          ...prev.boxes,
          { id: prev.boxLength + 100, top: top, left: left },
        ],
      };
    });
  };

  const boxClickHandler = (key) => {
    setboxesData((prev) => ({ ...prev, active: key }));
  };

  return (
    <div className="parent-container">
      <div ref={containerRef} className="box-container">
        {boxesData.boxes.map((item, id) => (
          <Box
            key={id}
            color={Colors[item.id % 10]}
            item={item}
            active={boxesData.active === item.id}
            onClickHandler={boxClickHandler}
            id={item.id}
            top={item.top}
            left={item.left}
          />
        ))}
      </div>
      <div className="card-footer text-muted footer">
        <button onClick={OnAddHAndle}>Add Card</button>
      </div>
    </div>
  );
}

export default memo(Layout)
