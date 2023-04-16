import React, { useEffect, useState } from "react";
import "./filters.scss";
import { setFilterType } from "../../store/pizzaSlice";
import { useDispatch } from "react-redux";
function Filters() {
  const [checked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const handleToggle = (e) => {
    setIsChecked(!checked);
  };
  useEffect(() => {
    const optionToSend = checked ? "non-veg" : "veg";

    dispatch(setFilterType(optionToSend));
  }, [checked]);

  const handleSelect = (e) => {
    if (e.target.value != "none") {
      dispatch(setFilterType(e.target.value));
    }
  };
  return (
    <div className="filters">
      <div className="toggle">
        <label class="switch">
          <input onChange={handleToggle} on type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div>
      <div className="dropDown">
        <label for="sort">sort by:</label>
        <select name="sort" onChange={handleSelect} id="sort-input">
          <option value="none">sort by price/rating</option>
          <option value="price-high">Price: high to low</option>
          <option value="price-low">Price: low to high</option>
          <option value="rating-high">Rating :high to low</option>
          <option value="rating-low">Rating: low to high</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
