import React, { useState, useEffect } from "react";
import "./Products.scss";
import { GET_PRODUCTS } from "Apollo/queries";
import { useQuery } from "@apollo/client";
import Modal from "Components/Common/Modal";
import { useAppContext } from "AppContext";

const getDefaultPersonalization = (cartItem) => {
  const defaultState = cartItem?.product_options?.map((item) => {
    return {
      name: item.title,
      value: item.options?.length && item.options[0].value,
    };
  });
  return defaultState;
};

function Products() {
  const { currency, cart, updateCart, toggleCart, updateProducts } =
    useAppContext();
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { currency },
  });
  const [showModal, toggleModal] = useState(false);
  const [cartItem, setCartItem] = useState(null);
  const [personalizations, setPersonalizations] = useState([]);

  const handleChange = (event) => {
    const updatedPersonalization = personalizations?.map((p) =>
      p.name === event.target?.name ? { ...p, value: event.target?.value } : p
    );
    setPersonalizations(updatedPersonalization);
  };

  const pushToCart = () => {
    const duplicate = cart.find((c) => c.id === cartItem.id);
    if (duplicate) {
      const newCart = cart.map((c) =>
        c.id === cartItem.id ? { ...c, quantity: c.quantity + 1 } : c
      );

      updateCart(newCart);
    } else {
      const newCart = [
        ...cart,
        { ...cartItem, options: personalizations, quantity: 1 },
      ];
      updateCart(newCart);
    }
    toggleModal(false);
    toggleCart(true);
  };

  useEffect(() => {
    setPersonalizations(getDefaultPersonalization(cartItem));
    if(data && data.products)updateProducts(data.products);
  }, [cartItem, data]);

  const addToCart = (productId) => {
    const product = data?.products.find((item) => item?.id === productId);
    if (product) {
      setCartItem(product);
      toggleModal(true);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <section className="products-section">
        {data?.products &&
          data.products?.map((product, index) => (
            <div className="product" key={index}>
              <div className="text-center">
                <img src={product?.image_url} alt={product.title} />
              </div>

              <h4 className="title">{product?.title}</h4>
              <h2 className="price">
                {currency} {product?.price}.00
              </h2>
              <button onClick={() => addToCart(product?.id)} className="btn">
                Add to Cart
              </button>
            </div>
          ))}
      </section>
      <Modal show={showModal} closeModal={() => toggleModal(false)}>
        <div className="cart-item-wrapper">
          <div>
            <div className="text-center mb-5 pb-5">
              <img
                className="item-image"
                src={cartItem?.image_url}
                alt={cartItem?.title}
              />
            </div>
            <h4>First, Let's personalize.</h4>
            <p>
              Products that you receive may vary according to your age bracket &
              skin type to optimize results.
            </p>
            <h6>Personalization Details</h6>
            {cartItem?.product_options &&
              cartItem?.product_options.map((item, index) => (
                <div className="mb-3" key={index}>
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    {item?.title}
                  </label>
                  <select
                    name={item?.title}
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleChange}
                    value={
                      personalizations?.find((i) => i.name === item.title)
                        ?.value
                    }
                  >
                    {item?.options &&
                      item?.options.map((option, index) => (
                        <option value={option?.value} key={index}>
                          {option?.value}
                        </option>
                      ))}
                  </select>
                </div>
              ))}
          </div>
          <button onClick={pushToCart} className="btn">
            Add to cart
          </button>
        </div>
      </Modal>
    </>
  );
}
export default Products;
