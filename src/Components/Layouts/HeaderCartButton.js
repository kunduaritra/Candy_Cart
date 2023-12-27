import { useEffect, useState, useContext } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCntx = useContext(CartContext);

  return (
    <button
      onClick={props.onClick}
      className="rounded-full ml-auto bg-blue-500 text-white px-2 py-1"
    >
      <span className="text-white">Your Cart</span>
      <span className="text-white"> {cartCntx.quantity}</span>
    </button>
  );
};

export default HeaderCartButton;
