import React from 'react';
import { useParams } from 'react-router-dom';

function About(){
    const { crewMember } = useParams();

    return(
        <div>
            <h1>About Us</h1>
            <p>Team name: Console Crew</p>
            {crewMember == "Seth" && <h2>Seth: Database designer</h2>}
            {crewMember == "Griffin" && <h2>Griffin: Backend worker</h2>}
            {crewMember == "Kevin" && <h2>Kevin: Frontend worker</h2>}
        </div>
    )
}

export default About;