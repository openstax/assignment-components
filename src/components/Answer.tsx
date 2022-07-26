import cn from 'classnames';
import { ReactNode } from 'react';
import { ALPHABET, isAnswerChecked, isAnswerCorrect, isAnswerIncorrect } from '../utils';
import { Answer as AnswerType, ChosenAnswer, ID } from '../types';
import { Content } from './Content';
import { SimpleFeedback } from './Feedback';

export interface AnswerProps {
  answer: AnswerType;
  iter: number;
  qid: ID;
  type: 'teacher-review' | 'teacher-preview' | 'student' | 'student-mpp';
  hasCorrectAnswer?: boolean;
  onChangeAnswer: () => void;
  disabled: boolean;
  chosenAnswer: ChosenAnswer;
  correctAnswerId?: ID | null;
  incorrectAnswerId?: ID;
  onKeyPress?: () => void;
  answered_count?: number;
  correctIncorrectIcon?: ReactNode,
  radioBox?: ReactNode;
  contentRenderer?: JSX.Element;
  show_all_feedback: boolean;
}

export const Answer = (props: AnswerProps) => {
  const {
    type,
    iter,
    answer,
    disabled,
    onKeyPress,
    qid,
    chosenAnswer,
    correctAnswerId,
    incorrectAnswerId,
    hasCorrectAnswer,
    answered_count,
    contentRenderer,
    show_all_feedback
  } = props;

  let body, feedback, selectedCount;

  const isChecked = isAnswerChecked(answer, chosenAnswer);
  const isCorrect = isAnswerCorrect(answer, correctAnswerId);
  const isIncorrect = isAnswerIncorrect(answer, incorrectAnswerId);

  const correctIncorrectIcon = (
    <div className="correct-incorrect">
      {isCorrect && props.correctIncorrectIcon}
    </div>
  );

  const classes = cn('answers-answer', {
    'disabled': disabled,
    'answer-checked': isChecked,
    'answer-correct': isCorrect && type !== 'student-mpp',
    'answer-incorrect': incorrectAnswerId && isAnswerIncorrect(answer, incorrectAnswerId),
  });

  let ariaLabel = `${isChecked ? 'Selected ' : ''}Choice ${ALPHABET[iter]}`;
  // somewhat misleading - this means that there is a correct answer,
  // not necessarily that this answer is correct
  if (hasCorrectAnswer) {
    ariaLabel += `(${isCorrect ? 'Correct' : 'Incorrect'} Answer)`;
  }
  ariaLabel += ':';

  let onChangeAnswer, radioBox;

  if (!hasCorrectAnswer
    && (type !== 'teacher-review')
    && (type !== 'teacher-preview')
    && (type !== 'student-mpp')) {
    ({ onChangeAnswer } = props);
  }

  if (onChangeAnswer) {
    radioBox = (
      <input
        type="radio"
        className="answer-input-box"
        checked={isChecked}
        id={`${qid}-option-${iter}`}
        name={`${qid}-options`}
        onChange={onChangeAnswer}
        disabled={disabled}
      />
    );
  }

  if (show_all_feedback && answer.feedback_html) {
    feedback = (
      <SimpleFeedback key="question-mc-feedback" contentRenderer={contentRenderer}>
        {answer.feedback_html}
      </SimpleFeedback>
    );
  }

  if (type === 'teacher-review') {
    let percent = 0;
    if (answer.selected_count && answered_count) {
      percent = Math.round((answer.selected_count / answered_count) * 100);
    }
    selectedCount = (
      <span
        className="selected-count"
        data-percent={`${percent}`}
      >
        {answer.selected_count}
      </span>
    );

    body = (
      <div className="review-wrapper">
        <div className={cn('review-count', { 'green': isCorrect, 'red': !isCorrect })}>
          {selectedCount}
          <span className={cn('letter', { 'green': isCorrect, 'red': !isCorrect })}>
            {ALPHABET[iter]}
          </span>
        </div>

        <div className="answer-answer">
          <Content className="answer-content" component={contentRenderer} html={answer.content_html} />
          {feedback}
        </div>
      </div>
    );
  } else {
    body = (
      <>
        {type === 'teacher-preview' && correctIncorrectIcon}
        {selectedCount}
        {radioBox}
        <label
          onKeyPress={onKeyPress}
          htmlFor={`${qid}-option-${iter}`}
          className="answer-label">
          <span className="answer-letter-wrapper">
            <button
              onClick={onChangeAnswer}
              aria-label={ariaLabel}
              className="answer-letter"
              disabled={disabled || isIncorrect}
              data-test-id={`answer-choice-${ALPHABET[iter]}`}
            >
              {ALPHABET[iter]}
            </button>
          </span>
          <div className="answer-answer">
            <Content className="answer-content" component={contentRenderer} html={answer.content_html} />
            {feedback}
          </div>
        </label>
      </>
    );
  }

  return (
    <div className="openstax-answer">
      <section role="region" className={classes}>
        {body}
      </section>
    </div>
  );
}
Answer.displayName = 'OSAnswer';
