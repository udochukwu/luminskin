import React, { useState } from "react";
import logo from "Images/logo.png";
import cartIcon from "Images/cart-icon.png";
import MenuBtn from "Components/Common/MenuBtn";
import "./Header.scss";
import cx from "classnames";

function Header() {
  const [showMobileNav, toggleMobileNav] = useState(false);
  return (
    <header>
      <nav className="navbar navbar-light desktop-nav">
        <MenuBtn
          className="d-block d-lg-none"
          onClick={() => {
            toggleMobileNav(true);
          }}
        />
        <ul className="nav justify-content-end d-none d-lg-flex">
          <li className="nav-item">
            <a className="navbar-brand" href="/">
              <img className="logo" src={logo} alt="LUMIN" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">
              Shop
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Support
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Blog
            </a>
          </li>
        </ul>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">
              Account
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              <div className="cart-icon-wrapper">
                <img className="cart-icon" src={cartIcon} alt="LUMIN" />
                <span>1</span>
              </div>
            </a>
          </li>
          <li className="nav-item">
            <select className="form-select" aria-label="Default select example">
              <option selected>EN</option>
              <option value="1">AR</option>
              <option value="2">FR</option>
              <option value="3">ES</option>
            </select>
          </li>
        </ul>
      </nav>
      <nav className={cx("mobile-nav", { show: showMobileNav })}>
        <div className="mobile-nav-wrapper">
          <a className="active" href="/">
            Shop
          </a>
          <a href="/">About</a>
          <a href="/">Support</a>
          <button
            onClick={() => {
              toggleMobileNav(false);
            }}
          >
            <svg
              viewBox="0 0 256 512"
              focusable="false"
              role="presentation"
              class="css-1tu97pq"
            >
              <path
                fill="currentColor"
                d="M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z"
              ></path>
            </svg>
          </button>
        </div>
        <div class="categories-wrapper">
          <a className="active" href="/">
            Skin
          </a>
          <a href="/">Hair & Body</a>
          <a href="/">Sets</a>
          <a href="/">Accessories</a>
          <a href="/">Shop All</a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
