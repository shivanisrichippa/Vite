// Navbar.jsx
import React, { useContext } from "react";
import "../index.css";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const { search, setSearch, getCartCount } = useContext(ShopContext);

  return (
    <header className="header_section">
      <div className="header_top">
        <div className="container-fluid">
          <div className="top_nav_container">
            <div className="contact_nav">
              <a href="#">
                <i className="fa fa-phone" aria-hidden="true"></i>
                <span>Call: +91 6300832430</span>
              </a>
              <a href="#">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <span>Email: swipeshare.ss@gmail.com</span>
              </a>
            </div>

            <form className="search_form">
              <input
                type="text"
                className="form-control"
                placeholder="Search here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="" type="submit">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </form>

            <div className="user_option_box d-flex">
              <a href="/account" className="account-link">
                <i className="fa fa-user" aria-hidden="true"></i>
                <span>My Account</span>
              </a>

              {/* Cart Link with Count */}
              <a href="/cart" className="cart-link">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                <span className="cart-count">{getCartCount()}</span>
              </a>

              <a href="/logout" className="logout-link">
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                <span>Logout</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="header_bottom">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="/">
              <span>SwipeShare</span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className=""></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    Home <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/product">
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/policy">
                    Policy
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/why">
                    Why Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/sign-up">
                    Sign in
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
