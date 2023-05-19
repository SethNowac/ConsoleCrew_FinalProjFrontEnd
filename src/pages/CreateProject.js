import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../style.css";

/**
 * CreateProject component renders a form for creating a new project.
 */
function CreateProject() {
  const title = useRef(null);
  const desc = useRef(null);
  const tag = useRef(null);

  const navigate = useNavigate();

  /**
   * handleSubmit function is triggered when the form is submitted.
   * It sends a POST request to create a new project.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    let numOfItems = 0;

    try {
      // Fetch the existing projects to determine the number of items
        const responseGet = await fetch("http://localhost:1339/projects", { method: "GET" });
        const resultGet = await responseGet.json();
        if (responseGet.status === 200) {
            numOfItems = resultGet.length;
        }
    } catch (error) { }

    // Prepare the request body
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
          id: numOfItems,
          title: title.current.value,
          desc: desc.current.value,
          tag: tag.current.value,
          userId: parseInt(localStorage.getItem("userId")),
      }),
      headers:{
          "Content-type": "application/json; charset=utf-8",
      },
    };

    try{
       // Send the POST request to create a new project
      const response = await fetch("http://localhost:1339/projects", requestOptions);
      const result = await response.json();
      if (response.status === 400) {
          navigate("/", { state: { errorMessage: result.errorMessage } });
      }else if(response.status === 500){
          navigate("/systemerror", { state: { errorMessage : result.errorMessage}});
      }    
      else{
          navigate("/existing-projects");
      }
    } catch (err){
        navigate("/", { state: { errorMessage: "Id already exists" } });
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '40px 0px 40px 0px'
        }}
      >
        <form style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '5px',
          }} onSubmit={handleSubmit}
        >
            <h1 style={{ textAlign: 'center' }}>Create Project</h1>
            <label htmlFor="name">Title</label>
            <input style={{ display: 'block', width: '250px' }} id="text" placeholder="Title..." ref={title} required />
            <br/>
            <label htmlFor="id">Description</label>
            <input style={{ display: 'block', width: '250px' }} id="text" placeholder="Description..." ref={desc} required />
            <br/>
            <label htmlFor="dropdown">Tag</label>
            <select style={{ display: 'block', width: '250px' }} id="text" ref={tag} required>
              <option value="Indie">Indie</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Singleplayer">Singleplayer</option>
              <option value="Co-op">Co-op</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
            </select>

            <br/>
            <button style={{ display: 'block', width: '250px' }} id="submit" className='button-arounder'>Add</button>
        </form>
      </div>
    </>
  );
}

export default CreateProject;