import cn from 'classnames';
import { ReactNode } from 'react';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const isAnswerCorrect = function(answer: answerType, correctAnswerId: idType) {
  // if answer does not have an id, check the isCorrect property.
  if (!(answer.id || correctAnswerId)) {
    return answer.isCorrect;
  }
  let isCorrect = answer.id === correctAnswerId;
  if (answer.correctness != null) { isCorrect = (answer.correctness === '1.0'); }

  return isCorrect;
};

const isAnswerIncorrect = function(answer: answerType, incorrectAnswerId: idType) {
  // Allow multiple attempts to show incorrectness without the correct_answer_id
  return answer.id === incorrectAnswerId;
};

const isAnswerChecked = (answer: answerType, chosenAnswer: AnswerProps['chosenAnswer']) =>
  Boolean((chosenAnswer || []).find( a => a == answer.id));

type answerType = {
  id: idType;
  correctness: string;
  isCorrect: boolean;
  content_html: string;
  selected_count?: number;
};
type idType = string | number;

interface AnswerProps {
  answer: answerType;
  iter: number;
  qid: idType;
  type: 'teacher-review' | 'teacher-preview' | 'student' | 'student-mpp';
  hasCorrectAnswer: boolean;
  onChangeAnswer: () => void;
  disabled: boolean;
  chosenAnswer: (string | null | undefined)[];
  correctAnswerId: idType;
  incorrectAnswerId: idType;
  answered_count: number;
  onKeyPress: () => void;
  children?: ReactNode;
  correctIncorrectIcon?: ReactNode,
  feedback?: ReactNode;
  radioBox?: ReactNode;
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
    children,
    feedback
  } = props;

  let body, selectedCount;

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
    'answer-incorrect': isAnswerIncorrect(answer, incorrectAnswerId),
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
  if (type === 'teacher-review' && answer.selected_count) {
    const percent = Math.round((answer.selected_count / answered_count) * 100) || 0;
    selectedCount = (
      <span
        className="selected-count"
        data-percent={`${percent}`}
      >
        {answer.selected_count}
      </span>
    );
  }

  if (type === 'teacher-review') {
    body = (
      <div className="review-wrapper">
        <div className={cn('review-count', { 'green': isCorrect, 'red': !isCorrect })}>
          {selectedCount}
          <span className={cn('letter', { 'green': isCorrect, 'red': !isCorrect })}>
            {ALPHABET[iter]}
          </span>
        </div>

        <div className="answer-answer">
          <div className="answer-content">
            {children || answer.content_html}
          </div>
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
            <div className="answer-content">
              {children || answer.content_html}
            </div>
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
