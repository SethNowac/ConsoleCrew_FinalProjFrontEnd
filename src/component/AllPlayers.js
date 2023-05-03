import { useState } from "react";
import { ListPlayer } from "./ListPlayer";

/**
 * Fetches all players from server and sets them in state.
 * @returns A button to call the function to get all players and a list of players.
 */
function AllPlayers(){
    const [players, setPlayers ] = useState([]);

    const callGetAllPlayers = async () => {
        const response = await fetch("http://localhost:1338/players", { method : "GET" });
        const result = await response.json();
        setPlayers(result);
    };

    return(
        <>
        <button onClick={callGetAllPlayers}>Get All Players</button>
        <ListPlayer players={players} />
        </>
    );
}

export { AllPlayers };