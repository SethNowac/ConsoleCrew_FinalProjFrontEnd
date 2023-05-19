import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

/**
 * A functional component that renders a list of projects.
 * @param {Object[]} projects - An array of project objects.
 * @param {string} projects[].title - The title of the project.
 * @param {number} projects[].id - The unique identifier of the project.
 * @returns {JSX.Element} - A JSX element that contains a list of project names and IDs.
 */
function ListProject({ projects }){
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        localStorage.setItem("projectId", event.target.id);
        navigate("/manage-projects");
    }

    const navToUpdate = async (event) => {
        event.preventDefault();
        sessionStorage.setItem("updateProjectId", event.target.id);
        navigate("/update-project");
    }

    const navToDelete = async (event) => {
        event.preventDefault();
        
        let result;
        try {
            const responseGet = await fetch("http://localhost:1339/projects/"+event.target.id, { method: "DELETE" });
            result = responseGet.json();
            if (responseGet.status === 200) {
                console.log("Deleting a project was successful");
            } else if (responseGet.status === 400) {
                navigate("/", { state: { errorMessage: result.errorMessage } });
            } else {
                navigate("/systemerror", { state: { errorMessage: result.errorMessage } });
            }
        } catch (error) { 
            navigate("/systemerror", { state: { errorMessage: "Id already exists" } });
        }
    }

    return(
        <div>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <Button style={{margin: "5px"}} id={project.id} onClick={handleSubmit}>{project.title}</Button>
                        <Button variant="link" id={project.id} size="sm" onClick={navToUpdate}>Update</Button>
                        <Button variant="link" id={project.id} size="sm" onClick={navToDelete}>Delete</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { ListProject };