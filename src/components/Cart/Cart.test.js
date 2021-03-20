import renderer from 'react-test-renderer';

import Cart from './Cart';

test('component: Cart tests', () => {
  const testProps = [
    {
      name: 'Vegetarian',
      price: 8.99,
      ingredients: {
        bread: 2,
        lettuce: 2,
        tomato: 2,
        cheese: 2,
      },
      quantity: 1,
    },
  ];
  const tree = renderer.create(<Cart items={testProps} />).toJSON();

  expect(tree).toMatchSnapshot();
});
