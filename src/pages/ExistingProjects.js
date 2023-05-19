import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import NavButton from '../components/NavButton';
import { ProjectContext } from './ProjectContext';
import { AllProjects } from '../components/AllProjects';
import { LoggedInContext } from '../components/App';

function ExistingProjects() {
  const { project } = useContext(ProjectContext);
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const [projectName, setProjectName] = useState('');

  // Example data for recent edited projects, tasks, notes, sketches, and storyboard entries
  const recentEditedProjects = project?.recentEditedProjects || [];
  const recentTasks = project?.recentTasks || [];
  const recentNotes = project?.recentNotes || [];
  const recentSketches = project?.recentSketches || [];
  const recentStoryboardEntries = project?.recentStoryboardEntries || [];
  const handleSaveProject = () => {
    // Logic to save the project
    // Assuming you have the project name available as a variable named `projectName`
    // Save the project name to the state variable
    setProjectName(projectName);
  };


  return (
    <>
      <header style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '20px' }}>
        <h1>Game Organizer</h1>
        <div>
        {isLoggedIn && (
            <>
          <NavButton to="/existing-projects" label="Existing Projects" style={{ marginRight: '10px', color: 'white' }}>Existing Projects</NavButton>
          <NavButton to="/create-project" label="Create Project" />
          <NavButton to="/profile" label="Profile" style={{ color: 'white' }}>Profile</NavButton>
          </>)}
        </div>
      </header>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px', width: '40%', textAlign: 'center' }}>
          <h2>Recent Edited Projects</h2>
          <AllProjects/>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', width: '50%' }}>
          <h2>Recent Tasks</h2>
          <ul style={{ border: '1px solid #ccc', padding: '10px' }}>
            {recentTasks.map((task) => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
          <h2>Recent Notes</h2>
          <ul style={{ border: '1px solid #ccc', padding: '10px' }}>
            {recentNotes.map((note) => (
              <li key={note.id}>{note.title}</li>
            ))}
          </ul>
          <h2>Recent Sketches</h2>
          <ul style={{ border: '1px solid #ccc', padding: '10px' }}>
            {recentSketches.map((sketch) => (
              <li key={sketch.id}>{sketch.name}</li>
            ))}
          </ul>
          <h2>Recent Storyboard Entries</h2>
          <ul style={{ border: '1px solid #ccc', padding: '10px' }}>
            {recentStoryboardEntries.map((entry) => (
              <li key={entry.id}>{entry.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ExistingProjects;