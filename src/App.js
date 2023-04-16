
import "./App.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPizza } from "./store/pizzaSlice";
import { Routes, Route } from "react-router-dom"
import HomePage from "./mycomponents/HomePage/HomePage";
import CartScreen from "./mycomponents/CartScreen/CartScreen";



function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPizza())
},[])
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/cart" element={<CartScreen/>} />
      <Route/>
</Routes>
  );
}

export default App;
