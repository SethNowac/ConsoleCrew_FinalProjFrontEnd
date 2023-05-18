import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import NavButton from '../components/NavButton';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { SketchPicker } from 'react-color';
import { ProjectContext, ProjectProvider } from './ProjectContext';

function ManageProjects() {
    const [projectName, setProjectName] = useState('');
    const [projectFormat, setProjectFormat] = useState('');
    const [projectContent, setProjectContent] = useState('');
    const [savedProject, setSavedProject] = useState(null);
    const [format, setFormat] = useState('');
    const [penColor, setPenColor] = useState('red');
    const [eraserActive, setEraserActive] = useState(false);
    const [showColorPanel, setShowColorPanel] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [item, setItems] = useState([]);
    const [notes, setNotes] = useState('');
    const [showTextArea, setShowTextArea] = useState(false);
    const [sketchData, setSketchData] = useState(null);
    const [storyboardTitle, setStoryboardTitle] = useState('');
    const [storyboardMode, setStoryboardMode] = useState('type');
    const sketchRef = useRef(null);
    const { addProject } = useContext(ProjectContext);


    // Save and restore state when switching between pages
    const handleFormatChange = (selectedFormat) => {
        // Save the state of the current page
        if (format === 'tasks') {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } else if (format === 'notes') {
            localStorage.setItem('notes', notes);
        } else if (format === 'sketchbook') {
            localStorage.setItem('sketchData', sketchData);
        } else if (format === 'storyboard') {
            localStorage.setItem('storyboardTitle', storyboardTitle);
            localStorage.setItem('storyboardMode', storyboardMode);
        }

        // Restore the state of the selected page
        if (selectedFormat === 'tasks') {
            const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            setTasks(savedTasks);
        } else if (selectedFormat === 'notes') {
            const savedNotes = localStorage.getItem('notes') || '';
            setNotes(savedNotes);
        } else if (selectedFormat === 'sketchbook') {
            const savedSketchData = localStorage.getItem('sketchData') || null;
            setSketchData(savedSketchData);
        } else if (selectedFormat === 'storyboard') {
            const savedStoryboardTitle = localStorage.getItem('storyboardTitle') || '';
            const savedStoryboardMode = localStorage.getItem('storyboardMode') || 'type';
            setStoryboardTitle(savedStoryboardTitle);
            setStoryboardMode(savedStoryboardMode);
        }

        // Update the selected format
        setFormat(selectedFormat);
    };

    const handleSaveProject = () => {
        // Save the project to the user's local machine
        const projectData = {
            name: projectName,
            format: projectFormat,
            content: projectContent,
        };

        // Logic to save project data to local machine goes here

        addProject(projectData); // Add the project to the context

        setSavedProject(projectData);
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
        if (sketchRef.current) {
            sketchRef.current.clearCanvas();
        }
    };

    const handleAddTask = () => {
        setTasks([...tasks, '']);
    };

    const handleAddItems = () => {
        setItems([...item, '']);
    }

    const handleRemoveTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    const handleTaskChange = (event, index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = event.target.value;
        setTasks(updatedTasks);
    };

    const handleItemChange = (event, index) => {
        const updatedItems = [...item];
        updatedItems[index] = event.target.value;
        setItems(updatedItems);
    };

    const handleRemoveItem = (index) => {
        const updatedItems = [...item];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const handleToggleTextArea = () => {
        setShowTextArea((prevShowTextArea) => !prevShowTextArea);
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
                    <h5>List of Items to Edit</h5>
                    <div>
                        {item.map((item, index) => (
                            <div key={index}>
                                <textarea
                                    value={item.text}
                                    onChange={(event) => handleItemChange(event, index)}
                                    style={{ height: `35px` }}
                                    placeholder="Enter Your Items Here"
                                />
                                <button onClick={() => handleRemoveItem(index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <div></div>
                    <div style={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button onClick={handleAddItems} style={{ width: '100%', height: '100%' }}>Add Item</button>
                    </div>

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
                                    <h3 style={{ textAlign: 'center' }}>Tasks</h3>
                                    <div>
                                        {tasks.map((task, index) => (
                                            <div key={index}>
                                                <input
                                                    type="checkbox"
                                                    checked={task.completed}
                                                // onChange={() => handleTaskCheckboxChange(index)}
                                                />
                                                <textarea
                                                    value={task.text}
                                                    onChange={(event) => handleTaskChange(event, index)}
                                                    style={{ height: '5vh', width: '50vw' }}
                                                    placeholder="Enter Your Task Here"
                                                />
                                                <button onClick={() => handleRemoveTask(index)}>Remove</button>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleAddTask} >Add Task</button>
                                </div>
                            )}
                            {format === 'notes' && (
                                <div>
                                    <h3 style={{ textAlign: 'center' }}>Notes</h3>
                                    <textarea
                                        style={{ width: '100%', height: '300px' }}
                                        placeholder="Enter Your Notes Here"
                                    // Handle onChange event and save the typed content
                                    ></textarea>
                                </div>
                            )}
                            {format === 'sketchbook' && (
                                <div>
                                    <h3 style={{ textAlign: 'center' }}>Sketch Book</h3>
                                    <div style={{ width: '100%' }}>
                                        <ReactSketchCanvas
                                            ref={sketchRef}
                                            style={styles}
                                            width="1800"
                                            height="1000"
                                            strokeWidth={eraserActive ? 20 : 4}
                                            strokeColor={eraserActive ? 'white' : penColor}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <h4>Eraser</h4>
                                            <button onClick={toggleEraser}>
                                                {eraserActive ? 'Disable Eraser' : 'Enable Eraser'}
                                            </button>
                                        </div>
                                        <div>
                                            <h4>Clear Sketch</h4>
                                            <button onClick={handleClearSketch}>Clear</button>
                                        </div>
                                        <div>
                                            <h4>Pen Color</h4>
                                            <button onClick={handlePenColorButtonClick}>Select Color</button>
                                            {showColorPanel && (
                                                <SketchPicker color={penColor} onChange={handlePenColorChange} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {format === 'storyboard' && (
                                <div>
                                    <h3 style={{ textAlign: 'center' }}>Storyboard</h3>
                                    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                                        <input style={{ textAlign: 'center' }} type="text" placeholder="Storyboard Title" />
                                        <div>
                                            <button onClick={() => setShowTextArea(true)}>Type</button>
                                            <button onClick={() => setShowTextArea(false)}>Draw</button>
                                        </div>
                                        {showTextArea ? (
                                            <textarea
                                                style={{ width: '100%', height: '600px' }}
                                                placeholder="Enter Your Story Here"
                                            // Handle onChange event and save the typed content
                                            ></textarea>
                                        ) : (
                                            <ReactSketchCanvas
                                                style={{ width: '100%', border: '1px solid #ccc', marginTop: '10px' }}
                                                height={600}
                                                strokeWidth={4}
                                                strokeColor="black"
                                            />
                                        )}
                                    </div>
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
                </div>
            )}
        </>
    );


}

export default ManageProjects;

