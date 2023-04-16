import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./Toppings-popup.scss";
import { useDispatch } from "react-redux";
import { addToppingsToCartArray } from "../../store/pizzaSlice";
function Toppings_Popup({ id, isOpen, size, topping, togglePopup }) {
  const [popupstate, setPopupState] = useState(isOpen);
  const [sizeArray, setSizeArray] = useState([]);
  const [toppingTitle, setToppingsTitle] = useState("");
  const [toppingsArray, setToppingsArray] = useState([]);
  useEffect(() => {
    setPopupState(isOpen);
  }, [isOpen]);
  const dispatch = useDispatch();
  const generateToppingTitle = () => {
    topping.forEach(({ isRadio }) => {
      isRadio
        ? setToppingsTitle("choose one of the toppings")
        : setToppingsTitle("choose toppings of your choices");
    });
  };
  useEffect(() => {
    generateToppingTitle();
  }, [topping]);
  const handlePopupClose = () => {
    if (toppingsArray.length || sizeArray.length) {
      dispatch(
        addToppingsToCartArray({ id, toppings: toppingsArray, size: sizeArray })
      );
    }
    setPopupState(false);
    togglePopup(false);
    setSizeArray([]);
    setToppingsArray([]);
  };
  const handleCheckbox = (e, inputCategory) => {
    let prevArray =
      inputCategory == "size" ? [...sizeArray] : [...toppingsArray];
    if (e.target.checked) {
      prevArray.push(e.target.value);
    } else {
      prevArray = prevArray.filter((item) => item !== e.target.value);
    }
    if (inputCategory == "size") {
      setSizeArray(prevArray);
    } else {
      setToppingsArray(prevArray);
    }
  };
  const handleRadio = (e, inputCategory) => {
    let prevArray = [e.target.value];
    if (inputCategory == "size") {
      setSizeArray(prevArray);
    } else {
      setToppingsArray(prevArray);
    }
  };
  const generateInput = (inputCategory) => {
    const arrayToMap = inputCategory == "size" ? size : topping;
    return arrayToMap.map((item) => {
      const inputType = item.isRadio ? "radio" : "checkbox";
      const inputHandler = item.isRadio ? handleRadio : handleCheckbox;

      return item.items.map((item) => {
        const inputTitle = item.size || item.name;

        return (
          <label class="input-container">
            {inputTitle}
            <input
              type={inputType}
              value={inputTitle}
              name={inputCategory}
              onChange={(e) => inputHandler(e, inputCategory)}
            />
          </label>
        );
      });
    });
  };

  return (
    popupstate && (
      <div className="popup-container">
        <div className="popup-content-container">
          <div className="close-icon-container">
            <AiOutlineCloseCircle size={35} onClick={handlePopupClose} />
          </div>
          <div className="options-container">
            <div className="size-option-container">
              choose size
              {size.length ? <div>{generateInput("size")}</div> : null}
            </div>
            <div className="topping-option-container">
              {toppingTitle}
              {topping.length ? <div>{generateInput("topping")}</div> : null}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Toppings_Popup;
