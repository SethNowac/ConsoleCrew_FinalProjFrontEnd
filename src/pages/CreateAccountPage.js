import React, { useState } from 'react';
import { Link } from "react-router-dom";

const CreateAccountPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
  
    const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
    };
  
    const handleLastNameChange = (event) => {
      setLastName(event.target.value);
    };
  
    const handleAddressChange = (event) => {
      setAddress(event.target.value);
    };
  
    const handleUserNameChange = (event) => {
      setUserName(event.target.value);
    };
  
    const handlePhoneChange = (event) => {
      setPhone(event.target.value);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Do something with the form data, such as sending it to a server to create a new account.
      console.log(`First Name: ${firstName}`);
      console.log(`Last Name: ${lastName}`);
      console.log(`Address: ${address}`);
      console.log(`User Name: ${userName}`);
      console.log(`Phone: ${phone}`);
      console.log(`Email: ${email}`);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={handleFirstNameChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" value={address} onChange={handleAddressChange} />
        </label>
        <br />
        <label>
          User Name:
          <input type="text" value={userName} onChange={handleUserNameChange} />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" value={phone} onChange={handlePhoneChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <button type="submit">Create Account</button>
        <span> or </span>
        <Link to="/login">Login</Link>
      </form>
    );
  };
  
  export default CreateAccountPage;