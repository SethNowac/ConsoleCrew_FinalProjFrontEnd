import { useContext } from "react";
import { LoggedInContext } from "./App";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "../style.css";

/**
 * LogoutButton component renders a logout button that allows the user to log out of the application.
 */
function LogoutButton() {
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
    const navigate = useNavigate();

    /**
     * performLogout function sends a logout request to the server and handles the response.
     * It updates the login status and clears the user ID from local storage upon successful logout.
     */
    const performLogout = async () => {
        try{
            const requestOptions = {
                method: "GET",
                credentials: "include",
            };
            const response = await fetch("http://localhost:1339/session/logout", requestOptions);
            if(response.status === 401) {
                alert("Already logged out on server. Will log out on front-end as well.");
                setIsLoggedIn(false);
                localStorage.removeItem("userId");
                return;
            } else if (response.status === 200) {
                setIsLoggedIn(false);
                localStorage.removeItem("userId");
                navigate("/");
            } else {
                setIsLoggedIn(false);
                localStorage.removeItem("userId");
                navigate("/", { state: { errorMessage: "Unexpected issue on server logging out; will log out on front-end anyways." } });
            }
        } catch (error) {
            alert("An error occured. Logging out on front-end anyways.");
            localStorage.removeItem("userId");
            setIsLoggedIn(false);
        }
    };

    return (
        <Button variant="outlined" className="buttonStyle" size="md" onClick={performLogout}>Log out</Button>
    )
}

export default LogoutButton;