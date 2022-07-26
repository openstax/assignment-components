import { ExerciseQuestion, ExerciseQuestionProps } from './ExerciseQuestion';
import renderer from 'react-test-renderer';

describe('ExerciseQuestion', () => {
  let props: ExerciseQuestionProps;

  props = {
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
    questionNumber: 1,
    choicesEnabled: false,
    hasMultipleAttempts: false,
    onAnswerChange: () => null,
    onAnswerSave: () => null,
    onNextStep: () => null,
    feedback_html: '',
    correct_answer_feedback_html: '',
    is_completed: false,
    correct_answer_id: '',
    incorrectAnswerId: '',
    multiPartGroup: [],
    answerId: '',
    attempts_remaining: 2,
    published_comments: '',
    detailedSolution: '',
    canAnswer: false,
    needsSaved: false,
    canUpdateCurrentStep: false,
    attempt_number: 0,
    apiIsPending: false,
    displaySolution: false,
    available_points: '',
    exercise_uid: '',
  }

  it('matches snapshot', () => {
    const tree = renderer.create(
      <ExerciseQuestion {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
