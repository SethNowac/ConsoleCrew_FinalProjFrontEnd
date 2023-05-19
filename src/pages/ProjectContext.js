import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();


/**
 * Component that provides the project context and manages the project state.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 */
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  /**
  * Adds a new project to the list of projects.
  * @param {Object} project - The project object to be added.
  */
  const addProject = (project) => {
    setProjects([...projects, project]);
  };

  // Render the children components within the project context provider
  return (
    <ProjectContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};