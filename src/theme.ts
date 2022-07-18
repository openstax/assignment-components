import { css } from 'styled-components';
export const colors = {
  answer: {
    correct: "rgb(119, 175, 66)",
    incorrect: "rgb(202, 32, 38)",
    checked: "rgb(52, 189, 216)",
    hover: "rgb(95, 97, 99)",
  },
};

export const mixins = {
  answerChecked: () => css`
    color: ${colors.answer.checked};
    .answer-letter {
       border-color: ${colors.answer.checked};
       background-color: ${colors.answer.checked};
       color: #fff;
    }
  `,
};

const theme = {
  colors: colors,

// $openstax-answer-color: $openstax-tertiary-neutral-light; // darker than hover
// $openstax-answer-label-color: $openstax-neutral-medium;
// $openstax-answer-label-color-hover: $openstax-neutral-dark;
// $openstax-answer-label-color-selected: $openstax-info;

// $openstax-correct-answer-color: $openstax-correct-color;
// $openstax-correct-answer-background: $openstax-correct-background;
// $openstax-wrong-answer-color: $openstax-incorrect-color;
// $openstax-wrong-answer-background: $openstax-incorrect-background;

// $openstax-free-response-color: $openstax-neutral-dark;
// $openstax-free-response-background:  $openstax-neutral-lighter;

// $openstax-answer-vertical-spacing: 1.5rem;
// $openstax-answer-horizontal-spacing: 1rem;
// $openstax-answer-horizontal-buffer: $openstax-answer-vertical-spacing + $openstax-answer-horizontal-spacing;

// $openstax-answer-transition: 0.1s ease-in-out;
// $openstax-feedback-horizontal-spacing: 2 * $openstax-answer-horizontal-spacing;
// $openstax-feedback-vertical-spacing: $openstax-feedback-horizontal-spacing;
// $openstax-feedback-horizontal-buffer: 2 * $openstax-feedback-horizontal-spacing;

// $openstax-answer-bubble-size: 4rem;
// $openstax-answer-label-spacing: $openstax-answer-bubble-size + $openstax-answer-horizontal-buffer;

};

export default theme;
