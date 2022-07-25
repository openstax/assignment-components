import { Content } from './Content';
import renderer from 'react-test-renderer';

describe('Content', () => {
  const html = '<b>Content with HTML</b>';
  const CustomRenderer = ({ html = '' }: { html?: string }) => (
    <div className="custom-renderer" dangerouslySetInnerHTML={{ __html: html }} />
  );

  it('matches snapshot', () => {
     const tree = renderer.create(
       <Content html={html} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with a custom renderer if set', () => {
    const tree = renderer.create(
      <Content html={html} component={<CustomRenderer />} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
