import NavButton from "./NavButton";
import "../style.css"

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
        <NavButton to="/login" label="Login"/>
        <NavButton to="/create-account" label="Sign Up"/>
      </div>
      </div>
    </div>
  );
}

export default Header;
