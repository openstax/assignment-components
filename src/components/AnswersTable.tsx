import { answerType, idType } from "src/types";
import { Answer, AnswerProps } from "./Answer";
import { Feedback } from "./Feedback";

export interface AnswersTableProps {
  questionId: idType;
  answers: answerType[];
  type: AnswerProps['type']; // @TODO
  answer_id: idType;
  correct_answer_id?: idType;
  incorrectAnswerId?: idType;
  feedback_html: string;
  correct_answer_feedback_html: string;
  answered_count: number;
  show_all_feedback: boolean;
  onChangeAnswer: () => void;
  hideAnswers: boolean;
  hasCorrectAnswer: boolean;
  onChangeAttempt: () => void;
  choicesEnabled: boolean;
  onKeyPress?: () => void;
}

export const AnswersTable = (props: AnswersTableProps) => {
  let idCounter = 0;

  const {
    questionId, answers, hideAnswers, type, answered_count, choicesEnabled, correct_answer_id,
    incorrectAnswerId, answer_id, feedback_html, correct_answer_feedback_html,
    show_all_feedback, hasCorrectAnswer, onChangeAnswer, onKeyPress
  } = props;
  if (hideAnswers) { return null; }

  const feedback: { index: number, html: string }[] = [];
  const instructions = '';

  const chosenAnswer = [answer_id];

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
    onKeyPress
  };

  const answersHtml = answers.map((answer, i) => {
    const additionalProps: { answer: answerType, iter: number, key: string }
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
      <Feedback key={spliceIndex}>
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
