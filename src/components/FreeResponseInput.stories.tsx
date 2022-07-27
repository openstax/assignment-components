import { FreeResponseInput, FreeResponseProps } from './FreeResponseInput';

const props: FreeResponseProps = {
  isErrored: false,
  showWarning: false,
  isReadOnly: false,
  isDisplayingNudge: false,
  lastSubmitted: '2015-10-06T11:59:00.000Z',
  wordLimit: 5,
  submittedComponent: <span className="last-submitted">Last submitted on July 26 at 4:00 pm</span>
};

export const Default = () => <FreeResponseInput {...props} />;
