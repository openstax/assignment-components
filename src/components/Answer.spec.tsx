import { Answer, AnswerProps } from './Answer';
import renderer from 'react-test-renderer';
import { answerContent } from '../test/fixtures';

describe('Answer', () => {
  let props: AnswerProps;

  beforeEach(() => {
    props = {
      type: 'student',
      iter: 1,
      answer: {
        id: 1,
        correctness: null,
        isCorrect: true,
        content_html: answerContent[0],
        selected_count: 5
      },
      onChangeAnswer: () => jest.fn(),
      disabled: false,
      onKeyPress: () => jest.fn(),
      qid: 1,
      hasCorrectAnswer: false,
      chosenAnswer: [''],
      correctAnswerId: 2,
      incorrectAnswerId: 0,
      answered_count: 10,
      show_all_feedback: false
    };
  });

  it('matches snapshot', () => {
     const tree = renderer.create(
       <Answer {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with a custom renderer if set', () => {
    const CustomRenderer = ({ html = '' }: { html?: string }) => (
      <div className="custom-renderer" dangerouslySetInnerHTML={{ __html: html }} />
    );
    const tree = renderer.create(
      <Answer {...props} contentRenderer={<CustomRenderer />} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders feedback', () => {
    props.show_all_feedback = true;
    props.answer.feedback_html = '<div>Insightful commentary</div>';
    const tree = renderer.create(
      <Answer {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a correct answer', () => {
    const tree = renderer.create(
      <Answer {...props} correctAnswerId={props.answer.id} hasCorrectAnswer={true} disabled={true} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an incorrect answer', () => {
    const tree = renderer.create(
      <Answer {...props} incorrectAnswerId={props.answer.id} hasCorrectAnswer={true} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a checked answer', () => {
    const tree = renderer.create(
      <Answer {...props} chosenAnswer={[props.answer.id]} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders teacher review', () => {
    const tree = renderer.create(
      <Answer {...props} type='teacher-review' />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders teacher preview', () => {
    props = {...props, correctAnswerId: props.answer.id, correctIncorrectIcon: <span>Iconic</span>};
    const tree = renderer.create(
      <Answer {...props} type='teacher-preview' />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
