import React from 'react';
import { useParams } from "react-router-dom";
import '../style.css';

/**
 * Component for displaying information about the Console Crew team.
 * @returns JSX containing the team name and optionally the name of a specific employee.
 */
function About() {
    const { employee } = useParams();


  return (
        <div>
            <h1>About Us</h1>
            <p>Team name: Console Crew</p>
            {employee === "Seth1" && <h2>Seth1</h2>}
            {employee === "Seth2" && <h2>Seth2</h2>}
        </div>
  );
}

export default About;