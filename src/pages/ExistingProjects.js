import React from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import NavButton from '../components/NavButton';

function ExistingProjects() {
    // Example data for recent edited projects, tasks, notes, sketches, and storyboard entries
    const recentEditedProjects = [
        { id: 1, name: 'Project A' },
        { id: 2, name: 'Project B' },
        { id: 3, name: 'Project C' },
    ];

    const recentTasks = [
        { id: 1, name: 'Task A' },
        { id: 2, name: 'Task B' },
        { id: 3, name: 'Task C' },
    ];

    const recentNotes = [
        { id: 1, title: 'Note A' },
        { id: 2, title: 'Note B' },
        { id: 3, title: 'Note C' },
    ];

    const recentSketches = [
        { id: 1, name: 'Sketch A' },
        { id: 2, name: 'Sketch B' },
        { id: 3, name: 'Sketch C' },
    ];

    const recentStoryboardEntries = [
        { id: 1, name: 'Storyboard Entry A' },
        { id: 2, name: 'Storyboard Entry B' },
        { id: 3, name: 'Storyboard Entry C' },
    ];

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
                    <ul>
                        {recentEditedProjects.map((project) => (
                            <li key={project.id}>{project.name}</li>
                        ))}
                    </ul>
                </div>
                <div style={{ border: '1px solid #ccc', padding: '20px', width: '50%' }}>
                    <h2>Recent Tasks</h2>
                    <ul>
                        {recentTasks.map((task) => (
                            <li key={task.id}>{task.name}</li>
                        ))}
                    </ul>
                    <h2>Recent Notes</h2>
                    <ul>
                        {recentNotes.map((note) => (
                            <li key={note.id}>{note.title}</li>
                        ))}
                    </ul>
                    <h2>Recent Sketches</h2>
                    <ul>
                        {recentSketches.map((sketch) => (
                            <li key={sketch.id}>{sketch.name}</li>
                        ))}
                    </ul>
                    <h2>Recent Storyboard Entries</h2>
                    <ul>
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