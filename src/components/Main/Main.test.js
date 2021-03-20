import renderer from 'react-test-renderer';

import Main from './Main';

test('component: Main tests', () => {
  const tree = renderer.create(<Main />).toJSON();

  expect(tree).toMatchSnapshot();
});
