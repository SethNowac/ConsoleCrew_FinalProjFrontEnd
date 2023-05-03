import React, { useEffect } from "react";
import Card from "./Card";

/**
 * Component for displaying an updated player's information.
 * @param {Object} props - The props object for the DisplayPlayer2 component.
 * @param {string} props.heading - The heading to be displayed above the updated player's information.
 * @param {Object} props.player - The updated player object to display.
 * @param {string} props.player.name - The updated name of the player.
 * @param {string} props.player.id - The ID of the player.
 * @returns {JSX.Element} - The JSX code for the DisplayPlayer2 component.
 */
function DisplayPlayer2(props) {
  useEffect(() => {
    if (props.player.name === "Error") {
      throw new Error();
    }
  }); // No second parameter, so run useEffect every re-render


  return (
    <Card image="images/Blue.jpeg">
      <h1>{props.heading}</h1>
      <h2>New Name: {props.player.name}</h2>
      <h2>Id: {props.player.id}</h2>
    </Card>
  );
}



export { DisplayPlayer2 };