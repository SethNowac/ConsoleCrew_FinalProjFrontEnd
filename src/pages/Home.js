import Main from '../component/Main';
import { useSearchParams, useLocation } from 'react-router-dom';
import '../style.css';
import Alert from 'react-bootstrap/Alert';
import { SystemError } from './SystemError';

/**
 * Home page component that displays the main content of the application.
 * @returns {JSX.Element} Home page UI.
 */
function Home() {
  const [searchParams, setSearchParam] = useSearchParams();
  const { state } = useLocation();

  return (
    <>
      {state && state.errorMessage && <Alert variant="danger">{state.errorMessage}</Alert>}
      <div style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '20px' }}>
        <h1>Game Organizer</h1>
      </div>
      <Main />

    </>
  );
}

export default Home;