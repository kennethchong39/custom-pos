import React, { useState } from 'react';

import './Order.css';

export default function Order(props) {
  // to keep track of the order state if it is complete
  const [isComplete, setIsComplete] = useState(false);

  // to update the is complete state once the button is clicked
  const handleComplete = () => {
    setIsComplete(!isComplete);
  };

  return (
    <div className={isComplete ? 'order-item complete' : 'order-item'}>
      <div className="order-item-flex">
        <h3>Order Number</h3>
        <h3># {props.index + 1}</h3>
      </div>
      {props.item.order.map((item, index) => {
        return (
          <div className="order-item-flex-light" key={index}>
            <p>{item.name}</p>
            <p>x {item.quantity}</p>
            <p>$ {item.price}</p>
          </div>
        );
      })}
      <div className="order-item-flex">
        <p>Total</p>
        <p>$ {props.item.total}</p>
      </div>
      <button
        disabled={isComplete}
        className={
          isComplete ? 'order-item-button disabled' : 'order-item-button'
        }
        onClick={handleComplete}
      >
        {isComplete ? 'Order Picked-Up' : 'Complete ?'}
      </button>
    </div>
  );
}
