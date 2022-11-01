export const LETTER_STATUS = {
  ABSENT: "absent",
  PRESENT: "present",
  CORRECT: "correct",
};

export const LETTER_STATUS_PRIORITY = {
  [LETTER_STATUS.CORRECT]: 1,
  [LETTER_STATUS.PRESENT]: 2,
  [LETTER_STATUS.ABSENT]: 3,
}

export const KEYBOARD_FIRST_ROW_KEYS = ['Q', 'W', 'E', 'R' ,'T' ,'Y', 'U', 'I', 'O', 'P' ];
export const KEYBOARD_SECOND_ROW_KEYS = ['A', 'S', 'D', 'F' ,'G' ,'H', 'J', 'K', 'L' ];
export const KEYBOARD_LAST_ROW_KEYS = ['Z', 'X', 'C', 'V' ,'B' ,'N', 'M'];