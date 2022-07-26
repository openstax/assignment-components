import styled from "styled-components";
import { ID, Question as QuestionType, Task } from "../types";
import { Content } from "./Content";
import { Question } from './Question';
import { StepCardFooter } from "./StepCardFooter";

export interface ExerciseQuestionProps {
  task?: Task;
  question: QuestionType;
  answer_id_order?: ID[];
  questionNumber: number;
  choicesEnabled: boolean;
  hasMultipleAttempts: boolean;
  onAnswerChange: () => void;
  onAnswerSave: () => void;
  onNextStep: () => void;
  feedback_html: string;
  correct_answer_feedback_html: string;
  is_completed: boolean;
  correct_answer_id: ID;
  incorrectAnswerId: ID;
  multiPartGroup: any;
  answerId: ID;
  attempts_remaining: number;
  published_comments: string;
  detailedSolution: string;
  canAnswer: boolean;
  needsSaved: boolean;
  canUpdateCurrentStep: boolean;
  attempt_number: number;
  apiIsPending: boolean;
  displaySolution: boolean;
  available_points: string;
  exercise_uid: string;
}

// @TODO
const Button = styled.button`
`;
const AsyncButton = (props: any) => {
  console.log(props);
  return <Button />;
}

const AttemptsRemaining = ({ count }: { count: number }) => {
  return (
    <div>{count} attempt{count === 1 ? '' : 's'} left</div>
  );
}

const PublishedComments = ({ published_comments }: { published_comments: string }) => {
  if (!published_comments) { return null; }

  return (
    <div>
      <strong>Feedback:</strong> {published_comments}
    </div>
  );
}

const SaveButton = (props: {
  disabled: boolean, isWaiting: boolean, onAnswerSave: ExerciseQuestionProps['onAnswerSave'],
  attempt_number: number
}) => (
  <AsyncButton
    waitingText="Saving…"
    {...props}
    data-test-id="submit-answer-btn"
  >
    {props.attempt_number == 0 ? 'Submit' : 'Re-submit'}
  </AsyncButton>
);

const NextButton = (props: {
  canUpdateCurrentStep: boolean,
  onNextStep: ExerciseQuestionProps['onNextStep']
}) => {
  return (
    <Button onClick={props.onNextStep} data-test-id="continue-btn">
      {props.canUpdateCurrentStep ? 'Continue' : 'Next'}
    </Button>
  );
}

export const ExerciseQuestion = (props: ExerciseQuestionProps) => {
  const {
    question, task, answer_id_order, onAnswerChange, feedback_html, correct_answer_feedback_html,
    is_completed, correct_answer_id, incorrectAnswerId, choicesEnabled, questionNumber,
    answerId, hasMultipleAttempts, attempts_remaining, published_comments, detailedSolution,
    canAnswer, needsSaved, attempt_number, apiIsPending, onAnswerSave, onNextStep, canUpdateCurrentStep,
    displaySolution, available_points
  } = props;

  return (
    <div data-test-id="student-exercise-question">
      <Question
        task={task}
        question={question}
        answerIdOrder={answer_id_order}
        choicesEnabled={choicesEnabled}
        answer_id={answerId}
        questionNumber={questionNumber}
        onChange={onAnswerChange}
        feedback_html={feedback_html}
        correct_answer_feedback_html={correct_answer_feedback_html}
        correct_answer_id={is_completed ? correct_answer_id : null}
        incorrectAnswerId={incorrectAnswerId}
        className="step-card-body"
        hideAnswers={false}
        displayFormats={false}
        displaySolution={displaySolution}
      >
        <span>FreeResponseReview @TODO</span>
      </Question>
      <StepCardFooter>
        <div className="points">
          <strong>Points: {available_points}</strong>
          <span className="attempts-left">
            {hasMultipleAttempts &&
              attempts_remaining > 0 &&
              <AttemptsRemaining count={attempts_remaining} />}
          </span>
          <PublishedComments published_comments={published_comments} />
          {detailedSolution && (<div><strong>Detailed solution:</strong> <Content html={detailedSolution} /></div>)}
        </div>
        <div className="controls">
          {canAnswer && needsSaved ?
            <SaveButton
             disabled={apiIsPending || !answerId}
             isWaiting={apiIsPending}
             attempt_number={attempt_number}
             onAnswerSave={onAnswerSave}
            /> :
            <NextButton onNextStep={onNextStep} canUpdateCurrentStep={canUpdateCurrentStep} />}
        </div>
      </StepCardFooter>
    </div>
  );
}
