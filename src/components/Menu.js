import { Button } from 'react-bootstrap';
import { AddPlayer } from './AddPlayer';
import { SinglePlayer } from './SinglePlayer';
import { AllProjects } from './AllProjects';
import { UpdatePlayer } from './UpdatePlayer';
import { DeletePlayer } from './DeletePlayer';

/**
 * Menu component for the home page. Displays buttons to navigate to different functionality of the app.
 * @param {Object} props - The props object of the component.
 * @param {Function} props.setDisplay - A function to set the display of the right pane.
 * @returns {JSX.Element} - A JSX.Element that displays the menu buttons.
 */
function Menu({ setDisplay }) {
  const menuItem1 = <AddPlayer setDisplay={setDisplay} />;
  const menuItem2 = <SinglePlayer setDisplay={setDisplay} />;
  const menuItem3 = <AllProjects setDisplay={setDisplay} />;
  const menuItem4 = <UpdatePlayer setDisplay={setDisplay} />;
  const menuItem5 = <DeletePlayer setDisplay={setDisplay} />;

  const buttonStyle = { backgroundColor: 'rgb(101, 148, 184)'};

  return (
    <div className="d-flex justify-content-center flex-column">
      <Button variant="primary" style={buttonStyle} onClick={() => setDisplay(menuItem1)}>
        Add Player
      </Button>
      <p />
      <Button variant="primary" style={buttonStyle} onClick={() => setDisplay(menuItem2)}>
        Get Single Player kev
      </Button>
      <p />
      <Button variant="primary" style={buttonStyle} onClick={() => setDisplay(menuItem3)}>
        Show All Players
      </Button>
      <p />
      <Button variant="primary" style={buttonStyle} onClick={() => setDisplay(menuItem4)}>
        Update Player
      </Button>
      <p />
      <Button variant="primary" style={buttonStyle} onClick={() => setDisplay(menuItem5)}>
        Delete Player
      </Button>
    </div>

  );
}


export default Menu;