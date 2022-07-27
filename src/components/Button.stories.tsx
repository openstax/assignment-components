import Button from "./Button";

export const Default = () => <Button>Click Me</Button>;
export const Disabled = () => <Button disabled>Click Me</Button>;
export const Waiting = () => <Button isWaiting={true} waitingText="Submitting...">Click Me</Button>;
