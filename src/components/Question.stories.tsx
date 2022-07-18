import { Question } from './Question';
//const props: QuestionProps = {
const answersTableProps = {
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
  type: ('student' as any),
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
  keySet: ('TODO' as any),
  focus: false,
  choicesEnabled: true,
};

export const Default = () => <Question _temp_AnswersTableProps={answersTableProps} />;
export const Checked = () => <Question _temp_AnswersTableProps={{...answersTableProps, chosenAnswerId: '1'}} />;
