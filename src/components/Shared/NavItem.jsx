import React from "react";
import { NavLink } from "react-router";

const NavItem = ({ item, link }) => {
  return (
    <div>
      <NavLink to={link} end>
        {item}
      </NavLink>
    </div>
  );
};

export default NavItem;
