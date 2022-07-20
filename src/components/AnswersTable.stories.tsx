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
  feedback_html: '',
  correct_answer_feedback_html: '',
  answered_count: 0,
  show_all_feedback: false,
  onChangeAnswer: () => null,
  hideAnswers: false,
  hasCorrectAnswer: false,
  onChangeAttempt: () => null,
  choicesEnabled: true,
};

export const Default = () => <AnswersTable {...props} />;
export const Checked = () => <AnswersTable {...props} answer_id='1'  />;
