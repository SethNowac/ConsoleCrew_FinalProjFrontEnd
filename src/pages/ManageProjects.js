import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import NavButton from '../components/NavButton';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { SketchPicker } from 'react-color';


function ManageProjects() {
    const [projectName, setProjectName] = useState('');
    const [projectFormat, setProjectFormat] = useState('');
    const [projectContent, setProjectContent] = useState('');
    const [savedProject, setSavedProject] = useState(null);
    const [format, setFormat] = useState('');
    const [penColor, setPenColor] = useState('red');
    const [eraserActive, setEraserActive] = useState(false);
    const [showColorPanel, setShowColorPanel] = useState(false);
    const sketchRef = useRef(null);

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    };

    const handleFormatChange = (selectedFormat) => {
        setFormat(selectedFormat);
    };

    const handleProjectContentChange = () => {
        const content = sketchRef.current.toDataURL();
        setProjectContent(content);
    };

    const handleSaveProject = () => {
        // Save the project to the user's local machine
        const projectData = {
            name: projectName,
            format: projectFormat,
            content: projectContent,
            // Other project data...
        };

        // Logic to save project data to local machine goes here

        setSavedProject(projectData);
    };

    const handleStartProject = () => {
        // Clear the project content when starting a new project
        setProjectContent('');
        sketchRef.current.clear();
    };

    const handlePenColorChange = (color) => {
        setPenColor(color.hex);
    };

    const toggleEraser = () => {
        setEraserActive((prevEraserActive) => !prevEraserActive);
    };

    const handlePenColorButtonClick = () => {
        setShowColorPanel(!showColorPanel);
    };

    const handleClearSketch = () => {
        sketchRef.current.clearCanvas();
    };

    const styles = {
        border: '0.0625rem solid #9c9c9c',
        borderRadius: '0.25rem',
    };


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
            <div style={{ display: 'flex', padding: '20px' }}>
                <div style={{ border: '1px solid #ccc', padding: '20px', width: '30%', marginRight: '20px' }}>
                    <h2>List of Items to Edit</h2>
                    {/* Render the list of items to edit */}
                </div>
                <div style={{ width: '70%' }}>
                    <header style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '20px' }}>
                        <h2>Format</h2>
                        <div>
                            <button onClick={() => handleFormatChange('tasks')} style={{ marginRight: '10px', color: 'black' }}>Tasks</button>
                            <button onClick={() => handleFormatChange('notes')} style={{ marginRight: '10px', color: 'black' }}>Notes</button>
                            <button onClick={() => handleFormatChange('sketchbook')} style={{ marginRight: '10px', color: 'black' }}>Sketch Book</button>
                            <button onClick={() => handleFormatChange('storyboard')} style={{ marginRight: '10px', color: 'black' }}>Storyboard</button>
                        </div>
                    </header>
                    <div style={{ display: 'flex' }}>
                        <div style={{ border: '1px solid #ccc', padding: '20px', width: '100%' }}>
                            {format === 'tasks' && (
                                <div>
                                    <h3>Tasks</h3>
                                    {/* Render tasks */}
                                </div>
                            )}
                            {format === 'notes' && (
                                <div>
                                    <h3>Notes</h3>
                                    {/* Render notes */}
                                </div>
                            )}
                            {format === 'sketchbook' && (
                                <div>
                                    <h3>Sketch Book</h3>
                                    <div style={{ width: 500 }}>
                                        <ReactSketchCanvas
                                            style={styles}
                                            width="1800"
                                            height="1000"
                                            strokeWidth={eraserActive ? 20 : 4}
                                            strokeColor={eraserActive ? 'white' : penColor}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div>
                                            <h4>Pen Color</h4>
                                            <button onClick={handlePenColorButtonClick}>Select Color</button>
                                            {showColorPanel && (
                                                <SketchPicker color={penColor} onChange={handlePenColorChange} />
                                            )}
                                        </div>
                                        <div>
                                            <h4>Eraser</h4>
                                            <button onClick={toggleEraser}>
                                                {eraserActive ? 'Disable Eraser' : 'Enable Eraser'}
                                            </button>
                                        </div>
                                        {/* <div>
                                            <h4>Clear Sketch</h4>
                                            <button onClick={handleClearSketch}>Clear</button>
                                        </div> */}
                                    </div>
                                </div>
                            )}
                            {format === 'storyboard' && (
                                <div>
                                    <h3>Storyboard</h3>
                                    {/* Render storyboard */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" onClick={handleSaveProject}>Save Project</button>
            {savedProject && (
                <div>
                    <h3>Project Saved!</h3>
                    <p>Format: {savedProject.format}</p>
                    {/* Display other project data */}
                </div>
            )}
        </>
    );


}

export default ManageProjects;

