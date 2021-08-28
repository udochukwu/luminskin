import React from "react";
import "./MenuBtn.scss";
import cx from "classnames";

function MenuBtn({ className, onClick }) {
  return (
    <button
      className={cx(
        className,
        "menu-btn",
      )}
      onClick={onClick}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}

export default MenuBtn;
