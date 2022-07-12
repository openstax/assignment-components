import { answerType, chosenAnswerType, idType } from '../src/types';

export const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const MAX_CORRECTNESS = '1.0';

export const isAnswerCorrect = function(answer: answerType, correctAnswerId: idType) {
  // if answer does not have an id, check the isCorrect property.
  if (!(answer.id || correctAnswerId)) {
    return answer.isCorrect;
  }
  let isCorrect = answer.id === correctAnswerId;
  if (answer.correctness != null) { isCorrect = (answer.correctness === MAX_CORRECTNESS); }

  return isCorrect;
};

export const isAnswerIncorrect = function(answer: answerType, incorrectAnswerId: idType) {
  // Allow multiple attempts to show incorrectness without the correct_answer_id
  return answer.id === incorrectAnswerId;
};

export const isAnswerChecked = (answer: answerType, chosenAnswer?: chosenAnswerType) =>
  Boolean((chosenAnswer || []).find( a => a == answer.id));
