import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NavButton from "./NavButton";
import "../style.css";
import { LoggedInContext } from "./App";
import LogoutButton from "./LogoutButton";

/**
 * Header component displays the navigation links and buttons in the application header.
 * It conditionally renders different buttons based on the user's login status.
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
              <NavButton to="/create-project" label="Create Project" />
              <NavButton to="/profile" label="Profile" />
              <LogoutButton/>
            </>
          )}
          
        </div>
      </div>
      <div style={{ display: "flex" }}>
        {!isLoggedIn && (
          <>
            <NavButton to="/login" label="Log in" />
            <NavButton to="/create-account" label="Sign Up" />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;