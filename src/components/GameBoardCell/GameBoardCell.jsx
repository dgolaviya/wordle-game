import React from "react";
import { getBackgroundColor } from '../../utils';

import "./styles.scss";

const GameBoardCell = ({ cellStatus, cellValue }) => {
  return <div className="game-board-cell" style={{ backgroundColor: getBackgroundColor(cellStatus) }}>{cellValue}</div>;
};

export default GameBoardCell;
