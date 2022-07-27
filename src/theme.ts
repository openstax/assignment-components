import { css } from 'styled-components';

const palette = {
  red: "rgb(202, 32, 38)",
  danger: "#c2002f", // dark red
  green: "rgb(119, 175, 66)",
  lightGreen: "rgb(139, 199, 83)",
  paleYellow: "rgb(255, 255, 187)",
  teal: "rgb(13, 192, 222)",
  blue: "rgb(0, 125, 164)",
  lightBlue: "rgb(52, 189, 216)",
  neutralLightBlue: "rgb(13, 192, 220)",
  tangerine: "rgb(255, 189, 62)",
  white: "rgb(255, 255, 255)",
  neutralLightest: "rgb(249, 249, 249)", // nearly white
  neutralBright: "rgb(245, 245, 245)", // bright gray
  neutralLighter: "rgb(241, 241, 241)", // light gray
  neutralLight: "rgb(229, 229, 229)", // light gray
  neutralMedium: "rgb(160, 160, 160)", // light gray
  neutral: "rgb(129, 129, 129)", // gray
  neutralCool: "#f6f7f8",
  neutralDark: "rgb(95, 97, 99)", // dark gray
  neutralDarker: "rgb(66, 66, 66)", // very dark gray
  neutralThin: '#6f6f6f',
  black: "rgb(0, 0, 0)",
};

export const colors = {
  palette: palette,
  answer: {
    color: palette.lightBlue,
    correct: {
      color: palette.green,
      background: "#77af42",
    },
    incorrect: {
      color: palette.red,
      background: palette.red,
    },
    checked: palette.lightBlue,
    hover: palette.neutralDark,
    label: {
      color: palette.neutralMedium,
      colorHover: palette.neutralDark,
      colorSelected: palette.lightBlue,
    },
    feedback: {
      arrowOuterColor: "rgba(0, 0, 0, 0.25)",
      popover: {
        borderColor: "rgba(0, 0, 0, 0.2)",
      },
    },
  },
  freeResponse: {
    color: palette.neutralDark,
    background: palette.neutralLighter,
  },
};

export const layouts = {
  answer: {
    verticalSpacing: "1.5rem",
    horizontalSpacing: "1rem",
    horizontalBuffer: "2.5rem",
    bubbleSize: "4rem",
    labelSpacing: "6.5rem",
    feedback: {
      arrow: {
        width: "20px",
        height: "15px",
      },
      popover: {
        horizontalSpacing: "2rem",
        verticalSpacing: "2rem",
        horizontalBuffer: "4rem",
        borderWidth: "1px",
        maxWidth: "370px",
      }
    },
  },
};

export const breakpoints = {
  mobile: "600px",
  tabletCollapse: "999px",
};

export const transitions = {
  answer: "0.1s ease-in-out",
}

export const mixins = {
  answer: () => css`
    .answer-label {
      display: flex;
    }
    color: ${colors.answer.label.color};
    .answer-letter {
      width: ${layouts.answer.bubbleSize};
      height: ${layouts.answer.bubbleSize};
      min-width: ${layouts.answer.bubbleSize};
      min-height: ${layouts.answer.bubbleSize};
      border-radius: calc(${layouts.answer.bubbleSize} / 2);
      border-width: 2px;
      border-style: solid;
      border-color: #c6c6c6;
      color: ${colors.answer.label.colorHover};
      transition: color ${transitions.answer}, border-color ${transitions.answer}, background-color ${transitions.answer};
      background-color: ${colors.palette.white};
    }
  `,
  answerColor: (values: { color: string, background: string }) => css`
    color: ${values.color};
    .answer-letter {
       border-color: ${values.color};
       background-color: ${values.background};
       color: ${colors.palette.white};
    }
  `,
  answerChecked: () => mixins.answerColor({ color: colors.answer.checked, background: colors.answer.checked }),
  answerCorrect: () => mixins.answerColor(colors.answer.correct),
  answerIncorrect: () => mixins.answerColor(colors.answer.incorrect),
  answerHover: () => css`
    color: ${colors.answer.label.colorHover};
    .answer-letter {
      border-color: ${colors.answer.label.colorSelected};
    }
  `,
  answerCorrectText: () => css`
    content: 'correct answer';
    color: ${colors.answer.label.color};
    margin-left: calc(-1.25 * ${layouts.answer.bubbleSize});
    width: calc(1.25 * ${layouts.answer.bubbleSize});
    text-align: center;
    font-size: 1.2rem;
    // em used here for line-height for compatibility with IE
    // http://caniuse.com/#feat=rem -- rem ignored in pseudo elements
    line-height: 1em;
    margin-top: 0.8rem;
  `,
  answerCorrectAnswer: () => css`
    color: ${colors.answer.correct.color};
    .answer-letter {
      border-color: ${colors.answer.correct.color};
      color: ${colors.answer.correct.color};
    }
    &::before {
     ${mixins.answerCorrectText()}
      @media screen and (max-width: ${breakpoints.tabletCollapse}) {
        display: none;
      }
    }
    @media screen and (max-width:  ${breakpoints.tabletCollapse}) {
      .answer-letter-wrapper {
        display: flex;
        flex-direction: column;
        &::after {
          ${mixins.answerCorrectText()}
          width: $openstax-answer-bubble-size !important;
          margin-left: 0;
        }
      }
    }
  `,
  resetText: () => css`
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-style: normal;
    font-weight: 400;
    line-height: 1.6;
    text-align: left;
    text-align: start;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-break: normal;
    word-spacing: normal;
    white-space: normal;
    line-break: auto;
  `,
};

const theme = {
  colors: colors,
  layouts: layouts,
  transitions: transitions,
  breakpoints: breakpoints,
};

export default theme;
