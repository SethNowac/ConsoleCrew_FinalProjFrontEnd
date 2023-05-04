import { NavLink, useResolvedPath, useMatch } from "react-router-dom";
import Button from "@mui/material/Button";
import "../style.css";

/**
 * A button for navigation, wrapped in a NavLink component from react-router-dom.
 * @param {object} props - The props object containing the label and destination of the button.
 * @param {string} props.label - The label displayed on the button.
 * @param {string} props.to - The destination of the button.
 * @returns {JSX.Element} - The JSX element for the NavButton.
 */
function NavButton(props) {
    let resolved = useResolvedPath(props.to);
    let match = useMatch({ path: resolved.pathname, end: true });

    const primaryButtonStyle = {
        backgroundColor: "rgb(101, 148, 184)",
        border: "none",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
        cursor: "pointer",
        transition: "background-color 0.3s ease-in-out",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
        fontSize: "16px",
        fontWeight: "bold",
    };

    const activePrimaryButtonStyle = {
        backgroundColor: "rgb(101, 148, 184)",
        border: "none",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
        cursor: "pointer",
        transition: "background-color 0.3s ease-in-out",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
        fontSize: "16px",
        fontWeight: "bold",
    };



    return (
        <NavLink to={props.to}>
            <Button
                variant={match ? "contained" : "outlined"}
                className="buttonStyle"
                style={match ? activePrimaryButtonStyle : primaryButtonStyle}
            >
                {props.label}
            </Button>
        </NavLink>


    );
}

export default NavButton;