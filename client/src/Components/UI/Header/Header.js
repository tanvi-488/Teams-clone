import logo from "./logo.jpg";
import "./Header.scss";
import React, { useState } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";

const Header = () => {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <img src={logo} />
          </Link>
          <button className="btn btn-header">
            <Link to="/" className="menu-bars" onClick={handleLogout}>
              Logout
            </Link>
          </button>
        </div>
        <nav className="nav-menu active">
          <ul className="nav-menu-items">
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>{item.icon}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};
export default Header;
