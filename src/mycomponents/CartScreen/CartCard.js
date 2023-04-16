import React from "react";
import "./CartCard.scss";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCartArray, updateCartArray } from "../../store/pizzaSlice";

function CartCard({ quantity, id, dataObj, size, toppings }) {
  const { cartArray } = useSelector((state) => state.pizza);
  const { name, isVeg, price, img_url } = dataObj;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCartAction = (action) => {
    if (action == "Add") {
      if (!cartArray?.length) {
        navigate("./");
      } else {
        dispatch(updateCartArray({ id: id, quantity: 1 }));
      }
    } else {
      if (cartArray?.length) {
        dispatch(deleteFromCartArray({ id: id, quantity: 1 }));
      }
    }
  };
  return (
    <div id={id} key={id} className="cartCardContainer">
      <div className="image-container">
        <img className="cart-card-img" src={img_url} alt="React Image" />
      </div>
      <div className="contentcontainer">
        <p className="menu-card-title">{name}</p>
        <p>{price}</p>
        <div className="quantity-container">
          <AiOutlinePlusCircle
            size={30}
            onClick={() => handleCartAction("Add")}
          />
          {quantity}
          <AiOutlineMinusCircle
            size={30}
            onClick={() => handleCartAction("delete")}
          />
        </div>
        <p>veg/non-veg:{isVeg ? "veg" : "non-veg"}</p>
        <div className="list-container">
          {toppings?.length
            ? toppings?.map((item) => {
                return <p>{item}</p>;
              })
            : null}
        </div>
        <div className="list-container">
          {size?.length ? (
            size?.map((item) => {
              return <p>{item}</p>;
            })
          ) : (
            <p>Regular</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartCard;
