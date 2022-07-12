import renderer from 'react-test-renderer';

export const findByTestId = (instance: renderer.ReactTestInstance, id: string) =>
  instance.findByProps({'data-test-id': id});
