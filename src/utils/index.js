import React from "react";
import Say from "../components/programmetypes/looks/Say";
import SayTillTime from "../components/programmetypes/looks/SayTillTime";
import Think from "../components/programmetypes/looks/Think";
import ThinkTillTime from "../components/programmetypes/looks/ThinkTillTime";
import MoveX from "../components/programmetypes/motions/MoveX";
import MoveXY from "../components/programmetypes/motions/MoveXY";
import MoveY from "../components/programmetypes/motions/MoveY";
import PointTowards from "../components/programmetypes/motions/PointTowards";
import SetX from "../components/programmetypes/motions/SetX";
import SetXY from "../components/programmetypes/motions/SetXY";
import SetY from "../components/programmetypes/motions/SetY";
import TurnAntiClockWise from "../components/programmetypes/motions/TurnAntiClockWise";
import TurnClockWise from "../components/programmetypes/motions/TurnClockWise";

export function renderProgrameTiles(
  key,
  atomId,
  getChildDetails,
  moleculeId,
  param
) {
  switch (key) {
    case "MOVE_X":
      return <MoveX atomId={atomId} moleculeId={moleculeId} param={param} />;
    case "MOVE_Y":
      return <MoveY atomId={atomId} moleculeId={moleculeId} param={param} />;
    case "MOVE_XY":
      return <MoveXY atomId={atomId} moleculeId={moleculeId} param={param} />;
    case "SET_X":
      return <SetX atomId={atomId} moleculeId={moleculeId} param={param} />;
    case "SET_Y":
      return <SetY atomId={atomId} moleculeId={moleculeId} param={param} />;
    case "SET_XY":
      return <SetXY atomId={atomId} moleculeId={moleculeId} param={param} />;
    // case "SET_XY_AFTER":
    //   return <MoveX atomId={atomId} moleculeId={moleculeId} param={param}  />;
    case "TURN_ANTI_CLOCKWISE":
      return (
        <TurnAntiClockWise
          atomId={atomId}
          moleculeId={moleculeId}
          param={param}
        />
      );
    case "TURN_CLOCKWISE":
      return (
        <TurnClockWise atomId={atomId} moleculeId={moleculeId} param={param} />
      );
    case "POINT_TOWARDS":
      return (
        <PointTowards atomId={atomId} moleculeId={moleculeId} param={param} />
      );

    case "SAY":
      return <Say atomId={atomId} moleculeId={moleculeId} param={param} />;
    case "SAY_TILL_TIME":
      return (
        <SayTillTime atomId={atomId} moleculeId={moleculeId} param={param} />
      );
    case "THINK":
      return <Think atomId={atomId} moleculeId={moleculeId} param={param} />;
    case "THINK_TILL_TIME":
      return (
        <ThinkTillTime atomId={atomId} moleculeId={moleculeId} param={param} />
      );
    default:
      return <MoveX atomId={atomId} moleculeId={moleculeId} param={param} />;
  }
}

export function getProgFunction(prog) {
  const progFunc = {
    MOVE_X: moveXSteps,
    MOVE_Y: moveYSteps,
    MOVE_XY: moveXAndYSteps,
    SET_X: setToX,
    SET_Y: setToY,
    SET_XY: setToXAndY,
    TURN_ANTI_CLOCKWISE: turnAntiClockWise,
    TURN_CLOCKWISE: turnClockWise,
    POINT_TOWARDS: pointTowards,
    SAY: sayMessage,
    SAY_TILL_TIME: sayMessageTillTime,
    THINK: thinkMessage,
    THINK_TILL_TIME: thinkMessageTillTime,
  };
  return progFunc[prog];
}

export const getCatElem = (history) => {
  return document.getElementById(history ? "cat-history" : "cat");
};

export const getCatParentElem = () => {
  return document.getElementById("cat-parent");
};

export const getCatOffsets = (history) => {
  let el = getCatElem(history);
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

const animatePosition = async (
  direction,
  value,
  initialValue,
  targetValue,
  history
) => {
  let el = getCatElem(history);

  const animationDuration = 900; // in milliseconds
  const framesPerSecond = 60;
  const totalFrames = framesPerSecond * (animationDuration / 1000);
  const stepSize = (targetValue - initialValue) / totalFrames;

  for (let frame = 0; frame < totalFrames; frame++) {
    const newPosition = initialValue + stepSize * frame;
    el.style.position = "absolute";
    el.style[direction] = newPosition + "px";

    if (history) {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 / framesPerSecond)
      );
    }
  }

  // Ensure the final position is set accurately
  el.style[direction] = targetValue + "px";
};

const moveSteps = (direction, steps, history) => {
  return new Promise(async (resolve) => {
    let el = getCatElem(history);
    let catOffsets = el.getBoundingClientRect();

    const initialPosition = catOffsets[direction];
    const targetPosition = initialPosition + steps;

    await animatePosition(
      direction,
      steps,
      initialPosition,
      targetPosition,
      history
    );
    resolve();
  });
};

export const moveXSteps = (steps, history) => moveSteps("left", steps, history);
export const moveYSteps = (steps, history) => moveSteps("top", steps, history);

export const moveXAndYSteps = ({ x, y } = param, history) => {
  moveXSteps(x, history);
  moveYSteps(y, history);
};

const setPosition = (direction, value, history) => {
  return new Promise(async (resolve) => {
    let el = getCatElem(history);
    let origin = getOrigin();

    const initialValue = direction == "left" ? origin.x : origin.y;
    const targetValue = initialValue + value;

    await animatePosition(direction, value, initialValue, targetValue, history);

    resolve();
  });
};

export const setToX = (x, history) => setPosition("left", x, history);
export const setToY = (y, history) => setPosition("top", y, history);

export const setToXAndY = ({ x, y } = param, history) => {
  setToX(x, history);
  setToY(y, history);
};

export const getCurrentRotateValue = (history) => {
  const element = getCatElem(history);
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

const rotateElement = async (degree, history, absolute = false) => {
  const element = getCatElem(history);
  const currentDegree = getCurrentRotateValue(history);
  const targetDegree = absolute ? degree : currentDegree + degree;

  const animationDuration = 900; // in milliseconds
  const framesPerSecond = 60;
  const totalFrames = framesPerSecond * (animationDuration / 1000);
  const stepSize = (targetDegree - currentDegree) / totalFrames;

  return new Promise(async (resolve) => {
    for (let frame = 0; frame < totalFrames; frame++) {
      const newDegree = currentDegree + stepSize * frame;
      element.style.transform = `rotate(${newDegree}deg)`;

      if (history) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 / framesPerSecond)
        );
      }
    }

    // Ensure the final rotation is set accurately
    element.style.transform = `rotate(${targetDegree}deg)`;
    resolve();
  });
};

export const pointTowards = (degree, history) =>
  rotateElement(degree, history, true);
export const turnClockWise = (degree, history) =>
  rotateElement(degree, history, false);
export const turnAntiClockWise = (degree, history) =>
  rotateElement(-degree, history, false);

export const getSayBubbleElem = (history) => {
  return document.getElementById(history ? "say-bubble-history" : "say-bubble");
};

export const getThinkBubbleElem = (history) => {
  return document.getElementById(
    history ? "think-bubble-history" : "think-bubble"
  );
};
export const sayMessage = (message, history) => {
  let sayElem = getSayBubbleElem(history);
  let thinkElem = getThinkBubbleElem(history);
  sayElem.style.display = "block";
  thinkElem.style.display = "none";
  sayElem.innerHTML = message;
};

export const sayMessageTillTime = ({ message, time } = param, history) => {
  return new Promise((resolve) => {
    let sayElem = getSayBubbleElem(history);
    let thinkElem = getThinkBubbleElem(history);

    sayElem.style.display = "block";
    thinkElem.style.display = "none";
    sayElem.innerHTML = message;

    setTimeout(() => {
      sayElem.style.display = "none";
      resolve(); // Resolve the promise once the timeout completes
    }, time);
  });
};

export const thinkMessage = (message, history) => {
  let sayElem = getSayBubbleElem(history);
  let thinkElem = getThinkBubbleElem(history);
  thinkElem.style.display = "block";
  sayElem.style.display = "none";
  thinkElem.innerHTML = message;
};

export const thinkMessageTillTime = ({ message, time } = param, history) => {
  return new Promise((resolve) => {
    let sayElem = getSayBubbleElem(history);
    let thinkElem = getThinkBubbleElem(history);

    thinkElem.style.display = "block";
    sayElem.style.display = "none";
    thinkElem.innerHTML = message;

    setTimeout(() => {
      thinkElem.style.display = "none";
      resolve(); // Resolve the promise once the timeout completes
    }, time);
  });
};
