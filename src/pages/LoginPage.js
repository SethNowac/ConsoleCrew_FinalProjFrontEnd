import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;