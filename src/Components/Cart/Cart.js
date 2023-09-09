import React, { useContext } from "react";
import Modal from "../../UI/Modal";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCntx = useContext(CartContext);
  console.log("cartCntx", cartCntx);
  const totalPrice = cartCntx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
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
      <button
        class="btn bg-blue-700 hover:bg-red-500 text-white font-bold py-1 px-3 rounded"
        onClick={props.onClose}
      >
        Close
      </button>
    </Modal>
  );
};

export default Cart;
