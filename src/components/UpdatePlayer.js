import React, { useState, useEffect } from "react";
import { UpdatePlayerForm } from "./UpdatePlayerForm";
import { DisplayPlayer2 } from "./DisplayPlayer2";

/**
 * Component that allows updating a player's information.
 * @param {Object} setDisplay - Function to set the component to display.
 * @returns {JSX.Element} - The rendered component.
 */
function UpdatePlayer({setDisplay}){
    const [updated, setUpdated] = useState(null);

    useEffect(()=>{
        if(updated){
            setDisplay(
                <DisplayPlayer2 player = {updated} heading ="The changed player is "/>
            );
        }
    },[updated, setDisplay]);

    return (
        <>
            <UpdatePlayerForm setUpdated={setUpdated} />
        </>

    );
}

export { UpdatePlayer };