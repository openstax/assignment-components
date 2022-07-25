import { Question, QuestionProps } from './Question';

const props: QuestionProps = {
  question: {
    id: '1',
    stem_html: 'Is this a question?',
    collaborator_solutions: [],
    formats: [],
    stimulus_html: '',
    answers: [{
      id: '1',
      correctness: undefined,
      content_html: 'True',
    }, {
      id: '2',
      correctness: undefined,
      content_html: 'False',
    }],
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
  feedback_html: '',
  onChange: () => null,
  correct_answer_feedback_html: 'Feedback',
};

export const Default = () => <Question {...props} />;
export const Checked = () => <Question {...props} answer_id={'1'} />;
export const Correct = () => <Question {...props} answer_id={'1'} correct_answer_id={'1'} />;
export const Incorrect = () => <Question {...props} answer_id={'2'} correct_answer_id={'1'} />;
