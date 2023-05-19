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

    return(
        <div>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <Button style={{margin: "5px"}} id={project.id} onClick={handleSubmit}>{project.title}</Button>
                        <Button variant="link" id={project.id} size="sm" onClick={handleSubmit}>Update</Button>
                        <Button variant="link" id={project.id} size="sm" onClick={handleSubmit}>Delete</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { ListProject };