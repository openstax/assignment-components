import { Answer, AnswerProps } from './Answer';
const props: AnswerProps = {
  type: 'student',
  iter: 0,
  answer: {
    id: '1',
    correctness: null,
    isCorrect: true,
    content_html: 'Anwer',
    selected_count: 5
  },
  onChangeAnswer: () => null,
  disabled: false,
  onKeyPress: () => null,
  qid: 1,
  hasCorrectAnswer: false,
  chosenAnswer: [],
  incorrectAnswerId: 0,
  answered_count: 0,
};

export const Default = () => <Answer {...props} />;
export const Checked = () => <Answer {...props} chosenAnswer={['1']} />;
export const Correct = () => <Answer {...props} correctAnswerId='1' />;
export const Incorrect = () => <Answer {...props} incorrectAnswerId='1' />;
