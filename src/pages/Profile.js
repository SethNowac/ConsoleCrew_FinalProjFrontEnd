import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.trim() === '') {
      setEmailError('Email is required');
      return;
    }

    if (oldPassword.trim() === '') {
      setPasswordError('Old Password is required');
      return;
    }

    // Perform email and password validation here
    // You can use your MongoDB integration to check if the email exists and the password matches

    // Assuming the validation is successful
    console.log(`Email: ${email} Old Password: ${oldPassword} New Password: ${newPassword} Confirm Password: ${confirmPassword}`);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
    setPasswordError('');
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '50px 0px 50px 0px'
        }}
      >
        <form
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '5px',
          }}
          onSubmit={handleSubmit}
        >
          <h1 style={{ textAlign: 'center' }}>Profile</h1>
          <label style={{ display: 'block', width: '250px' }}>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} style={{ width: '100%' }} />
            {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
          </label>
          <br />
          <label style={{ display: 'block', width: '250px' }}>
            Old Password:
            <input
              type="password"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              style={{ width: '100%' }}
            />
            {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
          </label>
          <br />
          <label style={{ display: 'block', width: '250px' }}>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              style={{ width: '100%' }}
            />
          </label>
          <br />
          <label style={{ display: 'block', width: '250px' }}>
            Confirm New Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              style={{ width: '100%' }}
            />
          </label>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '-10px' }}>
            <button type="submit">Confirm Changing</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProfilePage;