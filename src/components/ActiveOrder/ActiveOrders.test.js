import renderer from 'react-test-renderer';

import ActiveOrders from './ActiveOrders';

test('component: Active Orders tests', () => {
  const testProps = [
    {
      order: [
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
      ],
      total: 8.99,
    },
  ];
  const tree = renderer.create(<ActiveOrders orders={testProps} />).toJSON();

  expect(tree).toMatchSnapshot();
});
