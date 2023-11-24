import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";


/**
 * Form component that allows the user to add a new player.
 * @param {Object} props - Component props
 * @param {function} props.setAdded - Function that sets the newly added player
 * @returns {JSX.Element} - JSX element containing the form
 */
function AddPlayerForm(props) {
    const nameRef = useRef(null);
    const idRef = useRef(null);
    const imageRef = useRef(null);
    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
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
            const response = await fetch(process.env.REACT_APP_BACKEND + "/players", requestOptions);
            const result = await response.json();
            if (response.status === 400) {
                navigate("/", { state: { errorMessage: result.errorMessage } });
            }else if(response.status === 500){
                navigate("/systemerror", { state: { errorMessage : result.errorMessage}});
            }    
            else{
                props.setAdded(result);
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

            <button id="submit">Add Player</button>
        </form>
    );
}

export { AddPlayerForm };