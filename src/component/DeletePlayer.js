import React, { useState, useEffect } from "react";
import { DeletePlayerForm } from "./DeletePlayerForm";
import { DisplayPlayer } from "./DisplayPlayer";

/**
 * Component that allows the user to delete a player and displays the deleted player.
 * @param {object} setDisplay - Function to set the display of the player information.
 * @returns JSX element that renders the delete player form.
 */
function DeletePlayer({setDisplay}){
    const [deleted, setDeleted] = useState(null);

    useEffect(()=>{
        if(deleted){
            setDisplay(
                <DisplayPlayer player = {deleted} heading ="The deleted player is "/>
            );
        }
    },[deleted, setDisplay]);

    return (
        <>
            <DeletePlayerForm setDeleted={setDeleted} />
        </>

    );
}

export { DeletePlayer };