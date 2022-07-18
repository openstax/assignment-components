import { AnswersTable, AnswersTableProps } from './AnswersTable';
const props: AnswersTableProps = {
  questionId: '1',
  answers: [{
    id: '1',
    correctness: '1.0',
    isCorrect: false,
    content_html: 'A'
  }, {
    id: '2',
    correctness: '1.0',
    isCorrect: false,
    content_html: 'B'
  }],
  type: 'student',
  answer_id: '',
  chosenAnswerId: '',
  feedback_html: '',
  correct_answer_feedback_html: '',
  answered_count: 0,
  show_all_feedback: false,
  onChangeAnswer: () => {},
  hideAnswers: false,
  hasCorrectAnswer: false,
  onChangeAttempt: () => {},
  keySet: 'TODO',
  focus: false,
  choicesEnabled: true,
};

export const Default = () => <AnswersTable {...props} />;
export const Checked = () => <AnswersTable {...props} chosenAnswerId='1'  />;
