import React from "react";
import "./SubHeader.scss"

export function SubHeader() {
  return (
    <section className="sub-header">
      <div className="row">
        <div className="col-md-8">
          <h1>All Products</h1>
          <p>A 360° look at Lumin</p>
        </div>
        <div className="col-md-4">
          <div className="h-100 d-flex align-items-center">
            <select className="form-select">
              <option disabled>Filter By</option>
              <option value="1">All Products</option>
              <option value="2">New Products</option>
              <option value="3">Sets</option>
              <option value="3">Skin Care</option>
              <option value="3">Hair & Body Care</option>
              <option value="3">Accessories</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
export default SubHeader;
