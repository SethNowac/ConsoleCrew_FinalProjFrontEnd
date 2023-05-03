import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";


/**
 * Component that allows the user to delete a player and displays the deleted player.
 * @param {object} setDisplay - Function to set the display of the player information.
 * @returns JSX element that renders the delete player form.
 */
function DeletePlayerForm(props) {
    const nameRef = useRef(null);
    const idRef = useRef(null);
    const imageRef = useRef(null);
    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "DELETE",
            body: JSON.stringify({
                name: nameRef.current.value,
                id: idRef.current.value,
                imageLink: imageRef.current.value,
            }),
            headers:{
                "Content-type": "application/json; charset=utf-8",
            },
        };
        try{
            const response = await fetch("http://localhost:1338/players", requestOptions);
            const result = await response.json();
            if (response.status === 400) {
                navigate("/", { state: { errorMessage: result.errorMessage } });
            }else if(response.status === 500){
                navigate("/systemerror", { state: { errorMessage : result.errorMessage}});
            }    
            else{
                props.setDeleted(result);
            }
        } catch (err){
            navigate("/", { state: { errorMessage: "Id already exists" } });
        }
        
       
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input id="text" placeholder="Name..." ref={nameRef} required />

            <label htmlFor="id">Id</label>
            <input id="text" placeholder="Id..." ref={idRef} required />

            <label htmlFor="imageLink">Image</label>
            <input id="text" placeholder="Image Link..." ref={imageRef} />

            <button id="submit">Delete Player</button>
        </form>
    );
}

export { DeletePlayerForm };