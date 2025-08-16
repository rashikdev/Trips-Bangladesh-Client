import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <h2 className="font-bold text-xl text-primary">
        Trips<span className="text-2xl leading-0">.</span>
      </h2>
    </Link>
  );
};

export default Logo;
