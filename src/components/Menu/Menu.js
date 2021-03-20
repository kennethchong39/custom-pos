import React from 'react';

import './Menu.css';

export default function Menu(props) {
  // to add an item to the cart
  const addToCart = (item) => {
    props.handleAdd(item);
  };

  return (
    <div className="menu">
      <div className="menu-title">
        <h2>Menu</h2>
      </div>
      <hr />
      <div className="menu-items">
        {props.content.map((item, index) => {
          return (
            <div className="item" key={index}>
              <h3>{item.name}</h3>
              <p>$ {item.price}</p>
              <button
                disabled={item.disabled}
                className={item.disabled ? 'disabled' : ''}
                onClick={() => addToCart({ ...item })}
              >
                {item.disabled ? 'OUT OF STOCK' : 'ADD TO CART'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
