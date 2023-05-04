import { Link, useLocation } from "react-router-dom";

/**
 * UserError component.
 * @returns {JSX.Element} - The UserError component.
 */
function UserError(){
    const { state } = useLocation();

    return(
        <div>
            <h1>Input Error</h1>
            <p>{state.errorMessage}</p>
            <Link to="/">Home</Link>
        </div>
    );
}

export {UserError};