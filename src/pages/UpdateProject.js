import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../style.css";

function UpdateProject() {
  const title = useRef(null);
  const desc = useRef(null);
  const tag = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(sessionStorage.getItem("updateProjectId") == null) {
        alert("No project has been selected!");
        return;
    }

    const requestOptions = {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
          id: parseInt(sessionStorage.getItem("updateProjectId")),
          newTitle: title.current.value,
          newDesc: desc.current.value,
          newTag: tag.current.value,
      }),
      headers:{
          "Content-type": "application/json; charset=utf-8",
      },
    };

    try{
      const response = await fetch("http://localhost:1339/projects", requestOptions);
      const result = await response.json();
      if (response.status === 400) {
          navigate("/", { state: { errorMessage: result.errorMessage } });
      }else if(response.status === 500){
          navigate("/systemerror", { state: { errorMessage : result.errorMessage}});
      }    
      else{
          sessionStorage.removeItem("updateProjectId");
          navigate("/existing-projects");
      }
    } catch (err){
        navigate("/", { state: { errorMessage: "You are not authorized to access this page" } });
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
            <h1 style={{ textAlign: 'center' }}>Update Project</h1>
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
            <button style={{ display: 'block', width: '250px' }} id="submit" className='button-arounder'>Update</button>
        </form>
      </div>
    </>
  );
}

export default UpdateProject;