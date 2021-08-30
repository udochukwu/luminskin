import React from "react";
import "./Cart.scss";
import Modal from "Components/Common/Modal";
import { useAppContext } from "AppContext";
import { GET_CURRENCIES } from "Apollo/queries";
import { useQuery } from "@apollo/client";
import cx from "classnames";


export function Cart() {
  const {
    currency,
    cart,
    updateCart,
    cartState,
    updateCurrency,
    toggleCart,
    products,
  } = useAppContext();
  const { data } = useQuery(GET_CURRENCIES);
  const handleChange = (event) => {
    updateCurrency(event.target?.value);
  };

  function removeItem(id) {
    const newCart = cart.filter((c) => c.id !== id);
    updateCart(newCart);
  }

  function increaseQuantity(id) {
    const newCart = cart.map((c) =>
      c.id === id ? { ...c, quantity: c.quantity + 1 } : c
    );
    updateCart(newCart);
  }

  function decreaseQuantity(id) {
    const newCart = cart.map((c) =>
      c.id === id ? { ...c, quantity: c.quantity > 1 ? c.quantity - 1 : 1 } : c
    );
    updateCart(newCart);
  }

  function formatCart() {
    const newCart = cart.map((c) => {
      const product = products.find((p) => p.id === c.id);
      return product?.price ? { ...c, price: product.price } : c;
    });
    return newCart;
  }

  const finalCart = formatCart();

  function calculateTotal() {
    let total = 0;
    finalCart.forEach((item) => (total += item.quantity * item.price));
    return total;
  }
  return (
    <Modal show={cartState} closeModal={() => toggleCart(false)}>
      <div className="cart-wrapper">
        <div className="upper-div">
          <h6 className="modal-title">Your cart</h6>
          <div className="my-4">
            <select
              name="currency"
              className="form-select"
              onChange={handleChange}
              value={currency}
            >
              {data?.currency &&
                data?.currency.map((c, index) => (
                  <option value={c} key={index}>
                    {c}
                  </option>
                ))}
            </select>
          </div>
          {finalCart && finalCart.length === 0 && (
            <div>
              <p className="text-center">There are no items in your cart.</p>
            </div>
          )}
          {finalCart &&
            finalCart.map((item) => (
              <div key={item.id} className="card-item">
                <span className="close-btn" onClick={() => removeItem(item.id)}>
                  X
                </span>
                <div className="row">
                  <div className="col-8">
                    <div className="d-flex flex-column justify-content-between h-100">
                      <div>
                        <h4 className="title">{item.title}</h4>
                        <h5 className="personalizations">
                          {item?.options &&
                            item.options.map((o, index) => (
                              <span key={index}>{o.value} | </span>
                            ))}
                        </h5>
                      </div>
                      <div className="quantity-price">
                        <div className="quantity-wrapper">
                          <div className="quantity">
                            <span onClick={() => decreaseQuantity(item.id)}>
                              -
                            </span>
                            <span>{item.quantity}</span>
                            <span onClick={() => increaseQuantity(item.id)}>
                              +
                            </span>
                          </div>
                        </div>
                        <div className="price-wrapper d-flex align-items-center">
                          <h6 className="price">
                            {currency}
                            {item.price * item.quantity}.00
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <img src={item.image_url} alt={item.title} />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="lower-div">
          <div className="d-flex justify-content-between mb-5">
            <span className="total">Subtotal</span>
            <span className="total">
              {currency}
              {calculateTotal()}.00
            </span>
          </div>
          <button className={cx("btn outline", { disabled: !finalCart?.length })}>
            Make this a subscription (Save 20%)
          </button>
          <button className={cx("btn solid", { disabled: !finalCart?.length })}>proceed to checkout</button>
        </div>
      </div>
    </Modal>
  );
}

export default Cart;
