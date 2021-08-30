import React, { useState } from "react";
import "./App.scss";
import Header from "Components/Layout/Header";
import Cart from "Components/Layout/Cart";
import { AppContext } from "./AppContext";
import Products from "Components/Common/Products";
import SubHeader from "Components/Layout/SubHeader";
import Footer from "Components/Layout/Footer";

function App() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [currency, setCurrency] = useState(
    JSON.parse(localStorage.getItem("currency")) || "USD"
  );
  const [cartState, setCartState] = useState(false);

  const [products,setProducts] = useState([]);

  function updateCurrency(newCurrency) {
    setCurrency(newCurrency);
    localStorage.setItem("currency", JSON.stringify(newCurrency));

  }
  function updateCart(newCart) {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }
  function toggleCart(state) {
    setCartState(state);
  }

  function updateProducts(newProducts){
    console.log('updating products..', newProducts)
    setProducts(newProducts);
  }
  return (
    <>
      <AppContext.Provider
        value={{
          cart,
          currency,
          cartState,
          products,
          updateProducts,
          updateCart,
          updateCurrency,
          toggleCart,
        }}
      >
        <Cart />
        <Header />
        <SubHeader />
        <Products />
        <Footer/>
      </AppContext.Provider>
    </>
  );
}

export default App;
