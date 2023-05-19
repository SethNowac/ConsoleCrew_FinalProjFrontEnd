import Main from '../components/Main';
import { useSearchParams, useLocation } from 'react-router-dom';
import '../style.css';
import Alert from 'react-bootstrap/Alert';
import NavButton from "../components/NavButton";
import { SystemError } from './SystemError';
import { LoggedInContext } from '../components/App';
import { useContext } from 'react';

/**
 * Home page component that displays the main content of the application.
 * @returns {JSX.Element} Home page UI.
 */
function Home() {
  const [searchParams, setSearchParam] = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const { state } = useLocation();

  return (
    <>
      {state && state.errorMessage && (
        <Alert variant="danger">{state.errorMessage}</Alert>
      )}
       <header style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '20px' }}>
        <h1>Game Organizer</h1>
        <div>
        {isLoggedIn && (
            <>
          <NavButton to="/existing-projects" label="Existing Projects" style={{ marginRight: '10px', color: 'white' }}>Existing Projects</NavButton>
          <NavButton to="/create-project" label="Create Project" />
          </>)}
        </div>
      </header>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px', width: '40%' }}>
          <h2>Possible Projects</h2>
          <ul>
            <li>Organize game nights with friends</li>
            <li>Find new people to play games with</li>
            <li>Keep track of your game collection</li>
            <li>Discover new games to play</li>
          </ul>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', width: '50%' }}>
          <h2>Why Choose Game Organizer?</h2>
          <ul>
            <li>Easy and intuitive interface</li>
            <li>Keep track of your game collection</li>
            <li>Find new games to play and people to play with</li>
            <li>Access from anywhere with internet connection</li>
            <li>Free to use!</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;