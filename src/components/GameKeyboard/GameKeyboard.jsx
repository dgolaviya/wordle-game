import React from "react";
import KeyboardSwitch from "./KeyboardSwitch";
import "./styles.scss";

const GameKeyboard = ({ keyBoardMapping, onKeyClick }) => {
  const firstRowChars = keyBoardMapping["firstRowChars"];
  const secondRowChars = keyBoardMapping["secondRowChars"];
  const thirdRowChars = keyBoardMapping["thirdRowChars"];
  return (
    <div className="game-keyboard">
      <div className="keyboard-row mb-5">
        {Object.keys(firstRowChars).map(key => (
            <KeyboardSwitch onKeyClick={onKeyClick} key={key} {...firstRowChars[key]} />
        ))}
      </div>
      <div className="keyboard-row mb-5">
        {Object.keys(secondRowChars).map(key => (
            <KeyboardSwitch onKeyClick={onKeyClick} key={key} {...secondRowChars[key]} />
        ))}
      </div>
      <div className="keyboard-row mb-5">
        {Object.keys(thirdRowChars).map(key => (
            <KeyboardSwitch onKeyClick={onKeyClick} key={key} {...thirdRowChars[key]} />
        ))}
      </div>
    </div>
  );
};

export default GameKeyboard;
