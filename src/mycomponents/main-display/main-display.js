import React, { useEffect, useState } from "react";
import "./main-display.scss";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Toppings_Popup from "../Toppings-pop/Toppings-popup";
import {
  addCartArray,
  deleteFromCartArray,
  updateCartArray,
} from "../../store/pizzaSlice";
function Main_Display() {
  const { dataArray, currentDataId, cartArray } = useSelector(
    (state) => state.pizza
  );
  const [ispopUpOpen, setIsPopupOpen] = useState(false);
  const [dataObj, setDataObj] = useState(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentDataId) {
      const mainDisplayObj = dataArray.find((item) => item.id == currentDataId);
      if (mainDisplayObj) {
        setDataObj(mainDisplayObj);
      }
    }
  }, [currentDataId]);

  const handleCartAction = (action) => {
    if (action == "Add") {
      setIsPopupOpen(true);
      if (!cartArray.length) {
        dispatch(addCartArray({ id: currentDataId, quantity: 1 }));
      } else {
        const isItemPresent = cartArray.find(
          (item) => item.id == currentDataId
        );
        if (isItemPresent) {
          dispatch(updateCartArray({ id: currentDataId, quantity: 1 }));
        } else {
          dispatch(addCartArray({ id: currentDataId, quantity: 1 }));
        }
      }
    } else {
      if (cartArray.length) {
        dispatch(deleteFromCartArray({ id: currentDataId, quantity: 1 }));
      }
    }
  };

  return (
    <div className="main-display">
      {dataObj ? (
        <>
          <div className="main-display-image-container">
            <img
              className="main-display-image"
              src={dataObj.img_url}
              alt="React Image"
            />
          </div>
          <div className="content-container">
            <p>{dataObj.description}</p>
            <p>Veg/Nonveg: {dataObj.isVeg ? "veg" : "non-veg"}</p>
            <p> name:{dataObj.name}</p>
            <p>price:{dataObj.price}</p>
            <p>rating :{dataObj.rating}</p>
          </div>
          <div className="button-container">
            <AiOutlinePlusCircle onClick={() => handleCartAction("Add")} />
            <AiOutlineMinusCircle onClick={() => handleCartAction("delete")} />
          </div>
          {ispopUpOpen && (
            <Toppings_Popup
              isOpen={ispopUpOpen}
              size={dataObj?.size}
              topping={dataObj?.toppings}
              togglePopup={setIsPopupOpen}
              id={dataObj.id}
            />
          )}
        </>
      ) : null}
    </div>
  );
}

export default Main_Display;
