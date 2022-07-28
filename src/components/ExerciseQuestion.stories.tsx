import { ExerciseQuestion } from './ExerciseQuestion';

const props = {
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
    is_answer_order_important: false,
  },
  task: {
    is_deleted: false,
    type: 'homework' as const
  },
  correct_answer_id: '',
  incorrectAnswerId: '',
  hideAnswers: false,
  hidePreambles: false,
  exercise_uid: '',
  displayFormats: false,
  className: '',
  questionNumber: 1,
  displaySolution: false,
  context: '',
  feedback_html: '',
  correct_answer_feedback_html: '',
  onChange: () => null,
  choicesEnabled: true,
  hasMultipleAttempts: false,
  onAnswerChange: () => null,
  onAnswerSave: () => null,
  onNextStep: () => null,
  is_completed: false,
  multiPartGroup: null,
  answerId: '',
  available_points: '1.0',
  attempts_remaining: 2,
  published_comments: '',
  detailedSolution: '',
  canAnswer: true,
  needsSaved: true,
  canUpdateCurrentStep: true,
  attempt_number: 0,
  apiIsPending: false
};

export const Default = () => <ExerciseQuestion {...props} />;
export const MultipleAttemptsAllLeft = () =>
  <ExerciseQuestion {...props}
    hasMultipleAttempts={true}
    attempts_remaining={2}
    attempt_number={0}
  />;
export const MultipleAttemptsOneLeft = () =>
  <ExerciseQuestion {...props}
    hasMultipleAttempts={true}
    canAnswer={true}
    needsSaved={false}
    canUpdateCurrentStep={true}
    attempts_remaining={1}
    attempt_number={1}
    incorrectAnswerId='2'
  />;
export const MultipleAttemptsNoneLeft = () =>
  <ExerciseQuestion {...props}
    hasMultipleAttempts={true}
    choicesEnabled={false}
    canAnswer={false}
    needsSaved={false}
    canUpdateCurrentStep={false}
    attempts_remaining={0}
    attempt_number={2}
    incorrectAnswerId='2'
  />;
