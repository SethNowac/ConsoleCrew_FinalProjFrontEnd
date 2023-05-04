import { useState } from "react";
import TwoPanes from "./TwoPanes";
import Menu from "./Menu";



/**
 * Main component for our home page. Maintains state for the two display panes.
 * @returns {JSX.Element} Main component JSX
 */
function Main() {
  const defaultRightPane = <p>Welcome to our Players app!</p>;
  
  const [rightPane, setRightPane] = useState(defaultRightPane);

  const defaultLeftPane = <Menu setDisplay={setRightPane} />;
  const [leftPane, setLeftPane] = useState(defaultLeftPane);

  return (
    <div>
      <TwoPanes leftPane={leftPane} rightPane={rightPane} />
    </div>
  );
}
export default Main;
