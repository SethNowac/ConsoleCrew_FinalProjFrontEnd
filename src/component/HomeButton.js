import { useNavigate } from "react-router-dom";
import "../style.css";

/**
 * A button component that navigates to the home page when clicked.
 * @returns {JSX.Element} The HomeButton component.
 */
function HomeButton(){
    const navigate = useNavigate();

    const handleClick = () =>{

        navigate("/home");
    };

    return <button onClick={handleClick} className="buttonStyle">Home</button>;
}

export default HomeButton;