import { Fragment, useState, useEffect } from "react";
import CandyList from "./CandyList";

const Candy = (props) => {
  const [myCandy, setMyCandy] = useState([]);
  const [newCandy, setNewCandy] = useState({
    name: "",
    description: "",
    price: "",
  });

  // Load candy data from local storage when the component mounts
  useEffect(() => {
    const storedCandy = localStorage.getItem("candyList");
    if (storedCandy) {
      setMyCandy(JSON.parse(storedCandy));
    }
  }, []);

  const addCandyhandler = (event) => {
    event.preventDefault();
    if (newCandy.name && newCandy.description && newCandy.price) {
      const candyId = Date.now().toString();
      const updatedCandy = { ...newCandy, id: candyId };
      setMyCandy((prevCandy) => [...prevCandy, updatedCandy]);
      setNewCandy({
        name: "",
        description: "",
        price: "",
      });

      localStorage.setItem(
        "candyList",
        JSON.stringify([...myCandy, updatedCandy])
      );
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
      <form
        onSubmit={addCandyhandler}
        className="p-8 bg-blue-400 border border-black flex items-center justify-center"
      >
        <input
          placeholder="Candy Name"
          className="text-1xl shadow border p-1 rounded"
          type="text"
          name="name"
          value={newCandy.name}
          onChange={inputChangeHandler}
        />
        <input
          placeholder="Description"
          className="text-1xl shadow border p-1 rounded ml-4"
          type="text"
          name="description"
          value={newCandy.description}
          onChange={inputChangeHandler}
        />
        <input
          placeholder="Price"
          className="text-1xl shadow border p-1 rounded ml-4"
          type="number"
          name="price"
          value={newCandy.price}
          onChange={inputChangeHandler}
        />
        <button className="btn bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded ml-4">
          Add Candy
        </button>
      </form>
      <>
        <h2 className="text-3xl font-bold mt-4 ml-4">Candy List</h2>
        <CandyList candyList={myCandy} />
      </>
    </Fragment>
  );
};

export default Candy;
