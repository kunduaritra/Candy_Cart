import React, { useContext, useEffect, useState } from "react";
import Modal from "../../UI/Modal";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCntx = useContext(CartContext);
  const [serverData, setServerData] = useState([]);

  const fetchServerData = async () => {
    try {
      const response = await fetch(
        "https://crudcrud.com/api/365a888d96164f979ddaca99449ca702/candy"
      );
      const data = await response.json();
      setServerData(data);
    } catch (error) {
      console.error("Error fetching data from server:", error);
    }
  };

  useEffect(() => {
    fetchServerData();
  }, []);

  const totalPrice = serverData.reduce((total, item) => total + item.price, 0);

  return (
    <Modal onClose={props.onClose}>
      <h2>Cart Items</h2>
      <ul className="list-none mt-2 ml-7">
        {cartCntx.items.map((item) => (
          <li key={item.id}>
            {item.name}: ₹{item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total Price: ₹{totalPrice}</h3>
      <ul className="list-none mt-2 ml-7">
        {serverData.map((item) => (
          <li key={item._id}>
            {item.name}: {item.price}
          </li>
        ))}
      </ul>

      <button
        className="btn bg-blue-700 hover:bg-red-500 text-white font-bold py-1 px-3 rounded"
        onClick={props.onClose}
      >
        Close
      </button>
    </Modal>
  );
};

export default Cart;
