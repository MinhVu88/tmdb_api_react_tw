import React from "react";
import { Link } from "@reach/router";
import { StyledNavigation } from "../styles/StyledNavigation";

const Navigation = ({ movieTitle }) => {
  return (
    <StyledNavigation>
      <div className="navigation-content">
        <Link to="/">
          <p>Home</p>
        </Link>
        <p>|</p>
        <p>{movieTitle}</p>
      </div>
    </StyledNavigation>
  );
};

export default Navigation;
