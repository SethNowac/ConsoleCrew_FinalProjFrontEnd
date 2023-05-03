import React, { useState, useEffect } from "react";
import { AddPlayerForm } from "./AddPlayerForm";
import { DisplayPlayer } from "./DisplayPlayer";

/**
 * Component that lets the user add a player and then displays it.
 * @param {Object} props - The props object.
 * @param {function} props.setDisplay - A function that sets the display.
 * @returns {JSX.Element} - JSX element that represents the component.
 */
function AddPlayer({ setDisplay }) {
  const [added, setAdded] = useState(null); // null by default so
  // truthy check fails
  useEffect(() => {
    if (added) {
      // Only update display when a player has been added  
      setDisplay(
        <DisplayPlayer player={added} heading="The added player is" />
      );
    }
  }, [added, setDisplay]);
  return (
    <>
      <AddPlayerForm setAdded={setAdded} />
    </>
  );
}

export { AddPlayer };
