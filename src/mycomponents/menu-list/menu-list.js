import React, { useEffect, useState } from "react";
import "./menu-list.scss";
import Menu_Card from "../menu-card/menu-card";
import { useSelector } from "react-redux";
function Menu_List() {
  const { dataArray, filterType } = useSelector((state) => state.pizza);
  const [menuCardArray, setMenuCardArray] = useState([]);
  useEffect(() => {
    setMenuCardArray(dataArray);
  }, [dataArray]);

  const filterDataArray = (filter) => {
    const tempArray = [...dataArray];
    switch (filter) {
      case "non-veg":
        const nonVegArray = tempArray.filter((item) => !item.isVeg);
        setMenuCardArray(nonVegArray);
        break;
      case "veg":
        const vegArray = tempArray.filter((item) => item.isVeg);
        setMenuCardArray(vegArray);
        break;
      case "price-high":
        const highPriceArray = tempArray.sort((p1, p2) => p2.price - p1.price);
        setMenuCardArray(highPriceArray);
        break;
      case "price-low":
        const lowPriceArray = tempArray.sort((a, b) => a.price - b.price);
        setMenuCardArray(lowPriceArray);
        break;
      case "rating-high":
        const highRatingArray = tempArray.sort((a, b) => b.rating - a.rating);
        setMenuCardArray(highRatingArray);
        break;
      case "rating-low":
        const lowRatingArray = tempArray.sort((a, b) => a.rating - b.rating);
        setMenuCardArray(lowRatingArray);
        break;
      default:
        setMenuCardArray(dataArray);
        break;
    }
  };

  useEffect(() => {
    filterDataArray(filterType);
  }, [filterType]);

  return (
    <div className="menu-list">
      {menuCardArray.length ? (
        menuCardArray.map((item) => {
          return (
            <Menu_Card
              image_url={item.img_url}
              title={item.name}
              price={item.price}
              id={item.id}
            />
          );
        })
      ) : (
        <div>data not present</div>
      )}
    </div>
  );
}

export default Menu_List;
