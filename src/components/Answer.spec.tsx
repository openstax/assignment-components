import { Answer, AnswerProps } from './Answer';
import renderer from 'react-test-renderer';

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
        content_html: 'Some great content',
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
    };
  });

  it('matches snapshot', () => {
     const tree = renderer.create(
       <Answer {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders children instead of content_html if set', () => {
    // Test how Tutor sets answer content
    const childContent = `<ol>
  <li>matter is moving at speeds of less than roughly 1% the speed of light,</li>
  <li>objects are too small to be seen with the naked eye, and</li>
  <li>there is the involvement of only a weak gravitational field</li>
</ol>
`;
    const tree = renderer.create(
      <Answer {...props}>
        <div dangerouslySetInnerHTML={{ __html: childContent }}></div>
      </Answer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders feedback', () => {
    const feedback = <div>Insightful commentary</div>;
    const tree = renderer.create(
      <Answer {...props} feedback={feedback} />
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
      <Answer {...props} type='teacher-preview'  />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
