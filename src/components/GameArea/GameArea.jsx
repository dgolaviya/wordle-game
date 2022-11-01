import React from "react";
import GameBoardCell from "../GameBoardCell";
import GameKeyboard from "../GameKeyboard";
import {
  LETTER_STATUS,
  KEYBOARD_FIRST_ROW_KEYS,
  KEYBOARD_SECOND_ROW_KEYS,
  KEYBOARD_LAST_ROW_KEYS,
  LETTER_STATUS_PRIORITY,
  generateRandomWord
} from "../../utils";

import "./styles.scss";

class GameArea extends React.Component {
  state = {
    boardState: [
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
    ],
    activeRowIndex: 0,
    answer: generateRandomWord(),
    isGameFinished: false,
    isYouWon: false,
    keyBoardMapping: {
      firstRowChars: {
        Q: {
          keyValue: "Q",
          keyStatus: "",
        },
        W: {
          keyValue: "W",
          keyStatus: "",
        },
        E: {
          keyValue: "E",
          keyStatus: "",
        },
        R: {
          keyValue: "R",
          keyStatus: "",
        },
        T: {
          keyValue: "T",
          keyStatus: "",
        },
        Y: {
          keyValue: "Y",
          keyStatus: "",
        },
        U: {
          keyValue: "U",
          keyStatus: "",
        },
        I: {
          keyValue: "I",
          keyStatus: "",
        },
        O: {
          keyValue: "O",
          keyStatus: "",
        },
        P: {
          keyValue: "P",
          keyStatus: "",
        },
      },
      secondRowChars: {
        A: {
          keyValue: "A",
          keyStatus: "",
        },
        S: {
          keyValue: "S",
          keyStatus: "",
        },
        D: {
          keyValue: "D",
          keyStatus: "",
        },
        F: {
          keyValue: "F",
          keyStatus: "",
        },
        G: {
          keyValue: "G",
          keyStatus: "",
        },
        H: {
          keyValue: "H",
          keyStatus: "",
        },
        J: {
          keyValue: "J",
          keyStatus: "",
        },
        K: {
          keyValue: "K",
          keyStatus: "",
        },
        L: {
          keyValue: "L",
          keyStatus: "",
        },
      },
      thirdRowChars: {
        Enter: {
          keyValue: "Enter",
          keyStatus: "",
        },
        Z: {
          keyValue: "Z",
          keyStatus: "",
        },
        X: {
          keyValue: "X",
          keyStatus: "",
        },
        C: {
          keyValue: "C",
          keyStatus: "",
        },
        V: {
          keyValue: "V",
          keyStatus: "",
        },
        B: {
          keyValue: "B",
          keyStatus: "",
        },
        N: {
          keyValue: "N",
          keyStatus: "",
        },
        M: {
          keyValue: "M",
          keyStatus: "",
        },
        Backspace: {
          keyValue: "Back",
          keyStatus: "",
        },
      },
    },
  };
  componentDidMount() {
    window.addEventListener("keydown", this.keyEventHandler);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyEventHandler);
  }
  fillCell = (keyValue) => {
    const updatedBoardState = [...this.state.boardState];
    //Find Active Row
    const updatedActiveRow = [...updatedBoardState[this.state.activeRowIndex]];
    //Find Empty Cell in a Row
    const emptyCellIndex = updatedActiveRow.findIndex((cell) => !cell.value);
    if (emptyCellIndex >= 0) {
      updatedActiveRow[emptyCellIndex] = {
        ...updatedActiveRow[emptyCellIndex],
        value: keyValue.toUpperCase(),
      };
      updatedBoardState[this.state.activeRowIndex] = updatedActiveRow;
      this.setState({ boardState: updatedBoardState });
    } else {
      console.log("active row is full. No more input required");
    }
  };
  clearCell = () => {
    const updatedBoardState = [...this.state.boardState];
    //Find Active Row
    const updatedActiveRow = [...updatedBoardState[this.state.activeRowIndex]];
    //Find occupied Cell in a Row
    const occupiedCellIndex = updatedActiveRow.findLastIndex(
      (cell) => cell.value
    );
    if (occupiedCellIndex >= 0) {
      updatedActiveRow[occupiedCellIndex] = {};
      updatedBoardState[this.state.activeRowIndex] = updatedActiveRow;
      this.setState({ boardState: updatedBoardState });
    } else {
      console.log("active row is empty. No more clear required");
    }
  };
  submitGuess = () => {
    // const answer = generateRandomWord();
    const { answer } = this.state;
    console.log('answer', answer);
    const answerCharArray = answer.split("");
    const { boardState, activeRowIndex, keyBoardMapping } = this.state;
    const activeRow = boardState[activeRowIndex];
    const updatedKeyboardMapping = { ...keyBoardMapping };
    const guessedAnswer = activeRow.map((cell) => cell.value).join("");
    if (guessedAnswer.length !== answerCharArray.length) {
      return false;
    }
    if (guessedAnswer === answer) {
      this.setState({ isYouWon: true });
    }
    const updatedActiveRow = activeRow.map((cell, index) => {
      if (answerCharArray.includes(cell.value)) {
        if (answerCharArray[index] === cell.value) {
          cell.status = LETTER_STATUS.CORRECT;
        } else {
          cell.status = LETTER_STATUS.PRESENT;
        }
      } else {
        cell.status = LETTER_STATUS.ABSENT;
      }
      if (KEYBOARD_FIRST_ROW_KEYS.includes(cell.value)) {
        const updatedFirstRowChars = {
          ...updatedKeyboardMapping["firstRowChars"],
        };
        const keyboardKeyObj = { ...updatedFirstRowChars[cell.value] };
        const existingKeyStatus = LETTER_STATUS_PRIORITY[keyboardKeyObj.keyStatus];
        const upcomingKeyStatus = LETTER_STATUS_PRIORITY[cell.status];
        if(!existingKeyStatus || existingKeyStatus > upcomingKeyStatus) {
          keyboardKeyObj.keyStatus = cell.status;
        }
        updatedFirstRowChars[cell.value] = keyboardKeyObj;
        updatedKeyboardMapping["firstRowChars"] = updatedFirstRowChars;
      } else if (KEYBOARD_SECOND_ROW_KEYS.includes(cell.value)) {
        const updatedSecondRowChars = {
          ...updatedKeyboardMapping["secondRowChars"],
        };
        const keyboardKeyObj = { ...updatedSecondRowChars[cell.value] };
        const existingKeyStatus = LETTER_STATUS_PRIORITY[keyboardKeyObj.keyStatus];
        const upcomingKeyStatus = LETTER_STATUS_PRIORITY[cell.status];
        if(!existingKeyStatus || existingKeyStatus > upcomingKeyStatus) {
          keyboardKeyObj.keyStatus = cell.status;
        }
        updatedSecondRowChars[cell.value] = keyboardKeyObj;
        updatedKeyboardMapping["secondRowChars"] = updatedSecondRowChars;
      } else if (KEYBOARD_LAST_ROW_KEYS.includes(cell.value)) {
        const updatedThirdRowChars = {
          ...updatedKeyboardMapping["thirdRowChars"],
        };
        const keyboardKeyObj = { ...updatedThirdRowChars[cell.value] };
        const existingKeyStatus = LETTER_STATUS_PRIORITY[keyboardKeyObj.keyStatus];
        const upcomingKeyStatus = LETTER_STATUS_PRIORITY[cell.status];
        if(!existingKeyStatus || existingKeyStatus > upcomingKeyStatus) {
          keyboardKeyObj.keyStatus = cell.status;
        }
        updatedThirdRowChars[cell.value] = keyboardKeyObj;
        updatedKeyboardMapping["thirdRowChars"] = updatedThirdRowChars;
      }
      return cell;
    });
    const updatedBoardState = [...boardState];
    updatedBoardState[activeRowIndex] = updatedActiveRow;
    const isGameFinished = boardState.length === activeRowIndex + 1;
    this.setState((prevState) => ({
      boardState: updatedBoardState,
      activeRowIndex: prevState.activeRowIndex + 1,
      keyBoardMapping: updatedKeyboardMapping,
      isGameFinished,
    }));
  };
  keyEventHandler = (event) => {
    const { isGameFinished, isYouWon } = this.state;
    if (!isGameFinished && !isYouWon) {
      const isLetter = /^[a-zA-Z]+$/.test(event.key);
      if (event.key.length === 1 && !event.repeat && isLetter) {
        this.fillCell(event.key);
      } else if (event.key === "Backspace" && !event.repeat) {
        this.clearCell();
      } else if (event.key === "Enter" && !event.repeat) {
        this.submitGuess();
      } else {
        // console.log(event);
      }
    }
  };
  onKeyClick = (keyValue) => () => {
    const { isGameFinished, isYouWon } = this.state;
    if (!isGameFinished && !isYouWon) {
      const isLetter = /^[a-zA-Z]+$/.test(keyValue);
      if (keyValue.length === 1 && isLetter) {
        this.fillCell(keyValue);
      } else if (keyValue === "Back") {
        this.clearCell();
      } else if (keyValue === "Enter") {
        this.submitGuess();
      }
    }
  };
  render() {
    const { isGameFinished, boardState, isYouWon, keyBoardMapping } =
      this.state;
    return (
      <div className="game-area">
        {isGameFinished && !isYouWon && (
          <h1 className="try-again-message my-10">
            Sorry You lost the game Try again next time.
          </h1>
        )}
        {isYouWon && (
          <h1 className="success-message my-10">
            {" "}
            Congratulations you won the game{" "}
          </h1>
        )}
        {boardState.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="board-row">
            {row.map((cell, cellIndex) => (
              <GameBoardCell
                key={`cell-${cellIndex}`}
                cellStatus={cell.status}
                cellValue={cell.value}
              />
            ))}
          </div>
        ))}
        <GameKeyboard
          onKeyClick={this.onKeyClick}
          keyBoardMapping={keyBoardMapping}
        />
      </div>
    );
  }
}

export default GameArea;

// const GameArea = () => {
//   const [boardState, setBoardState] = useState([
//     [{}, {}, {}, {}, {}],
//     [{}, {}, {}, {}, {}],
//     [{}, {}, {}, {}, {}],
//     [{}, {}, {}, {}, {}],
//     [{}, {}, {}, {}, {}],
//     [{}, {}, {}, {}, {}],
//   ]);
//   const [activeRowIndex, setActiveRowIndex] = useState(0);

//   const keyEventHandler = (event) => {
//     const isLetter = /^[a-zA-Z]+$/.test(event.key);
//     if (event.key.length === 1 && !event.repeat && isLetter) {
//       console.log(boardState);
//       const updatedBoardState = [...boardState];
//       //Find Active Row
//       const updatedActiveRow = [...updatedBoardState[activeRowIndex]];
//       //Find Empty Cell in a Row
//       const emptyCellIndex = updatedActiveRow.findIndex((cell) => !cell.value);
//       console.log(emptyCellIndex);
//       if (emptyCellIndex >= 0) {
//         updatedActiveRow[emptyCellIndex] = {
//           ...updatedActiveRow[emptyCellIndex],
//           value: event.key.toUpperCase(),
//         };
//         updatedBoardState[activeRowIndex] = updatedActiveRow;
//         console.log(updatedBoardState);
//         setBoardState(updatedBoardState);
//       } else {
//         console.log("active row is full. No more input required");
//       }
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("keydown", keyEventHandler);
//     return () => {
//       window.removeEventListener("keydown", keyEventHandler);
//     };
//   }, [boardState]);
//   //  console.log(boardState);
//   return (
//     <div onKeyDown={keyEventHandler} className="game-area">
//       {boardState.map((row, index) => (
//         <div key={`row-${index}`} className="board-row">
//           {row.map((cell, index) => (
//             <GameBoardCell
//               key={`cell-${index}`}
//               cellStatus={cell.status}
//               cellValue={cell.value}
//             />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };
