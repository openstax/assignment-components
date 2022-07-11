import { Answer } from './Answer';
import renderer from 'react-test-renderer';

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

  it('renders with a custom renderer', () => {
    props.answer.content_html = `<ol>
  <li>matter is moving at speeds of less than roughly 1% the speed of light,</li>
  <li>objects are too small to be seen with the naked eye, and</li>
  <li>there is the involvement of only a weak gravitational field</li>
</ol>
`;
    const tree = renderer.create(
      <Answer type='student' {...props}>
        <div dangerouslySetInnerHTML={{ __html: props.answer.content_html }}></div>
      </Answer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
