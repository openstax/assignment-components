import { Answer, ChosenAnswer, ID } from '../src/types';

export const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const MAX_CORRECTNESS = '1.0';

export const isAnswerCorrect = function(answer: Answer, correctAnswerId?: ID) {
  // if answer does not have an id, check the isCorrect property.
  if (!(answer.id || correctAnswerId)) {
    return answer.isCorrect;
  }
  let isCorrect = answer.id === correctAnswerId;
  if (answer.correctness != null) { isCorrect = (answer.correctness === MAX_CORRECTNESS); }

  return isCorrect;
};

export const isAnswerIncorrect = function(answer: Answer, incorrectAnswerId?: ID) {
  // Allow multiple attempts to show incorrectness without the correct_answer_id
  return answer.id === incorrectAnswerId;
};

export const isAnswerChecked = (answer: Answer, chosenAnswer?: ChosenAnswer) =>
  Boolean((chosenAnswer || []).find( a => a == answer.id));
