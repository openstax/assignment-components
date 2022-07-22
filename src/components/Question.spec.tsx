import { Question, QuestionProps } from './Question';
import renderer from 'react-test-renderer';

describe('Question', () => {
  let props: QuestionProps;

  beforeEach(() => {
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
      },
      task: {
        is_deleted: false,
        type: 'homework'
      },
      correct_answer_id: '',
      incorrectAnswerId: '',
      hideAnswers: false,
      hidePreambles: false,
      displayFormats: false,
      processHtmlAndMath: false,
      className: '',
      questionNumber: 1,
      displaySolution: false,
      context: '',
      feedback_html: '',
      onChange: () => null,
      correct_answer_feedback_html: 'Feedback',
    }
  });

  it('matches snapshot', () => {
    const tree = renderer.create(
      <Question {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders solutions', () => {
    props.question.collaborator_solutions = [
      { content_html: 'Content HTML' }
    ];
    const tree = renderer.create(
      <Question {...props} displaySolution={true} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders exercise uid', () => {
    const tree = renderer.create(
      <Question {...props} exercise_uid={'1@1'} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders formats', () => {
    props.question.formats = ['true-false'];
    const tree = renderer.create(
      <Question {...props} displayFormats={true} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('defaults formats', () => {
    props.question.formats = undefined;
    const tree = renderer.create(
      <Question {...props} displayFormats={true} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('sets the correct classes', () => {
    let tree = renderer.create(
      <Question {...props} correct_answer_id='1' />
    );
    expect(tree.root.findByProps({ 'data-test-id': 'question' }).props['className']).toContain('has-correct-answer');

    tree = renderer.create(
      <Question {...props} task={{ is_deleted: true, type: 'homework' }} correct_answer_id='1' />
    );
    expect(tree.root.findByProps({ 'data-test-id': 'question' }).props['className']).not.toContain('has-correct-answer');

    props.task = null;
    tree = renderer.create(
      <Question {...props} task={null} correct_answer_id='1' />
    );
    expect(tree.root.findByProps({ 'data-test-id': 'question' }).props['className']).toContain('has-correct-answer'); // Possible bug here?

    tree = renderer.create(
      <Question {...props} task={{ is_deleted: false, type: undefined }}  />
    );
    expect(tree.root.findByProps({ 'data-test-id': 'question' }).props['className']).not.toContain('has-correct-answer');
  });

  it('defaults QuestionHtml html', () => {
    const tree = renderer.create(
      <Question {...props} context={undefined} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
