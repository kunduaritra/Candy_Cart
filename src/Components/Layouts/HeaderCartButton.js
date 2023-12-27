// import CartContext from "../../store/cart-context";
import { useEffect, useState } from "react";

const HeaderCartButton = (props) => {
  // const cartCntx = useContext(CartContext);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const fetchTotalQuantity = async () => {
      try {
        const response = await fetch(
          "https://crudcrud.com/api/365a888d96164f979ddaca99449ca702/candy"
        );
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
  }, []);

  return (
    <button
      onClick={props.onClick}
      className="rounded-full ml-auto bg-blue-500 text-white px-2 py-1"
    >
      <span className="text-white">Your Cart</span>
      <span className="text-white"> {totalQuantity}</span>
    </button>
  );
};

export default HeaderCartButton;
