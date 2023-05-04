import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`Email: ${email} Password: ${password}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "50px 0px 50px 0px"    }}
    >
      <form 
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "5px",
      }}
      onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <label style={{ display: "block" }}>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label style={{ display: "block" }}>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
        <button type="submit">Login</button>
        <span>   or </span>
        <Link to="/create-account">Create an account </Link>
        </div>
       
      </form>
    </div>
  );
};

export default LoginPage;
