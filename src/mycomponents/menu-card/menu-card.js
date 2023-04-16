import React from "react";
import "./menu-card.scss";
import { useDispatch } from "react-redux";
import { setCurrentId } from "../../store/pizzaSlice";
function Menu_Card({ image_url, title, price, id }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentId(id));
  };
  return (
    <div onClick={handleClick} id={id} key={id} className="menu-card">
      <img className="menu-card-img" src={image_url} alt="React Image" />
      <p className="menu-card-title">{title}</p>
      <p>{price}</p>
    </div>
  );
}

export default Menu_Card;
