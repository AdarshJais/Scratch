import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateParamOfAtom } from "../../../redux/midarea/action";
import { thinkMessageTillTime } from "../../../utils";
import { LookTileContainer, StyledInput } from "./components";

const ThinkTillTime = ({
  character,
  atomId,
  getChildDetails,
  moleculeId,
  param,
}) => {
  // const [state, setState] = useState({
  //   message: "hello",
  //   time: 2000,
  // });

  const dispatch = useDispatch();

  const handleClick = React.useCallback(() => {
    thinkMessageTillTime({
      message: param.message,
      time: param.time,
    });
  }, [param.message, param.time]);

  // const buttonRef = React.useRef(null);

  // React.useEffect(() => {
  //   buttonRef.current.addEventListener("click", handleClick);

  //   return () => {
  //     buttonRef?.current?.removeEventListener("click", handleClick);
  //   };
  // }, [handleClick]);

  return (
    // <StyledPaper>
    <LookTileContainer id={atomId} onClick={handleClick}>
      think
      <StyledInput
        type="text"
        value={param.message}
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          e.target.value.length > 0 &&
            dispatch(
              updateParamOfAtom({
                moleculeId: moleculeId,
                atomId: atomId,
                param: {
                  message: e.target.value,
                  time: param.time,
                },
              })
            );
        }}
      />
      for
      <StyledInput
        type="number"
        onClickCapture={(e) => {
          e.stopPropagation();
        }}
        value={param.time / 1000}
        onChange={(e) => {
          parseInt(e.target.value) !== 0 &&
            dispatch(
              updateParamOfAtom({
                moleculeId: moleculeId,
                atomId: atomId,
                param: {
                  message: param.message,
                  time: parseInt(e.target.value * 1000),
                },
              })
            );
        }}
      />
      sec
    </LookTileContainer>
    // </StyledPaper>
  );
};

export default ThinkTillTime;
