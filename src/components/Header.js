import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NavButton from "./NavButton";
import "../style.css";
import { LoggedInContext } from "./App";
import LogoutButton from "./LogoutButton";

/**
 * Header component that displays navigation links.
 * @component
 * @return {JSX.Element} JSX representation of the component.
 */
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);

  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <div className="navigation">
          <NavButton to="/" label="Home" />
          <NavButton to="/about" label="About Us" />
          <NavButton to="/contact" label="Contact" />
          {isLoggedIn && (
            <>
              <NavButton to="/existing-projects" label="Existing Projects" />
              <NavButton to="/manage-projects" label="Manage Projects" />
              <NavButton to="/profile" label="Profile" />
              <LogoutButton/>
            </>
          )}
          {!isLoggedIn && (
            <>
              <NavButton to="/login" label="Log in" />
              <NavButton to="/create-account" label="Sign Up" />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;