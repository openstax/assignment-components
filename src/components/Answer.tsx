import cn from 'classnames';
import React, { ReactNode } from 'react';
import { ALPHABET, isAnswerChecked, isAnswerCorrect, isAnswerIncorrect } from '../utils';
import { answerType, chosenAnswerType, idType } from '../types';

export interface AnswerProps {
  answer: answerType;
  iter: number;
  qid: idType;
  type: 'teacher-review' | 'teacher-preview' | 'student' | 'student-mpp';
  hasCorrectAnswer: boolean;
  onChangeAnswer: () => void;
  disabled: boolean;
  chosenAnswer: chosenAnswerType;
  correctAnswerId?: idType;
  incorrectAnswerId?: idType;
  onKeyPress: () => void;
  answered_count?: number;
  correctIncorrectIcon?: ReactNode,
  feedback?: ReactNode;
  radioBox?: ReactNode;
  contentRenderer?: JSX.Element;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type ComponentType = keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;

interface ContentRendererProps<T extends ComponentType | undefined> {
  className?: string;
  component?: T extends undefined ? undefined :
    T extends ComponentType ? React.ReactComponentElement<T>:
    never;
  html: string;
}

const AnswerContent = (<T extends ComponentType | undefined>(
  {html, component, ...props}: ContentRendererProps<T>
) => {
  if (component !== undefined) {
    return React.cloneElement(component, {html, ...props});
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} {...props} />;
});

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
    feedback,
    contentRenderer
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
          <div className="answer-content">
            <AnswerContent className="answer-content" component={contentRenderer} html={answer.content_html} />
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
            <AnswerContent className="answer-content" component={contentRenderer} html={answer.content_html} />
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
