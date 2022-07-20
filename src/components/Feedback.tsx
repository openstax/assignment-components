import classnames from 'classnames';
import { ReactNode } from 'react';

interface FeedbackProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  children?: ReactNode;
}

const Feedback = (props: FeedbackProps) => {
  const position = props.position || 'bottom';
  const wrapperClasses = classnames('question-feedback', position);

  return (
    <aside className={wrapperClasses}>
      <div className="arrow" aria-label="Answer Feedback" />
      {props.children}
    </aside>
  );
};

export { Feedback };
