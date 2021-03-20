import renderer from 'react-test-renderer';

import App from './App';

test('component: App tests', () => {
  const tree = renderer.create(<App />).toJSON();

  expect(tree).toMatchSnapshot();
});
