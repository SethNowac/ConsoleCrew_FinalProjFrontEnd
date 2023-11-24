import { useState } from "react";
import { DisplayPlayer } from "./DisplayPlayer";

/**
 * Component to retrieve and display a single player.
 * @param {Object} props - Component props
 * @param {function} props.setDisplay - Function to set the right pane display in Main component
 * @returns {JSX.Element} - Rendered component
 */
function SinglePlayer({ setDisplay }) {
  const [player, setPlayer] = useState({});

  async function callGetPlayer() {
    const response = await fetch(process.env.REACT_APP_BACKEND + "/players/kev", {
      method: "GET",
    });
    const result = await response.json();
    setPlayer(result);
    setDisplay(<DisplayPlayer player={result} heading="The found player is" />);
  }

  return (
    <>
      <button onClick={callGetPlayer}>Get Player</button>
    </>
  );
}

export { SinglePlayer };