import { defaultAnswerType } from "../constants";
import { Answer as AnswerType, AnswerDisplayType, ID, Question } from "src/types";
import { Answer } from "./Answer";
import { Feedback } from "./Feedback";

export interface AnswersTableProps {
  question: Question;
  type?: AnswerDisplayType;
  answer_id?: ID;
  correct_answer_id?: ID;
  incorrectAnswerId?: ID;
  answerIdOrder?: ID[],
  feedback_html: string;
  correct_answer_feedback_html?: string;
  answered_count?: number;
  show_all_feedback?: boolean;
  onChangeAnswer: () => void;
  hideAnswers: boolean;
  hasCorrectAnswer?: boolean;
  onChangeAttempt?: () => void;
  choicesEnabled?: boolean;
  onKeyPress?: () => void;
  contentRenderer?: JSX.Element;
}

export const AnswersTable = (props: AnswersTableProps) => {
  let idCounter = 0;

  const {
    question, hideAnswers, type = defaultAnswerType, answered_count, choicesEnabled, correct_answer_id,
    incorrectAnswerId, answer_id, feedback_html, correct_answer_feedback_html,
    show_all_feedback = false, hasCorrectAnswer, onChangeAnswer, onKeyPress, answerIdOrder
  } = props;
  if (hideAnswers) { return null; }

  const { id } = question;

  const feedback: { index: number, html: string }[] = [];
  const instructions = undefined;

  const chosenAnswer = [answer_id];

  const sortedAnswersByIdOrder = (idOrder: ID[]) => {
    const { answers } = question;
    return answers.slice().sort((a, b) => idOrder.indexOf(a.id) - idOrder.indexOf(b.id));
  }

  const questionAnswerProps = {
    qid: id || `auto-${idCounter++}`,
    correctAnswerId: correct_answer_id,
    incorrectAnswerId,
    hasCorrectAnswer,
    chosenAnswer,
    onChangeAnswer: onChangeAnswer,
    type,
    answered_count,
    disabled: !choicesEnabled,
    show_all_feedback,
    onKeyPress
  };

  const answers = answerIdOrder ? sortedAnswersByIdOrder(answerIdOrder) : question.answers;

  const answersHtml = answers.map((answer, i) => {
    const additionalProps: { answer: AnswerType, iter: number, key: string }
      = { answer, iter: i, key: `${questionAnswerProps.qid}-option-${i}` };
    const answerProps = Object.assign({}, additionalProps, questionAnswerProps);

    if (answer.id === incorrectAnswerId && feedback_html) {
      feedback.push({ index: i, html: feedback_html })
    } else if (answer.id === correct_answer_id && correct_answer_feedback_html) {
      feedback.push({ index: i, html: correct_answer_feedback_html })
    }

    return (
      <Answer {...answerProps} />
    );
  });

  feedback.forEach((item, i) => {
    const spliceIndex = item.index + i + 1;
    answersHtml.splice(spliceIndex, 0, (
      <Feedback key={spliceIndex} contentRenderer={props.contentRenderer}>
        {item.html}
      </Feedback>
    ));
  });

  return (
    <div className="answers-table">
      {instructions}
      {answersHtml}
    </div>
  );
}
