import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import NavButton from '../components/NavButton';
import { ProjectContext } from './ProjectContext';

function ExistingProjects() {
  const { project } = useContext(ProjectContext);
  const [projectName, setProjectName] = useState('');
  const [recentTasks, setRecentTasks] = useState([]);
  const [recentNotes, setRecentNotes] = useState(null);
  const [recentSketch, setRecentSketch] = useState(null);
  const [sketchTitle, setSketchTitle] = useState('');
  const [storyBoardTitle, setStoryboardTitle] = useState(null);

  // Example data for recent edited projects, tasks, notes, sketches, and storyboard entries
  const recentEditedProjects = project?.recentEditedProjects || [];
  // const recentTasks = project?.recentTasks || [];



  const handleSaveProject = () => {
    // Logic to save the project
    // Assuming you have the project name available as a variable named `projectName`
    // Save the project name to the state variable
    setProjectName(projectName);
  };

  const retrieveProjectTasks = () => {
    const tasksData = localStorage.getItem('projectTasks');

    if (tasksData) {
      return JSON.parse(tasksData);
    }

    return [];
  };

  const retrieveProjectNotes = () => {
    const notesData = localStorage.getItem('projectNotes');

    if (notesData) {
      return JSON.parse(notesData);
    }

    return [];
  }

  const retrieveProjectSketches = () => {
    const sketchesData = localStorage.getItem('projectSketch');

    if (sketchesData) {
      return JSON.parse(sketchesData);
    }

    return [];
  }

  const retrieveProjectStoryBoards = () => {
    const storyBoardData = localStorage.getItem('projectStoryBoard');

    if (storyBoardData) {
      return JSON.parse(storyBoardData);
    }

    return [];
  }

  useEffect(() => {
    const retrievedTakes = retrieveProjectTasks();
    setRecentTasks(retrievedTakes);
  }, []);

  useEffect(() => {
    const retrievedNotes = retrieveProjectNotes();
    setRecentNotes(retrievedNotes);
  }, []);

  useEffect(() => {
    const retrievedSketches = retrieveProjectSketches();
    setSketchTitle(retrievedSketches);
  }, []);

  useEffect(() => {
    const retrievedStoryBoard = retrieveProjectStoryBoards();
    setStoryboardTitle(retrievedStoryBoard);
  }, []);

  return (
    <>
      <header style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '20px' }}>
        <h1>Game Organizer</h1>
        <div>
          <NavButton to="/existing-projects" label="Existing Projects" style={{ marginRight: '10px', color: 'white' }}>Existing Projects</NavButton>
          <NavButton to="/manage-projects" label="Manage Projects" style={{ marginRight: '10px', color: 'white' }}>Manage Projects</NavButton>
          <NavButton to="/profile" label="Profile" style={{ color: 'white' }}>Profile</NavButton>
        </div>
      </header>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px', width: '40%' }}>
          <h2>Recent Edited Projects</h2>
          <ul style={{ border: '1px solid #ccc', padding: '10px' }}>
            {recentTasks.map((task) => (
              <li key={task.id}>

                {task.text}
              </li>
            ))}
            {recentNotes ? (
              <li>{recentNotes.notes}</li>
            ) : (
              <li>No recent notes found.</li>
            )}
            {sketchTitle ? (
              <li>{sketchTitle.title}</li>
            ) : (
              <li>No recent sketches found.</li>
            )}
            {storyBoardTitle ? (
              <li>{storyBoardTitle.title}</li>
            ) : (
              <li>No recent stories found.</li>
            )}
          </ul>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', width: '50%' }}>
          <h2>Recent Tasks</h2>
          <ul style={{ border: '1px solid #ccc', padding: '10px' }}>
            {recentTasks.map((task) => (
              <li key={task.id}>

                {task.text}
              </li>
            ))}
          </ul>
          <h2>Recent Notes</h2>
          <ul style={{ border: '1px solid #ccc', padding: '10px' }}>
            {recentNotes ? (
              <li>{recentNotes.notes}</li>
            ) : (
              <li>No recent notes found.</li>
            )}
          </ul>
          <h2>Recent Sketches</h2>
          <ul style={{ border: '1px solid #ccc', padding: '10px' }}>
            {sketchTitle ? (
              <li>{sketchTitle.title}</li>
            ) : (
              <li>No recent sketches found.</li>
            )}
          </ul>
          <h2>Recent Storyboard Entries</h2>
          <ul style={{ border: '1px solid #ccc', padding: '10px' }}>
            {storyBoardTitle ? (
              <li>{storyBoardTitle.title}</li>
            ) : (
              <li>No recent stories found.</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ExistingProjects;