import { faker } from '@faker-js/faker';
import { LETTER_STATUS } from "./constants";

export const getBackgroundColor = (cellStatus) => {
  const colorMapping = {
    [LETTER_STATUS.ABSENT]: "#787C7E",
    [LETTER_STATUS.PRESENT]: "#C9B458",
    [LETTER_STATUS.CORRECT]: "#6AAA64",
  };
  return colorMapping[cellStatus];
};

export const generateRandomWord = () => {
  return faker.word.adjective(5).toUpperCase()
}
