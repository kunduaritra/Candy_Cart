import { Fragment, useState } from "react";
import CandyList from "./CandyList";

const Candy = (props) => {
  const [myCandy, setMyCandy] = useState([]);
  const [newCandy, setNewCandy] = useState({
    name: "",
    description: "",
    price: "",
  });

  const addCandyhandler = (event) => {
    event.preventDefault();
    if (newCandy.name && newCandy.description && newCandy.price) {
      const candyId = Date.now().toString();
      setMyCandy((prevCandy) => [...prevCandy, { ...newCandy, id: candyId }]);
      setNewCandy({
        name: "",
        description: "",
        price: "",
      });
    }
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setNewCandy((prevCandy) => ({
      ...prevCandy,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  return (
    <Fragment>
      <form onSubmit={addCandyhandler}>
        <input
          placeholder="Candy Name"
          class="text-1xl shadow border p-1 rounded"
          type="text"
          name="name"
          value={newCandy.name}
          onChange={inputChangeHandler}
        />
        <input
          placeholder="Description"
          class="text-1xl shadow border p-1 rounded"
          type="text"
          name="description"
          value={newCandy.description}
          onChange={inputChangeHandler}
        />
        <input
          placeholder="Price"
          class="text-1xl shadow border p-1 rounded"
          type="number"
          name="price"
          value={newCandy.price}
          onChange={inputChangeHandler}
        />
        <button class="btn bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
          Add Candy
        </button>
      </form>
      <>
        <h2 className="text-2xl font-bold mt-4 ml-4">Candy List</h2>
        <CandyList candyList={myCandy} />
      </>
    </Fragment>
  );
};

export default Candy;
