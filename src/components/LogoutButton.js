import { useContext } from "react";
import { LoggedInContext } from "./App";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "../style.css";

function LogoutButton() {
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
    const navigate = useNavigate();

    const performLogout = async () => {
        try{
            const requestOptions = {
                method: "GET",
                credentials: "include",
            };
            const response = await fetch("http://localhost:1339/session/logout", { method : "GET" });
            if(response.status === 401) {
                alert("Already logged out on server. Will log out on front-end as well.");
                setIsLoggedIn(false);
                return;
            } else if (response.status === 200) {
                setIsLoggedIn(false);
                navigate("/");
            } else {
                setIsLoggedIn(false);
                navigate("/", { state: { errorMessage: "Unexpected issue on server logging out; will log out on front-end anyways." } });
            }
        } catch (error) {
            alert("An error occured. Logging out on front-end anyways.");
            setIsLoggedIn(false);
        }
    };

    return (
        <Button variant="outlined" className="buttonStyle" size="md" onClick={performLogout}>Log out</Button>
    )
}

export default LogoutButton;