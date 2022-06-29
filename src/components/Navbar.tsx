import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav nav-pills p-2 shadow">
      <NavLink to="/Blogs" className={({ isActive }) => `nav-link ${isActive && "active"}`}>
        Home
      </NavLink>
      <NavLink to="/Blogs/New" className={({ isActive }) => `nav-link ${isActive && "active"}`}>
        New Blog Mayhaps??
      </NavLink>
    </nav>
  );
};

export default Navbar;
