import React from "react";

const CartContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  updateItem: (id, newQuantity) => {},
});

export default CartContext;
