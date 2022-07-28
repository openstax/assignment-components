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

const mathProps = {
  ...props,
  question: {
    ...props.question,
    stem_html: `<img src=\"https://openstax.org/apps/archive/20220509.174553/resources/4fbd8e0f91f2743410fee47978931bf4715f97ef\" alt=\"An accelerating right-facing rocket sled is shown on tracks. Four thrust force vectors are behind the sled and are pointing to the right. An acceleration vector is above the sled and is pointing to the right. A friction force vector is in front of the sled and is pointing to the left. A Newton vector is below the sled and is pointing upward. A weight vector is also below the sled and is pointing downward. A free body diagram illustrates the force vectors.\">\nCalculate the magnitude of force exerted by each rocket, called its thrust <span data-math=\"T\">T</span>, for the four-rocket propulsion system shown. The sled’s initial acceleration is <span data-math=\"49\\,\\text{m/s}^2\">49\\,\\text{m/s}^2</span>, the mass of the system is <span data-math=\"2100\\,\\text{kg}\">2100\\,\\text{kg}</span>, and the force of friction opposing the motion is <span data-math=\"650\\,\\text{N}\">650\\,\\text{N}</span>.`
  }
};

export const Default = () => <Question {...props} />;
export const Checked = () => <Question {...props} answer_id={'1'} />;
export const Correct = () => <Question {...props} answer_id={'1'} correct_answer_id={'1'} />;
export const Incorrect = () => <Question {...props} answer_id={'2'} correct_answer_id={'1'} />;
export const Math = () => <Question {...mathProps} />
