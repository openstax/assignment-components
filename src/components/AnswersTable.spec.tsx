import { AnswersTable, AnswersTableProps } from './AnswersTable';
import renderer from 'react-test-renderer';

describe('AnswersTable', () => {
  let props: AnswersTableProps;

  beforeEach(() => {
    props = {
      questionId: '1',
      answers: [{
        id: '1',
        correctness: '1.0',
        isCorrect: false,
        content_html: 'A'
      }, {
        id: '1',
        correctness: '1.0',
        isCorrect: false,
        content_html: 'B'
      }],
      type: 'student',
      answer_id: '1',
      chosenAnswerId: '1',
      feedback_html: '',
      correct_answer_feedback_html: '',
      answered_count: 0,
      show_all_feedback: false,
      onChangeAnswer: jest.fn(),
      hideAnswers: false,
      hasCorrectAnswer: true,
      onChangeAttempt: jest.fn(),
      keySet: 'TODO',
      focus: false,
      choicesEnabled: true,
    };
  });

  it('matches snapshot', () => {
     const tree = renderer.create(
       <AnswersTable {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
