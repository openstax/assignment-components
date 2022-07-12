import { Answer } from './Answer';
import renderer from 'react-test-renderer';
import { findByTestId } from '../../test/utils';

describe('Answer', () => {
  const props = {
    iter: 1,
    answer: {
      id: 1,
      correctness: '',
      isCorrect: true,
      content_html: 'Some great content',
    },
    onChangeAnswer: () => jest.fn(),
    disabled: false,
    onKeyPress: () => jest.fn(),
    qid: 1,
    hasCorrectAnswer: false,
    chosenAnswer: [''] ,
    correctAnswerId: 2,
    incorrectAnswerId: 0,
    answered_count: 0,
    show_all_feedback: false,
    keyControl: '',
    selectedCount: 1,
    isIncorrect: false,
    isCorrect: false
  };

  it('matches snapshot', () => {
     const tree = renderer.create(
      <Answer type='student' {...props} />
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
       <Answer type='student' {...props}>
         <div dangerouslySetInnerHTML={{ __html: childContent }}></div>
       </Answer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders feedback', () => {
    const feedback = <div>Insightful commentary</div>;
    const tree = renderer.create(
      <Answer type='student' {...props} feedback={feedback} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders incorrect answer', () => {
    const instance = renderer.create(
      <Answer type='student' {...props} incorrectAnswerId={props.answer.id} hasCorrectAnswer={true} />
    );
    const tree = instance.toJSON();
    expect(tree).toMatchSnapshot();
    expect(
      findByTestId(instance.root, 'answer-choice-b').props
    ).toMatchObject({ "aria-label": "Choice b(Incorrect Answer):" });
  });
});
