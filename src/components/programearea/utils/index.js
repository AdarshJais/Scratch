import React from "react";
import Say from "../programetiles/looks/Say";
import SayTillTime from "../programetiles/looks/SayTillTime";
import Think from "../programetiles/looks/Think";
import ThinkTillTime from "../programetiles/looks/ThinkTillTime";
import MoveX from "../programetiles/motions/MoveX";
import MoveXY from "../programetiles/motions/MoveXY";
import MoveY from "../programetiles/motions/MoveY";
import PointTowards from "../programetiles/motions/PointTowards";
import SetX from "../programetiles/motions/SetX";
import SetXY from "../programetiles/motions/SetXY";
import SetY from "../programetiles/motions/SetY";
import TurnAntiClockWise from "../programetiles/motions/TurnAntiClockWise";
import TurnClockWise from "../programetiles/motions/TurnClockWise";

export function renderProgrameTiles(key, id, index) {
  switch (key) {
    case "MOVE_X":
      return <MoveX comp_id={id} index={index} />;
    case "MOVE_Y":
      return <MoveY comp_id={id} index={index} />;
    case "MOVE_XY":
      return <MoveXY comp_id={id} index={index} />;
    case "SET_X":
      return <SetX comp_id={id} index={index} />;
    case "SET_Y":
      return <SetY comp_id={id} index={index} />;
    case "SET_XY":
      return <SetXY comp_id={id} index={index} />;
    // case "SET_XY_AFTER":
    //   return <MoveX comp_id={id} index={index} />;
    case "TURN_ANTI_CLOCKWISE":
      return <TurnAntiClockWise comp_id={id} index={index} />;
    case "TURN_CLOCKWISE":
      return <TurnClockWise comp_id={id} index={index} />;
    case "POINT_TOWARDS":
      return <PointTowards comp_id={id} index={index} />;

    case "SAY":
      return <Say comp_id={id} index={index} />;
    case "SAY_TILL_TIME":
      return <SayTillTime comp_id={id} index={index} />;
    case "THINK":
      return <Think comp_id={id} index={index} />;
    case "THINK_TILL_TIME":
      return <ThinkTillTime comp_id={id} index={index} />;
    default:
      return <MoveX comp_id={id} index={index} />;
  }
}

export const getCatElem = () => {
  return document.getElementById("cat");
};

export const getCatParentElem = () => {
  return document.getElementById("cat-parent");
};

export const getCatOffsets = () => {
  let el = getCatElem();
  var offsets = el.getBoundingClientRect();
  return offsets;
};

export const getCatParentOffsets = () => {
  let elParent = getCatParentElem();
  let offsetsParent = elParent.getBoundingClientRect();
  return offsetsParent;
};

export const getOrigin = () => {
  const CAT_WIDTH = 95.17898101806641;
  const CAT_HEIGHT = 100.04156036376953;
  let offsetsParent = getCatParentOffsets();
  let originX = offsetsParent.left + (offsetsParent.width / 2 - CAT_WIDTH / 2);
  let originY = offsetsParent.height / 2 - CAT_HEIGHT / 2;
  return {
    x: originX,
    y: originY,
  };
};

export const moveXSteps = (steps) => {
  let el = getCatElem();
  let catOffsets = getCatOffsets();
  el.style.position = "absolute";
  el.style.left = catOffsets?.left + steps + "px";
};

export const moveYSteps = (steps) => {
  let el = getCatElem();
  let catOffsets = getCatOffsets();
  el.style.position = "absolute";
  el.style.top = catOffsets?.top + steps + "px";
};

export const moveXAndYSteps = ({ xSteps, ySteps }) => {
  moveXSteps(xSteps);
  moveYSteps(ySteps);
};

export const setToX = (x) => {
  let el = getCatElem();
  let origin = getOrigin();
  el.style.position = "absolute";
  el.style.left = origin?.x + x + "px";
};

export const setToY = (y) => {
  let el = getCatElem();
  let origin = getOrigin();
  el.style.position = "absolute";
  el.style.top = origin?.y + y + "px";
};

export const setToXAndY = ({ x, y }) => {
  setToX(x);
  setToY(y);
};

export const setToXAndYAfter = ({ x, y, time }) => {
  setTimeout(() => {
    setToX(x);
    setToY(y);
  }, time);
};

export const getCurrentRotateValue = () => {
  const element = getCatElem();
  if (element) {
    const computedStyle = window.getComputedStyle(element);
    const initialTransform =
      computedStyle.transform || computedStyle.webkitTransform;

    // Extracting rotation from a 2D transformation matrix
    const match = initialTransform.match(
      /matrix\((.+), (.+), (.+), (.+), (.+), (.+)\)/
    );

    if (match && match.length === 7) {
      const [, a, b, c, d] = match;
      const angle = Math.atan2(b, a) * (180 / Math.PI);

      // Round to a certain number of decimal places (e.g., 2)
      const roundedAngle = Math.round(angle * 100) / 100;
      console.log("roundedAngle", roundedAngle);
      return roundedAngle;
    }
  }
  console.log("roundedAngle___", 0);
  return 0;
};

export const turnClockWise = (degree) => {
  const element = getCatElem();
  const newDegree = getCurrentRotateValue() + degree;
  element.style.transform = `rotate(${newDegree}deg)`;
};

export const turnAntiClockWise = (degree) => {
  const element = getCatElem();
  const newDegree = getCurrentRotateValue() - degree;
  element.style.transform = `rotate(${newDegree}deg)`;
};

export const pointTowards = (degree) => {
  const element = getCatElem();
  if (element) {
    element.style.transform = `rotate(${degree}deg)`;
  }
};

// export const pointTowards_ = (targetAngle) => {
//   const element = getCatElem();

//   // Calculate the difference in angles
//   const angleDifference = targetAngle - getCurrentRotateValue();

//   // Set the rotation to point towards the target angle
//   element.style.transform = `rotate(${angleDifference}deg)`;
// };

export const getSayBubbleElem = () => {
  return document.getElementById("say-bubble");
};

export const getThinkBubbleElem = () => {
  return document.getElementById("think-bubble");
};
export const sayMessage = (message) => {
  let sayElem = getSayBubbleElem();
  let thinkElem = getThinkBubbleElem();
  sayElem.style.display = "block";
  thinkElem.style.display = "none";
  sayElem.innerHTML = message;
};

export const sayMessageTillTime = ({ message, time }) => {
  let sayElem = getSayBubbleElem();
  let thinkElem = getThinkBubbleElem();
  sayElem.style.display = "block";
  thinkElem.style.display = "none";
  sayElem.innerHTML = message;
  setTimeout(() => {
    sayElem.style.display = "none";
  }, time);
};

export const thinkMessage = (message) => {
  let sayElem = getSayBubbleElem();
  let thinkElem = getThinkBubbleElem();
  thinkElem.style.display = "block";
  sayElem.style.display = "none";
  thinkElem.innerHTML = message;
};

export const thinkMessageTillTime = ({ message, time }) => {
  let sayElem = getSayBubbleElem();
  let thinkElem = getThinkBubbleElem();
  thinkElem.style.display = "block";
  sayElem.style.display = "none";
  thinkElem.innerHTML = message;
  setTimeout(() => {
    thinkElem.style.display = "none";
  }, time);
};
