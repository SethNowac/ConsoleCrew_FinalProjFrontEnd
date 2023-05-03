import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

/**
 * Component that displays a form for updating player information.
 * @param {Object} props - Component props.
 * @param {function} props.setUpdated - Function to set the updated player information.
 * @returns {JSX.Element} - Form element for updating player information.
 */
function UpdatePlayerForm(props){
    const [oldName, setOldName] = useState(null);
    const [newName, setNewName] = useState(null);
    const [newId, setNewId] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "PUT",
            body: JSON.stringify({
                oldName: oldName,
                newName: newName,
                newId: newId,
            }),
            headers:{
                "Content-type": "application/json; charset=utf-8",
            },

        };
        const response = await fetch("http://localhost:1338/players", requestOptions);
        const result = await response.json();
        if (response.status === 400) {
            navigate("/", { state: { errorMessage: result.errorMessage } });
        }else if(response.status === 500){
            navigate("/systemerror", { state: { errorMessage : result.errorMessage}});
        }    
        else{
            props.setUpdated(result);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="oldName">Current Name</label>
            <input id="text" placeholder="Current Name..." onChange={(e) => setOldName(e.target.value)} />

            <label htmlFor="newName">New Name</label>
            <input id="text" placeholder="New Name..." onChange={(e) => setNewName(e.target.value)} />

            <label htmlFor="newId">New Id</label>
            <input id="text" placeholder="New Id..." onChange={(e) => setNewId(e.target.value)} />

            {oldName && newName && newId && <button id="submit">Update Player</button>}
        </form>
    );
}

export { UpdatePlayerForm };