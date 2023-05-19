import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../style.css";

/**
 * CreateAccountPage component renders a form for creating a new user account.
 */
const CreateAccountPage = () => {
  const navigate = useNavigate();


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  // Define similar event handler functions for other form fields...

  

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleReenteredPasswordChange = (event) => {
    setReenteredPassword(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  /**
   * validateForm function validates the form inputs and sets the errors state accordingly.
   * It returns true if the form is valid (no errors), and false otherwise.
   */
  const validateForm = () => {
    const errors = {};

    // Define regex patterns for validation
    const nameRegex = /^[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

    // Validate firstName
    if (firstName.trim() === '') {
      errors.firstName = 'First Name is required';
    } else if (!firstName.match(nameRegex)) {
      errors.firstName = 'First Name can only contain letters';
    }

    // Validate lastName
    if (lastName.trim() === '') {
      errors.lastName = 'Last Name is required';
    } else if (!lastName.match(nameRegex)) {
      errors.lastName = 'Last Name can only contain letters';
    }

     // Validate address
    if (address.trim() === '') {
      errors.address = 'Address is required';
    }

    // Validate userName
    if (userName.trim() === '') {
      errors.userName = 'User Name is required';
    }

    // Validate email
    if (!email.includes('@')) {
      errors.email = 'Invalid email';
    }

    // Validate password
    if (password.trim() === '') {
      errors.password = 'Password is required';
    } else if (!password.match(passwordRegex)) {
      errors.password = 'Must contain at least 1 letter and 1 number'
    }

    // Validate reenteredPassword
    if (reenteredPassword.trim() === '') {
      errors.reenteredPassword = 'Please re-enter your password';
    } else if (password !== reenteredPassword) {
      errors.reenteredPassword = 'Password do not match';
    }

     // Set the errors state
    setErrors(errors);

    // Return true if no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    if (validateForm()) {
      // Perform account creation logic
      console.log(`First Name: ${firstName}`);
      console.log(`Last Name: ${lastName}`);
      console.log(`Address: ${address}`);
      console.log(`User Name: ${userName}`);
      console.log(`Password: ${password}`);
      console.log(`Email: ${email}`);

      // Reset form fields and states
      const user = {
        firstName,
        lastName,
        address,
        userName,
        password,
        email,
      };

      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
            username: email,
            password: password
        }),
        headers:{
            "Content-type": "application/json; charset=utf-8",
        },
      };
      try{
          const response = await fetch("http://localhost:1339/users/register", requestOptions);
          const result = await response.json();
          if (response.status === 400) {
              navigate("/", { state: { errorMessage: result.errorMessage } });
          }else if(response.status === 500){
              navigate("/systemerror", { state: { errorMessage : result.errorMessage}});
          }    
          else{
              console.log("Successfully created a new user");
          }
      } catch (err){
          navigate("/", { state: { errorMessage: "Id already exists" } });
      }

      try {
        // await userService.createUser(user);

        // Reset form fields
        setFirstName('');
        setLastName('');
        setAddress('');
        setUserName('');
        setPassword('');
        setReenteredPassword('');
        setEmail('');
        setErrors({});
        setSuccess(true);
      } catch(error){
        console.log('Error storing user data: ', error);
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '50px 0px 50px 0px',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#ccc',
          padding: '20px',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Create Account</h1>
        {success  && <p style={{ color: 'green'}}>Account created successfully!</p>}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <label style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              style={{ marginTop: '5px' }}
            />
            {errors.firstName && <span style={{ color: 'red', fontSize: '10px' }}>{errors.firstName}</span>}
          </label>
          <label style={{ display: 'flex', flexDirection: 'column' }}>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              style={{ marginTop: '5px' }}
            />
            {errors.lastName && <span style={{ color: 'red', fontSize: '10px' }}>{errors.lastName}</span>}
          </label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            Address:
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              style={{ marginTop: '5px' }}
            />
            {errors.address && <span style={{ color: 'red', fontSize: '10px' }}>{errors.address}</span>}
          </label>
          <label style={{ display: 'flex', flexDirection: 'column' }}>
            User Name:
            <input
              type="text"
              value={userName}
              onChange={handleUserNameChange}
              style={{ marginTop: '5px' }}
            />
            {errors.userName && <span style={{ color: 'red', fontSize: '10px' }}>{errors.userName}</span>}
          </label>
        </div>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            style={{ marginTop: '5px' }}
          />
          {errors.email && <span style={{ color: 'red', fontSize: '10px' }}>{errors.email}</span>}
        </label>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              style={{ marginTop: '5px' }}
            />
            {errors.password && <span style={{ color: 'red', fontSize: '10px' }}>{errors.password}</span>}
          </label>
          <label style={{ display: 'flex', flexDirection: 'column' }}>
            Re-enter Password:
            <input
              type="password"
              value={reenteredPassword}
              onChange={handleReenteredPasswordChange}
              style={{ marginTop: '5px' }}
            />
            {errors.reenteredPassword && <span style={{ color: 'red', fontSize: '10px' }}>{errors.reenteredPassword}</span>}
          </label>
        </div>
        <br />
        <div
          style={{ display: 'flex', justifyContent: 'center', marginLeft: '-10px' }}
        >
          <button type="submit" class="button-arounder">Create Account</button>
          <span style={{ margin: '0px 10px' }}> or </span>
          <Link to="/login" style={{ marginLeft: '10px' }}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateAccountPage;
