import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CartScreen.scss";
import CartCard from "./CartCard";
import { useNavigate } from "react-router-dom";
import "./../header/header.scss";
function CartScreen() {
  const { cartArray } = useSelector((state) => state.pizza);
  const [localArray, setLocalArray] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLocalArray(cartArray);
    if (!cartArray.length) {
      navigate("/");
    }
  }, [cartArray]);

  return (
    <>
      <div className="header">
        <div>
          <img class="pizza-logo" src="https://iili.io/HvNYVJ1.jpg" />
        </div>
      </div>
      <div className="CartScreenContainer">
        {localArray.length
          ? localArray.map((item) => {
              return (
                <CartCard
                  quantity={item?.quantity}
                  id={item?.id}
                  dataObj={item?.dataObj}
                  size={item?.size}
                  toppings={item?.toppings}
                />
              );
            })
          : null}
      </div>
    </>
  );
}

export default CartScreen;
