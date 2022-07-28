import Button from './Button';
import renderer from 'react-test-renderer';

describe('Button', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <Button>Click Me</Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('isWaiting state matches snapshot', () => {
    const tree = renderer.create(
      <Button isWaiting={true} waitingText="Submitting...">Click Me</Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
