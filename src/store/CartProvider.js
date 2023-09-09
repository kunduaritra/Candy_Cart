import React, { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);

  const addItemToCartHandler = (item) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (prevItem) => prevItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, quantity: prevItem.quantity + item.quantity }
            : prevItem
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  const removeItemToCartHandler = (id) => {};
  const updateItemToCartHandler = (id, newQuantity) => {};

  const cartContext = {
    items: items,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    updateItem: updateItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
