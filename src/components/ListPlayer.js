/**
 * A functional component that renders a list of players.
 * @param {Object[]} players - An array of player objects.
 * @param {string} players[].name - The name of the player.
 * @param {number} players[].id - The unique identifier of the player.
 * @returns {JSX.Element} - A JSX element that contains a list of player names and IDs.
 */
function ListPlayer({ players }){
    return(
        <div>
            <h1>All Players</h1>
            <ul>
                {players.map((player) => (
                    <li key={player.id}>
                        {player.name} with id {player.id}.
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { ListPlayer };