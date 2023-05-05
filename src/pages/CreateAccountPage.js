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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "50px 0px 50px 0px"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#ccc",
          padding: "20px",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h1 style={{ textAlign: "center" }}>Create Account</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label style={{ display: "flex", flexDirection: "column", marginRight: "10px" }}>
            First Name:
            <input type="text" value={firstName} onChange={handleFirstNameChange} style={{ marginTop: "5px" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            Last Name:
            <input type="text" value={lastName} onChange={handleLastNameChange} style={{ marginTop: "5px" }} />
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
          <label style={{ display: "flex", flexDirection: "column", marginRight: "10px" }}>
            Address:
            <input type="text" value={address} onChange={handleAddressChange} style={{ marginTop: "5px" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            User Name:
            <input type="text" value={userName} onChange={handleUserNameChange} style={{ marginTop: "5px" }} />
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
          <label style={{ display: "flex", flexDirection: "column", marginRight: "10px" }}>
            Phone:
            <input type="tel" value={phone} onChange={handlePhoneChange} style={{ marginTop: "5px" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} style={{ marginTop: "5px" }} />
          </label>
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "center", marginLeft: "-10px" }}>
          <button type="submit">Create Account</button>
          <span style={{ margin: "0px 10px" }}> or </span>
          <Link to="/login" style={{ marginLeft: "10px" }}>Login</Link>
        </div>
      </form>
    </div>
  );
};

export default CreateAccountPage;