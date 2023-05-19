import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../style.css";


/**
 * Component for the user profile page.
 * Allows users to update their email and password.
 */
function ProfilePage() {
  // State variables for email, old password, new password, confirm password, email error, and password error
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  /**
  * Handles form submission when the user clicks the "Confirm Changing" button.
  * Validates email and password fields and logs the entered values.
  * Performs email and password validation based on your MongoDB integration.
  * Assumes the validation is successful.
  * @param {Event} event - The form submit event.
  */
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

  /**
  * Handles changes in the email input field.
  * Updates the email state variable and clears the email error.
  * @param {Event} event - The input change event.
  */
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  /**
     * Handles changes in the old password input field.
     * Updates the old password state variable and clears the password error.
     * @param {Event} event - The input change event.
     */
  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
    setPasswordError('');
  };

  /**
   * Handles changes in the new password input field.
   * Updates the new password state variable.
   * @param {Event} event - The input change event.
   */
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  /**
   * Handles changes in the confirm password input field.
   * Updates the confirm password state variable.
   * @param {Event} event - The input change event.
   */
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
            <button type="submit" class="button-arounder">Confirm Changing</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProfilePage;