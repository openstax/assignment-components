interface AnswerLetterProps {
  onChange?: () => void;
  ariaLabel: string;
  disabled: boolean;
  isIncorrect: boolean;
  iter: number;
}
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

export const AnswerLetter = (props: AnswerLetterProps) => {
  const { onChange, ariaLabel, disabled, isIncorrect, iter } = props;

  return (
    <span className="answer-letter-wrapper">
      <button
        onClick={onChange}
        aria-label={ariaLabel}
        className="answer-letter"
        disabled={disabled || isIncorrect}
        data-test-id={`answer-choice-${ALPHABET[iter]}`}
      >
        {ALPHABET[iter]}
      </button>
    </span>
  );
};
AnswerLetter.displayName = 'AnswerLetter';
