import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";

const Header = ({ isLoggedIn, user, onLogout }) => {
  return (
    <header className="header">
      <div style={{ paddingLeft: "60px" }}>
        <img
          style={{
            padding: "6px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: "white",
          }}
          src={logo}
          alt="Logo"
        />
      </div>
      {isLoggedIn ? (
        <div className="right-Header">
          <nav className="nav-links">
            <ul>
              <li>
                <Link to="/employeeList">Employee List</Link>
              </li>
            </ul>
          </nav>
          <div>
            <span>{user.username}</span>
            <button onClick={onLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <div className="loginBtn">
          <Link to="/login" style={{ paddingRight: "60px" }}>
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
