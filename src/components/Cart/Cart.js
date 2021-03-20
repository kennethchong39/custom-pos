import React, { useState, useEffect } from 'react';

import './Cart.css';

export default function Cart(props) {
  // to keep track of the total amount
  const [total, setTotal] = useState(0);

  // to update the price when an order is added to the cart
  useEffect(() => {
    let sum = 0;
    for (const items of props.items) {
      sum += items.price * items.quantity;
    }
    setTotal(sum.toFixed(2));
  }, [props.items]);

  // submit the order once the submit button is clicked
  const handleSubmit = () => {
    props.handleSubmit(total);
    setTotal(0);
  };

  const totalItems = props.items.length;

  return (
    <div className="current-order">
      <div className="current-order-header">
        <h2>Cart</h2>
        <hr />
      </div>
      <div className="current-orders">
        {totalItems === 0 && (
          <div className="current-item-empty">
            <p>Empty Cart</p>
          </div>
        )}
        {props.items.map((item, index) => {
          return (
            <div className="current-item" key={index}>
              <p>{item.name}</p>
              <p>x {item.quantity}</p>
              <p>$ {item.price}</p>
            </div>
          );
        })}
      </div>
      <div className="current-order-footer">
        <div className="current-order-total">
          <p>Total</p>
          <p>$ {total}</p>
        </div>
        <button
          disabled={totalItems === 0 ? true : false}
          className={totalItems === 0 ? 'disabled' : ''}
          onClick={handleSubmit}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
}
