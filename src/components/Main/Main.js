import React, { useState, useEffect } from 'react';

import './Main.css';

import Menu from '../Menu/Menu';
import Cart from '../Cart/Cart';
import ActiveOrders from '../ActiveOrder/ActiveOrders';

import jsonData from '../../data.json';

const data = jsonData;

export default function Main() {
  // current inventory
  const [inventory, setInventory] = useState({});

  // current menu to display
  const [menu, setMenu] = useState([]);

  // current order in cart
  const [currentOrder, setCurrentOrder] = useState([]);

  // all orders placed
  const [openOrder, setOpenOrder] = useState([]);

  // to get data from json file and populate to the state
  useEffect(() => {
    async function getData() {
      const response = await data;
      let items = [];
      // In each item in the menu, check if the ingredient is feasible for the current inventory
      // If true, then set disabled to false, else true
      for (const item of response.menu) {
        let disabled = false;
        for (const ingredients in item.ingredients) {
          if (item.ingredients[ingredients] > response.inventory[ingredients]) {
            disabled = true;
            break;
          }
        }
        item.disabled = disabled;
        items.push(item);
      }
      // to set the inventory state
      setInventory(response.inventory);
      // to set the menu state
      setMenu(items);
    }
    getData();
  }, []);

  // when item is added to the cart we update the state of the menu
  useEffect(() => {
    let items = [];
    // In each item in the menu, check if the ingredient is feasible for the current inventory
    // If true, then set disabled to false, else true
    for (const item of menu) {
      let disabled = false;
      for (const ingredients in item.ingredients) {
        if (item.ingredients[ingredients] > inventory[ingredients]) {
          disabled = true;
          break;
        }
      }
      item.disabled = disabled;
      items.push(item);
    }
    // to set the menu state
    setMenu(items);
  }, [currentOrder]);

  // when an item gets added into the cart
  const onAdd = (item) => {
    // check if order exist
    const orderExist = currentOrder.some((order) => order.name === item.name);

    // if doesn't exist, add quantity to item and set it to one, then update the current order state
    // if it exist, find the index of the item and update the quantity, then update the current order state
    if (!orderExist) {
      item.quantity = 1;
      setCurrentOrder([...currentOrder, item]);
    } else {
      const index = currentOrder.findIndex((order) => order.name === item.name);
      const updatedOrder = [...currentOrder];
      updatedOrder[index].quantity += 1;
      setCurrentOrder(updatedOrder);
    }

    // to update inventory
    const updatedInventory = { ...inventory };
    for (const ingredient in item.ingredients) {
      updatedInventory[ingredient] -= item.ingredients[ingredient];
    }
    // to set the updated inventory state
    setInventory(updatedInventory);
  };

  // to place an order
  const onSubmit = (total) => {
    // a new order object with order (array of items) and total amount
    const newOrder = {
      order: currentOrder,
      total,
    };

    // to set the openOrder state
    setOpenOrder([...openOrder, newOrder]);
    // to set the current order state to empty after submit
    setCurrentOrder([]);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>
          <span className="deliverr">Deliverr</span> Café
        </h1>
      </div>
      <div className="body">
        <Menu content={menu} handleAdd={onAdd} />

        <Cart items={currentOrder} handleSubmit={onSubmit} />

        <ActiveOrders orders={openOrder} />
      </div>
    </div>
  );
}
