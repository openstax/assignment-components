import classnames from 'classnames';
import { Content } from './Content';

interface FeedbackProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: string;
  className?: string;
  contentRenderer?: JSX.Element;
}

const SimpleFeedback = (props: Pick<FeedbackProps, 'children' | 'className' | 'contentRenderer'>) => (
  <aside>
    <Content
      component={props.contentRenderer}
      className={classnames('question-feedback-content', 'has-html', props.className)}
      html={props.children}
      block={true} />
  </aside>
);

const Feedback = (props: FeedbackProps) => {
  const position = props.position || 'bottom';
  const wrapperClasses = classnames('question-feedback', position);

  return (
    <aside className={wrapperClasses}>
      <div className="arrow" aria-label="Answer Feedback" />
      <SimpleFeedback {...props}>
        {props.children}
      </SimpleFeedback>
    </aside>
  );
};

export { Feedback, SimpleFeedback };
