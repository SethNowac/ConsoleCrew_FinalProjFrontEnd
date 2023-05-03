import React from "react";
import NavButton from "./NavButton";

/**
 * Header component that displays navigation links.
 * @component
 * @return {JSX.Element} JSX representation of the component.
 */
function Header() {
  return (
    <div>
      <div>
      <div className="navigation">
        <NavButton to="/" label="Home" />
        <NavButton to="/about" label="About Us" />
        <NavButton to="/contact" label="Contact" />
        <NavButton to="/learnMore" label="Learn More" />
        <NavButton to="/login" label="Login" />
        <NavButton to="/signIn" label="Sign In" />
        
      </div>
      </div>
    </div>
  );
}

export default Header;
