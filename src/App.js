import React from "react";
import "./App.scss";
// import { GET_PRODUCTS } from "Apollo/queries";
import Header from "Components/Layout/Header";
// import { useQuery } from "@apollo/client";

function App() {
  // const { loading, error, data } = useQuery(GET_PRODUCTS);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;
  return (
    <div className="">
      <Header />
    </div>
  );
}

export default App;
