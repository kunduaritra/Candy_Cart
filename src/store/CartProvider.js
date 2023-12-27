import React, { useState, useEffect } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Endpoint need to change from crudcrud.com for new values
  const URL = "https://crudcrud.com/api/8bf699cc55d7428d925ed90f68088165";

  const addItemToCartHandler = async (item) => {
    // setItems((prevItems) => {
    //   const existingItem = prevItems.find(
    //     (prevItem) => prevItem.id === item.id
    //   );
    //   if (existingItem) {
    //     return prevItems.map((prevItem) =>
    //       prevItem.id === item.id
    //         ? { ...prevItem, quantity: prevItem.quantity + item.quantity }
    //         : prevItem
    //     );
    //   } else {
    //     return [...prevItems, item];
    //   }
    // });
    const res = await fetch(`${URL}/candy`);
    const data = await res.json();

    const foundCandy = data.find((val) => val.name === item.name);

    if (foundCandy) {
      const updatedQuantity = foundCandy.quantity + item.quantity;
      try {
        const res = await fetch(`${URL}/candy/${foundCandy._id}`, {
          method: "PUT",
          body: JSON.stringify({
            name: item.name,
            price: item.price,
            quantity: updatedQuantity,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to update in server!");
        } else {
          alert("Updated to the server!");
        }
        setItems(data);
      } catch (err) {
        alert(err.message);
      }
    } else {
      try {
        const res = await fetch(`${URL}/candy`, {
          method: "POST",
          body: JSON.stringify({
            name: item.name,
            price: item.price,
            quantity: 1,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to save in server!");
        } else {
          alert("Added to the server!");
        }
        setItems(data);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const removeItemToCartHandler = (id) => {};
  const updateItemToCartHandler = (id, newQuantity) => {};

  const cartContext = {
    items: items,
    quantity: totalQuantity,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    updateItem: updateItemToCartHandler,
  };

  useEffect(() => {
    const fetchTotalQuantity = async () => {
      try {
        const response = await fetch(`${URL}/candy`);
        const data = await response.json();

        const serverTotalQuantity = data.reduce(
          (total, item) => total + Number(item.quantity),
          0
        );

        setTotalQuantity(serverTotalQuantity);
      } catch (error) {
        console.error("Error fetching data from server:", error);
      }
    };

    fetchTotalQuantity();
  }, [addItemToCartHandler]);

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
