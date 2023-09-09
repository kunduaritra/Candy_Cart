import { Fragment } from "react";
// import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className="bg-[#3333ff] p-4 flex text-4xl">
        <h1 className="text-4xl text-white">Candy Cart</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
    </Fragment>
  );
};

export default Header;
