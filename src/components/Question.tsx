import styled from 'styled-components';
import { mixins, colors, layouts, transitions } from '../theme';
import { AnswersTable } from './AnswersTable';
import classnames from 'classnames';
import { ID, Question as QuestionType } from 'src/types';
import { ReactNode } from 'react';
import { Content } from './Content';

const StyledQuestion = styled.div`
&.openstax-question {
  font-size: 2rem;

  .detailed-solution {
    margin-bottom: 1rem;
    .header {
      display: inline;
      float: left;
      margin-right: 0.5rem;
      color: #5e6062;
      font-weight: bold;
      flex-basis: 0;
    }
    .solution {
      color: #6f6f6f;
    }
  }

  img {
    display: block;
    margin: auto;
    max-width: 100%;
  }

  .question-stem {
    margin-bottom: 0;
  }

  .answers-table {
    margin-bottom: 20px;
    font-size: 17px;
    line-height: 25px;
  }

  .instructions {
    font-size: 1.4rem;
    font-style: italic;
    margin-top: 10px;
    color: ${colors.palette.neutral};
    margin: 0;

    i {
      margin-left: 5px;
    }

    .text-info {
      color: ${colors.palette.neutralLightBlue};
      padding-left: 5px;
      cursor: pointer;
      font-style: normal;
    }
  }

  .multiple-choice-prompt {
    font-weight: 600;
  }

  .free-response {
    padding: ${layouts.answer.horizontalSpacing} ${layouts.answer.horizontalBuffer};
    margin: ${layouts.answer.verticalSpacing} 0 ${layouts.answer.horizontalSpacing} ${layouts.answer.verticalSpacing};
    border-left: ${layouts.answer.horizontalSpacing} solid ${colors.palette.neutralLighter};
    font-style: italic;
  }

  &:not(.openstax-question-preview) {
    .answers-answer {
      width: initial;
      &:not(.disabled){
        .answer-label:focus{
          background-color: ${colors.palette.neutralLightest};
        }
      }
      ${mixins.answer()};
    }

    .answer-answer {
      flex: 1;
      display: flex;
      align-items: center;
      margin-left: ${layouts.answer.horizontalSpacing};
      * {
        margin: 0;
      }
    }

    .answer-letter {
      text-align: center;
      padding: 0;
    }


    .answer-label {
      font-weight: normal;
      width: 100%;
      padding: ${layouts.answer.verticalSpacing} 0 0 0;
      margin: 0;

      transition: color ${transitions.answer};
    }

    // a selectable answer
    .answer-input-box:not([disabled]) ~ .answer-label {
      cursor: pointer;

      &:hover {
        ${mixins.answerHover()}
      }
    }

    // a selected answer
    &:not(.has-correct-answer) {
      .answer-input-box {
        display: none;

        &:checked {
          + .answer-label,
          + .answer-label:hover {
            ${mixins.answerChecked()};
          }
        }
      }

      .answer-checked{
        .answer-label {
          ${mixins.answerChecked()};
        }
      }
    }

    // answer that has been checked
    &.has-correct-answer {
      .answer-checked {
        &:not(.answer-correct) {
          .answer-label {
            ${mixins.answerIncorrect()};
          }
        }

        &.answer-correct {
          .answer-label {
            ${mixins.answerCorrect()};
          }
        }
      }

      .answer-correct:not(.answer-checked) {
        .answer-label {
          ${mixins.answerCorrectAnswer()}
        }
      }
    }

    &.has-incorrect-answer {
      .answer-incorrect, .answer-checked.answer-incorrect {
        .answer-label {
          ${mixins.answerIncorrect()}
        }
      }
    }

    .question-feedback {
      ${mixins.resetText()}

      z-index: 1;
      position: relative;
      border: ${layouts.answer.feedback.popover.borderWidth} solid ${colors.answer.feedback.popover.borderColor};
      background-color: ${colors.palette.white};
      background-clip: padding-box;
      border-radius: 0.3rem;
      max-width: ${layouts.answer.feedback.popover.maxWidth};
      margin: calc(${layouts.answer.feedback.arrow.height} - 5px) 0 ${layouts.answer.horizontalSpacing} calc(-1 * (2 * ${layouts.answer.horizontalSpacing}));
      box-shadow: 10px 0px 10px rgba(0, 0, 0, .25);
      color: ${colors.palette.neutral};
      font-size: 1.4rem;
      font-style: italic;

      .arrow {
        position: absolute;
        display: block;
        width: ${layouts.answer.feedback.arrow.width};
        height: ${layouts.answer.feedback.arrow.height};
        margin-left: 30px;
        top: calc((${layouts.answer.feedback.arrow.height} + ${layouts.answer.feedback.popover.borderWidth}) * -1);

        &::before,
        &::after {
          position: absolute;
          display: block;
          content: "";
          border-color: transparent;
          border-style: solid;
          border-width: 0 calc(${layouts.answer.feedback.arrow.width} / 2) ${layouts.answer.feedback.arrow.height} calc(${layouts.answer.feedback.arrow.width} / 2);
        }
        &::before {
          top: 0;
          border-bottom-color: ${colors.answer.feedback.popover.borderColor};
        }
        &::after {
          top: ${layouts.answer.feedback.popover.borderWidth};
          border-bottom-color: ${colors.palette.white};
        }
      }

      .question-feedback-content {
        padding: ${layouts.answer.feedback.popover.verticalSpacing} ${layouts.answer.feedback.popover.horizontalSpacing};
      }
    }
  }

  .openstax-answer {
    border-top: 1px solid #d5d5d5;
    margin: 10px 0;
    padding: 10px 0;
  }
}
`;

export interface QuestionProps {
  question: QuestionType,
  answer_id?: string;
  task?: {
    is_deleted: boolean;
    type?: 'homework'
  } | null,
  correct_answer_id: ID;
  incorrectAnswerId: ID;
  hideAnswers: boolean;
  hidePreambles: boolean,
  exercise_uid?: string;
  displayFormats: boolean,
  processHtmlAndMath: boolean;
  className: string;
  questionNumber: number;
  displaySolution: boolean;
  context?: string;
  correct_answer_feedback_html?: string;
  contentRenderer?: JSX.Element;
  feedback_html: string;
  onChange: () => void;
  show_all_feedback?: boolean;
  children?: ReactNode;
}

export const Question = (props: QuestionProps) => {
  let exerciseUid, solution;

  const {
    question, correct_answer_id, incorrectAnswerId, exercise_uid, className, questionNumber, context, task, hidePreambles
  } = props;

  const { stem_html, collaborator_solutions, formats, stimulus_html } = question;

  const hasCorrectAnswer = !!correct_answer_id;
  const hasIncorrectAnswer = !!incorrectAnswerId;

  const taskIsDeleted = (task != null ? task.is_deleted : undefined)
  const taskIsHomework = ((task != null ? task.type : undefined) === 'homework');

  const classes = classnames('openstax-question', className, {
    'has-correct-answer': hasCorrectAnswer && !(taskIsDeleted && taskIsHomework),
    'has-incorrect-answer': hasIncorrectAnswer,
  });

  const hasSolution = () => {
    const { question, displaySolution } = props;
    const { collaborator_solutions } = question;

    return (
      displaySolution && collaborator_solutions.find(s => s['content_html'] !== undefined)
    );
  };

  if (exercise_uid != null) {
    exerciseUid = (
      <div className="exercise-uid">
        {exercise_uid}
      </div>
    );
  }

  if (hasSolution()) {
    solution =
      <div className="detailed-solution">
        <div className="header">
          Detailed solution:
        </div>
        <Content
          className="solution"
          block={true}
          html={collaborator_solutions.map(s => s['content_html']).join('')} />
      </div>;
  }

  return (
    <StyledQuestion className={classes} data-question-number={questionNumber} data-test-id="question">
      <QuestionHtml type="context" html={context} hidden={hidePreambles} />
      <QuestionHtml type="stimulus" html={stimulus_html} hidden={hidePreambles} />
      <QuestionHtml type="stem" html={stem_html} hidden={hidePreambles} questionNumber={questionNumber} />
      {props.children}

      <AnswersTable
        {...props}
        onChangeAnswer={props.onChange}
        hasCorrectAnswer={hasCorrectAnswer} />

      {solution}
      {props.displayFormats ? <FormatsListing formats={formats} /> : undefined}
      {exerciseUid}
    </StyledQuestion>
  );
}

interface QuestionHtmlProps {
  html?: string;
  type: string;
  hidden: boolean
  questionNumber?: QuestionProps['questionNumber'];
}

const QuestionHtml = (props: QuestionHtmlProps) => {
  const { html = '', type, hidden, questionNumber } = props;
  if (hidden === true || !(html.length > 0)) { return null; }

  return (
    <Content
      html={html}
      data-question-number={questionNumber}
      className={`question-${type}`}
      block={true}
    />
  );
};

const FormatsListing = ({ formats = [] }: { formats: QuestionType['formats'] }) => {
  return (
    <div className="formats-listing">
      <div className="header">Formats:</div>
      {formats.map((format, i) => <span key={i}>{format}</span>)}
    </div>
  );
};
