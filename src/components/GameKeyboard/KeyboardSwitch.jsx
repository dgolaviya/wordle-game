import React from "react";
import { getBackgroundColor } from "../../utils";

const KeyboardSwitch = ({ keyValue, keyStatus, onKeyClick }) => {
  return (
    <div
      onClick={onKeyClick(keyValue)}
      className="keyboard-switch"
      style={{ backgroundColor: getBackgroundColor(keyStatus) }}
    >
      {keyValue}
    </div>
  );
};

export default KeyboardSwitch;
