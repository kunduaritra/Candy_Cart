import React, { useContext } from "react";
import CartContext from "../store/cart-context";

const CandyList = (props) => {
  const cartCntx = useContext(CartContext);

  const buyCandyHandler = async (candy, quantity) => {
    const updatedCandy = { ...candy, quantity };
    cartCntx.addItem(updatedCandy);
  };

  return (
    <>
      <ul className="list-none mt-2 ml-7">
        {props.candyList.map((candy) => (
          <li key={candy.id} className="text-2xl text-blue-800">
            {candy.name} - Description: {candy.description} : Price:{" ₹"}
            {candy.price}
            <button
              className="btn bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 m-1 ml-4 rounded"
              onClick={() => buyCandyHandler(candy, 1)}
            >
              Buy 1
            </button>
            <button
              className="btn bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 m-1 rounded"
              onClick={() => buyCandyHandler(candy, 2)}
            >
              Buy 2
            </button>
            <button
              className="btn bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 m-1 rounded"
              onClick={() => buyCandyHandler(candy, 3)}
            >
              Buy 3
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CandyList;
