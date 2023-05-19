import { useEffect, useState } from "react";
import { ListProject } from "./ListProjects";

/**
 * Fetches all players from server and sets them in state.
 * @returns A button to call the function to get all players and a list of players.
 */
function AllProjects(){
    const [projects, setProjects ] = useState([]);

    useEffect(() => {
        async function getListOfProjects() {
          try {
            /** Call auth, passing cookies to the back-end */
            const response = await fetch("http://localhost:1339/projects/"+localStorage.getItem("userId"), { method : "GET", credentials: "include" });
            const result = await response.json();
            if (response.status === 200) {
              setProjects(result);
            } else {
              setProjects([]); // may be unnecessary, but do this just in case to be more secure
            }
          } catch (error) {
            setProjects([]);
          }
        }
        getListOfProjects();
      });

    return(
        <>
        <ListProject projects={projects} />
        </>
    );
}

export { AllProjects };