import { Link, useLocation } from 'react-router-dom';

/**
 * A component that displays a system error message and a link to go back to the Home page.
 * @param {string} errorMessage - The error message to display.
 * @returns {JSX.Element} - The JSX code for the SystemError component.
 */
function SystemError({ errorMessage }) {
    const { state } = useLocation();
    return(
        <div>
            <h1>System error</h1>
            {errorMessage && <p>{errorMessage}</p>}
            {state && state.errorMessage && <p>{state.errorMessage}</p>}
            <Link to="/">Home</Link>
        </div>
    );
}

export {SystemError};