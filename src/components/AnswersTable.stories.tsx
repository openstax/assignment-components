import { AnswersTable, AnswersTableProps } from './AnswersTable';
const props: AnswersTableProps = {
  question: {
    id: '1',
    stem_html: '',
    collaborator_solutions: [],
    formats: [],
    stimulus_html: '',
    answers: [
      {
        id: '1',
        correctness: '1.0',
        isCorrect: false,
        content_html: 'True'
      }, {
        id: '2',
        correctness: '1.0',
        isCorrect: false,
        content_html: 'False'
      },
    ],
  },
  answer_id: '',
  feedback_html: '',
  correct_answer_feedback_html: '',
  answered_count: 0,
  show_all_feedback: false,
  onChangeAnswer: () => null,
  hideAnswers: false,
  hasCorrectAnswer: false,
  onChangeAttempt: () => null,
  choicesEnabled: true,
};

export const Default = () => <AnswersTable {...props} />;
export const Checked = () => <AnswersTable {...props} answer_id='1'  />;
export const CorrectAnswerFeedback = () => <AnswersTable {...props} answer_id='1' correct_answer_id='1' correct_answer_feedback_html="Feedback" hasCorrectAnswer={true}  />;
export const Ordered = () => <AnswersTable {...props} answerIdOrder={['2', '1']} />;
