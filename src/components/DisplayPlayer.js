import React, { useEffect } from "react";
import Card from "./Card";

/**
 * A component that displays information about a player.
 * @param {Object} props - The props that are passed to this component.
 * @param {string} props.heading - The heading to be displayed above the player information.
 * @param {Object} props.player - The player object containing the player's name and id.
 * @param {string} props.player.name - The player's name.
 * @param {string} props.player.id - The player's id.
 * @returns {JSX.Element} - A Card component that displays the player information.
 */
function DisplayPlayer(props) {
  useEffect(() => {
    if (props.player.name === "Error") {
      throw new Error();
    }
  }); // No second parameter, so run useEffect every re-render


  return (
    <Card image="images/Blue.jpeg">
      <h1>{props.heading}</h1>
      <h2>Name: {props.player.name}</h2>
      <h2>Id: {props.player.id}</h2>
    </Card>
  );
}



export { DisplayPlayer };