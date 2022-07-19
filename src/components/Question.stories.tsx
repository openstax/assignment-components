import { Question, QuestionProps } from './Question';

const answersTableProps = {
  questionId: '1',
  answers: [{
    id: '1',
    correctness: undefined,
    content_html: 'True'
  }, {
    id: '2',
    correctness: undefined,
    content_html: 'False'
  }],
  type: ('student' as any),
  answer_id: '',
  chosenAnswerId: '',
  feedback_html: '',
  correct_answer_feedback_html: '',
  answered_count: 0,
  show_all_feedback: false,
  onChangeAnswer: () => { console.log('onChangeAnswer') },
  hideAnswers: false,
  hasCorrectAnswer: false,
  onChangeAttempt: () => { console.log('onChangeAttempt') },
  keySet: ('TODO' as any),
  focus: false,
  choicesEnabled: true,
};

const props: QuestionProps = {
  _temp_AnswersTableProps: answersTableProps,
  question: {
    stem_html: '',
    collaborator_solutions: '',
    formats: '',
    stimulus_html: '',
  },
  task: {
    is_deleted: false,
    type: 'homework'
  },
  correct_answer_id: '',
  incorrectAnswerId: '',
  hideAnswers: false,
  hidePreambles: false,
  exercise_uid: '',
  displayFormats: false,
  processHtmlAndMath: false,
  className: '',
  questionNumber: 1,
  displaySolution: false,
  context: '',
  correct_answer_feedback_html: 'Feedback',
};

export const Default = () => <Question {...props} />;
export const Checked = () => <Question {...props} answer_id={'1'} />;
export const Correct = () => <Question {...props} answer_id={'1'} displaySolution={true} correct_answer_id={'1'} />;
