import { answerType, idType } from "src/types";
import { Answer, AnswerProps } from "./Answer";

export interface AnswersTableProps {
  questionId: idType;
  answers: answerType[];
  type: AnswerProps['type']; // @TODO
  answer_id: idType;
  correct_answer_id?: idType;
  incorrectAnswerId?: idType;
  chosenAnswerId: idType;
  feedback_html: string;
  correct_answer_feedback_html: string;
  answered_count: number;
  show_all_feedback: boolean;
  onChangeAnswer: () => void;
  hideAnswers: boolean;
  hasCorrectAnswer: boolean;
  onChangeAttempt: () => void;
  keySet: 'TODO';
  focus: boolean;
  choicesEnabled: boolean;
}

const KEYS = { "TODO": "TODO" };

export const AnswersTable = (props: AnswersTableProps) => {
  let idCounter = 0;

  const {
    questionId, answers, hideAnswers, type, answered_count, choicesEnabled, correct_answer_id,
    incorrectAnswerId, answer_id, feedback_html, correct_answer_feedback_html,
    show_all_feedback, keySet, hasCorrectAnswer, focus, onChangeAnswer, chosenAnswerId
  } = props;
  if (hideAnswers) { return null; }

  const feedback: { index: number, html: string }[] = [];
  const instructions = '';

  const chosenAnswer = [answer_id, chosenAnswerId];

  const questionAnswerProps = {
    qid: questionId || `auto-${idCounter++}`,
    correctAnswerId: correct_answer_id,
    incorrectAnswerId,
    hasCorrectAnswer,
    chosenAnswer,
    onChangeAnswer: onChangeAnswer,
    type,
    answered_count,
    disabled: !choicesEnabled,
    show_all_feedback,
  };

  const answersHtml = answers.map((answer, i) => {
    const additionalProps: { answer: answerType, iter: number, key: string, keyControl?: any}
      = { answer, iter: i, key: `${questionAnswerProps.qid}-option-${i}` };
    if (focus) { additionalProps.keyControl = KEYS[keySet] != null ? KEYS[keySet][i] : undefined; }
    //const answerProps = extend({}, additionalProps, questionAnswerProps);
    const answerProps = Object.assign({}, additionalProps, questionAnswerProps);

    if (answer.id === incorrectAnswerId && feedback_html) {
      feedback.push({ index: i, html: feedback_html })
    } else if (answer.id === correct_answer_id && correct_answer_feedback_html) {
      feedback.push({ index: i, html: correct_answer_feedback_html })
    }

    return (
      <Answer {...answerProps} onKeyPress={() => {}} />
    );
  });

  feedback.forEach((item, i) => {
    const spliceIndex = item.index + i + 1;
    answersHtml.splice(spliceIndex, 0, (
      <div key={spliceIndex}>
        {item.html}
      </div>
    ));
  });

  return (
    <div className="answers-table">
      {instructions}
      {answersHtml}
    </div>
  );
}
