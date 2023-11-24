import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import NavButton from '../components/NavButton';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { SketchPicker } from 'react-color';
import { ProjectContext, ProjectProvider } from './ProjectContext';
import "../style.css";
import { LoggedInContext } from '../components/App';

/**
 * manages various states and functions related to managing projects, including handling tasks, notes, sketches, and storyboards. 
 * @returns 
 */
function ManageProjects() {
    const [projectName, setProjectName] = useState('');
    const [projectFormat, setProjectFormat] = useState('');
    const [projectContent, setProjectContent] = useState('');
    const [savedProject, setSavedProject] = useState(null);
    const [savedSketch, setSavedSketch] = useState(null);
    const [recentSketches, setRecentSketches] = useState([]);
    const [sketchTitle, setSketchTitle] = useState('');
    const [format, setFormat] = useState('');
    const [penColor, setPenColor] = useState('red');
    const [eraserActive, setEraserActive] = useState(false);
    const [showColorPanel, setShowColorPanel] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskIssue, setTaskIssue] = useState('');
    const [item, setItems] = useState([]);
    const [notes, setNotes] = useState('');
    const [noteId, setNoteId] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [notesList, setNotesList] = useState([]);
    const [showTextArea, setShowTextArea] = useState(false);
    const [sketchData, setSketchData] = useState(null);
    const [storyboardTitle, setStoryboardTitle] = useState('');
    const [recentNotes, setRecentNotes] = useState('');
    const [storyboardMode, setStoryboardMode] = useState('type');
    const sketchRef = useRef(null);
    const storyBoardRef = useRef(null);
    const { addProject } = useContext(ProjectContext);

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);

    // Save and restore state when switching between pages
    const handleFormatChange = async (selectedFormat) => {
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
            try {
                /** Call auth, passing cookies to the back-end */
                const response = await fetch(process.env.REACT_APP_BACKEND + "/tasklogs/" + localStorage.getItem("projectId"), { method: "GET", credentials: "include" });
                const result = await response.json();
                if (response.status === 200) {
                    setTasks(result);
                } else {
                    setTasks([]); // may be unnecessary, but do this just in case to be more secure
                }
            } catch (error) {
                setTasks([]);
            }
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

    const handleSaveTask = () => {
        localStorage.setItem('projectTasks', JSON.stringify(tasks));
    };

    const handleSaveNotes = () => {
        const notesData = { notes: notes };
        localStorage.setItem('projectNotes', JSON.stringify(notesData));
    }

    const handleSaveSketch = () => {
        // Save the sketch title to local storage along with other sketch data
        const sketchData = { title: sketchTitle };
        localStorage.setItem('projectSketch', JSON.stringify(sketchData));
    }

    const handleSaveStoryBoard = () => {
        const storyBoardData = { title: storyboardTitle };
        localStorage.setItem('projectStoryBoard', JSON.stringify(storyBoardData));
    }

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

    // Every time a task is added, add it to tasklog in back-end. If successful, insert on page
    const handleAddTask = async (event) => {
        event.preventDefault();

        let numOfItems = 0;

        try {
            const responseGet = await fetch(process.env.REACT_APP_BACKEND + "/tasklogs", { method: "GET", credentials: "include" });
            const resultGet = await responseGet.json();
            if (responseGet.status === 200) {
                numOfItems = resultGet.length;
            }
        } catch (error) { }

        const requestOptions = {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                id: numOfItems,
                issue: taskIssue,
                projectId: parseInt(localStorage.getItem("projectId")),
            }),
            headers: {
                "Content-type": "application/json; charset=utf-8",
            },
        };
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND + "/tasklogs", requestOptions);
            const result = await response.json();
            if (response.status === 400) {
                navigate("/", { state: { errorMessage: result.errorMessage } });
            } else if (response.status === 500) {
                navigate("/systemerror", { state: { errorMessage: result.errorMessage } });
            }
            else {
                setTasks([...tasks, result]);
            }
        } catch (err) {
            navigate("/", { state: { errorMessage: "Id already exists" } });
        }
    };

    const handleAddNotes = async (event) => {
        event.preventDefault();

        let numOfItems = 0;

        try {
            const responseGet = await fetch(process.env.REACT_APP_BACKEND + `/projectId/notes`, { method: "POST" });
            const resultGet = await responseGet.json();
            if (responseGet.status === 200) {
                numOfItems = resultGet.length;
            }
        } catch (error) { }

        const content = document.getElementById("notes").value;

        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                id: numOfItems,
                content: content,
                projectId: parseInt(localStorage.getItem("projectId")),
            }),
            headers: {
                "Content-type": "application/json; charset=utf-8",
            },
        };

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND + `/projectId/notes`, requestOptions);
            const result = await response.json();
            if (response.status === 400) {
                navigate("/", { state: { errorMessage: result.errorMessage } });
            } else if (response.status === 500) {
                navigate("/systemerror", { state: { errorMessage: result.errorMessage } });
            } else {
                // Handle the response or update the UI as needed
            }
        } catch (err) {
            navigate("/", { state: { errorMessage: "Id already exists" } });
        }
    };

    const handleAddItems = () => {
        setItems([...item, '']);
    }

    const handleSaveNote = () => {
        if (editMode) {
            // Editing existing note
            const updatedNotesList = notesList.map((note) => {
                if (note.id === noteId) {
                    return { id: noteId, content: notes };
                }
                return note;
            });
            setNotesList(updatedNotesList);
            setEditMode(false);
        } else {
            // Adding new note
            const newNote = { id: Date.now(), content: notes };
            setNotesList([...notesList, newNote]);
        }

        setNotes('');
    };

    const handleEditNote = (note) => {
        setNotes(note.content);
        setNoteId(note.id);
        setEditMode(true);
    };

    const handleDeleteNote = (noteId) => {
        const updatedNotesList = notesList.filter((note) => note.id !== noteId);
        setNotesList(updatedNotesList);
    };

    const handleRemoveTask = async (event, index) => {
        event.preventDefault();
        let result;

        try {
            const responseGet = await fetch(process.env.REACT_APP_BACKEND + "/tasklogs/" + index, { method: "DELETE", credentials: "include" });
            result = responseGet.json();
            if (responseGet.status === 200) {
                const updatedTasks = [...tasks];
                updatedTasks.splice(index, 1);
                setTasks(updatedTasks);
            } else if (responseGet.status === 400) {
                navigate("/", { state: { errorMessage: result.errorMessage } });
            } else {
                navigate("/systemerror", { state: { errorMessage: result.errorMessage } });
            }
        } catch (error) {
            navigate("/systemerror", { state: { errorMessage: "You are not authorized to access this page" } });
        }
    };

    const handleTaskTextChange = async (event, index) => {
        event.preventDefault();

        const updatedTasks = [...tasks];
        updatedTasks[index].notes = event.target.value;
        setTasks(updatedTasks);

        const requestOptions = {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({
                id: index,
                newIssue: updatedTasks[index].issue,
                isResolved: updatedTasks[index].isResolved,
                newNotes: event.target.value,
            }),
            headers: {
                "Content-type": "application/json; charset=utf-8",
            },
        };
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND + "/tasklogs", requestOptions);
            const result = await response.json();
            if (response.status === 400) {
                navigate("/", { state: { errorMessage: result.errorMessage } });
            } else if (response.status === 500) {
                navigate("/systemerror", { state: { errorMessage: result.errorMessage } });
            }
        } catch (err) {
            navigate("/", { state: { errorMessage: "You are not authorized to access this page" } });
        }
    };

    const handleTaskCheckboxChange = async (event, index) => {
        event.preventDefault();

        const updatedTasks = [...tasks];
        updatedTasks[index].isResolved = event.target.checked;
        setTasks(updatedTasks);

        const requestOptions = {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({
                id: index,
                newIssue: updatedTasks[index].issue,
                isResolved: event.target.checked,
                newNotes: updatedTasks[index].notes,
            }),
            headers: {
                "Content-type": "application/json; charset=utf-8",
            },
        };
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND + "/tasklogs", requestOptions);
            const result = await response.json();
            if (response.status === 400) {
                navigate("/", { state: { errorMessage: result.errorMessage } });
            } else if (response.status === 500) {
                navigate("/systemerror", { state: { errorMessage: result.errorMessage } });
            }
        } catch (err) {
            navigate("/", { state: { errorMessage: "You are not authorized to access this page" } });
        }
    }



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
                    {isLoggedIn && (
                        <>
                            <NavButton to="/existing-projects" label="Existing Projects" style={{ marginRight: '10px', color: 'white' }}>Existing Projects</NavButton>
                            <NavButton to="/create-project" label="Create Project" />
                        </>)}
                </div>
            </header>
            <div style={{ display: 'flex', padding: '20px' }}>
                <div style={{ border: '1px solid #ccc', padding: '20px', width: '30%', marginRight: '20px', display: 'flex', flexDirection: 'column', flex: '1' }}>
                    <h5>List of Items to Edit</h5>
                    <div style={{ flex: '1', overflowY: 'auto' }}>
                        {item.map((item, index) => (
                            <div key={index}>
                                <textarea
                                    value={item.text}
                                    onChange={(event) => handleItemChange(event, index)}
                                    style={{ height: `35px`, width: '100%' }}
                                    placeholder="Enter Your Items Here"
                                />
                                <button onClick={() => handleRemoveItem(index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button onClick={handleAddItems} style={{ width: '100%', height: '100%' }} className="styled-button">Add Item</button>
                    </div>
                </div>
                <div style={{ width: '70%' }}>
                    <header style={{ backgroundColor: "black", color: 'white', textAlign: 'center', padding: '20px' }}>
                        <h2>Format</h2>
                        <div>
                            <button onClick={() => handleFormatChange('tasks')} className="styled-button">Tasks</button>
                            <button onClick={() => handleFormatChange('notes')} className="styled-button">Notes</button>
                            <button onClick={() => handleFormatChange('sketchbook')} className="styled-button">Sketch Book</button>
                            <button onClick={() => handleFormatChange('storyboard')} className="styled-button">Storyboard</button>
                        </div>
                    </header>
                    <div style={{ display: 'flex' }}>
                        <div style={{ border: '1px solid #ccc', padding: '20px', width: '100%' }}>
                            {format === 'tasks' && (
                                <div>
                                    <h3 style={{ textAlign: 'center' }}>Tasks</h3>
                                    <div>
                                        {tasks.map((task) => (
                                            <div key={task.id}>
                                                <h6>{task.issue}</h6>
                                                <input
                                                    type="checkbox"
                                                    checked={task.isResolved}
                                                    onChange={(event) => handleTaskCheckboxChange(event, task.id)}
                                                />
                                                <textarea
                                                    value={task.notes}
                                                    onChange={(event) => handleTaskTextChange(event, task.id)}
                                                    style={{ height: '5vh', width: '50vw' }}
                                                    placeholder="Enter Your Task Here"
                                                />
                                                <button onClick={(event) => handleRemoveTask(event, task.id)}>Remove</button>
                                            </div>
                                        ))}
                                    </div>
                                    <form onSubmit={handleAddTask}>
                                        <label htmlFor="name">Name</label>
                                        <input id="text" placeholder="Task name..." onChange={(e) => setTaskIssue(e.target.value)} required />
                                        <button id="submit">Add Task</button>
                                    </form>
                                    <button onClick={handleSaveTask} className="button-49">Save Project</button>
                                </div>

                            )}
                            {format === 'notes' && (
                                <div>
                                    <h3 style={{ textAlign: 'center' }}>Notes</h3>
                                    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                                        <textarea
                                            style={{ width: '100%', height: '300px' }}
                                            placeholder="Enter Your Notes Here"
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <ul>
                                        {notesList.map((note) => (
                                            <li key={note.id}>
                                                <span>{note.content}</span>
                                                <button onClick={() => handleEditNote(note)}>Edit</button>
                                                <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
                                            </li>
                                        ))}
                                    </ul>
                                    <form onSubmit={handleAddNotes}>
                                        <button id="submit" onClick={handleSaveNotes} className="button-49">Add Notes</button>
                                    </form>
                                </div>
                            )}
                            {format === 'sketchbook' && (
                                <div>
                                    <h3 style={{ textAlign: 'center' }}>Sketch Book</h3>
                                    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                                        <div>
                                            <input
                                                type="text"
                                                id="sketchTitle"
                                                value={sketchTitle}
                                                style={{ textAlign: 'center' }}
                                                onChange={(e) => setSketchTitle(e.target.value)}
                                                placeholder='Sketch Book Title'
                                            />
                                        </div>
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
                                                <button onClick={toggleEraser} style={{ backgroundColor: eraserActive ? 'red' : 'green' }}>
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
                                                {showColorPanel && <SketchPicker color={penColor} onChange={handlePenColorChange} />}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <button onClick={handleSaveSketch} className="button-49">Save Project</button>
                                    </div>

                                </div>
                            )}
                            {format === 'storyboard' && (
                                <div>
                                    <h3 style={{ textAlign: 'center' }}>Storyboard</h3>
                                    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                                        <input style={{ textAlign: 'center' }} type="text" placeholder="Storyboard Title" value={storyboardTitle} onChange={(e) => setStoryboardTitle(e.target.value)} />
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

                                    <button onClick={handleSaveStoryBoard} className="button-49">Save Project</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div><h1>


            </h1></div>
            {savedProject && (
                <div>
                    <h3>Project Saved!</h3>
                </div>
            )}
        </>
    );


}

export default ManageProjects;

