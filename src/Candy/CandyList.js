import React, { useContext } from "react";
import CartContext from "../store/cart-context";

const CandyList = (props) => {
  const cartCntx = useContext(CartContext);
  const URL = "https://crudcrud.com/api/365a888d96164f979ddaca99449ca702";

  const buyCandyHandler = async (candy, quantity) => {
    const updatedCandy = { ...candy, quantity };
    cartCntx.addItem(updatedCandy);

    const res = await fetch(`${URL}/candy`);
    const data = await res.json();

    const foundCandy = data.find((item) => item.name === candy.name);

    if (foundCandy) {
      const updatedQuantity = foundCandy.quantity + quantity;
      try {
        const res = await fetch(`${URL}/candy/${foundCandy._id}`, {
          method: "PUT",
          body: JSON.stringify({
            name: candy.name,
            price: candy.price,
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
      } catch (err) {
        alert(err.message);
      }
    } else {
      try {
        const res = await fetch(`${URL}/candy`, {
          method: "POST",
          body: JSON.stringify({
            name: candy.name,
            price: candy.price,
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
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <>
      <ul className="list-none mt-2 ml-7">
        {props.candyList.map((candy) => (
          <li key={candy.id}>
            {candy.name} - Description: {candy.description} : Price:{" "}
            {candy.price}
            <button
              className="btn bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 m-1 rounded"
              onClick={() => buyCandyHandler(candy, 1)}
            >
              Buy 1
            </button>
            <button
              className="btn bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 border-primary border-2 rounded"
              onClick={() => buyCandyHandler(candy, 2)}
            >
              Buy 2
            </button>
            <button
              className="btn bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded border-solid"
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
