import React from "react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { apiService } from "../utilities/apiService";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loq = useLocation();

  useEffect(() => {
    apiService("/auth/verify")
      .then((data) => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setIsLoggedIn(false);
      });
  }, [loq.pathname]);

  return (
    <nav className="nav nav-pills p-2 shadow">
      <NavLink to="/Blogs" className={({ isActive }) => `nav-link ${isActive && "active"}`}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/Blogs/New" className={({ isActive }) => `nav-link ${isActive && "active"}`}>
          New Blog Mayhaps??
        </NavLink>
      )}
      {!isLoggedIn && (
        <NavLink to="/Login" className={({ isActive }) => `nav-link ${isActive && "active"}`}>
          Login/Register
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
