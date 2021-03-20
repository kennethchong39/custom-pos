import React from 'react';

import Order from '../Order/Order';

import './ActiveOrders.css';

export default function ActiveOrder(props) {
  return (
    <div className="active-order">
      <div className="active-order-header">
        <h2>All Orders</h2>
        <hr />
      </div>
      {props.orders.map((order, index) => {
        return <Order item={order} key={index} index={index} />;
      })}
    </div>
  );
}
