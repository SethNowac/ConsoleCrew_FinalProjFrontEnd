import React from 'react';
import { useParams } from "react-router-dom";
import '../style.css';

/**
 * Component for displaying information about the Console Crew team.
 * @returns JSX containing the team name and optionally the name of a specific employee.
 */
function About() {

    return (
      <div>
        <h1>About Us</h1>
        <h3>

          Team Name: Console Crew</h3>
        <p style={{ border: '1px solid #ccc', padding: '10px' }}>
          
          Welcome to Game Organizer, your ultimate companion for managing and organizing your gaming experiences! We are the Console Crew, a dedicated team passionate about bringing order and convenience to the world of gaming. With our innovative platform, we aim to streamline your gaming activities, from tracking your game library to scheduling multiplayer sessions with friends. Whether you're a casual gamer or a hardcore enthusiast, Game Organizer is here to enhance your gaming journey and help you stay on top of your gaming adventures. Join us today and level up your gaming experience with ease!
        </p>
      </div>
    );
}

export default About;