import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoggedInContext } from "../components/App";
import "../style.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email.trim() === "") {
      setEmailError("Email is required");
      return;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      return;
    }

    // Perform email and password validation here
    // You can use your MongoDB integration to check if the email exists and the password matches



    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        username: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
    };
    try {
      const response = await fetch("http://localhost:1339/session/login", requestOptions);
      if (response.status === 200) {
        // Assuming the validation is successful
        console.log(`Email: ${email} Password: ${password}`);
        setIsLoggedIn(true);
          const result = await response.json();
          console.log(result.id);
          localStorage.setItem("userId", result.id);
        navigate("/existing-projects");
      } else {
        setIsLoggedIn(false);
        navigate("/", { state: { errorMessage: "This user does not exist!" } });
      }
    } catch (err) {
      navigate("/", { state: { errorMessage: "An error occured: try again!" } });
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "50px 0px 50px 0px"
        }}
      >
        <form
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
          }}
          onSubmit={handleSubmit}
        >
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <label style={{ display: "block", width: "250px" }}>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} style={{ width: "100%" }} />
            {emailError && <span style={{ color: "red" }}>{emailError}</span>}
          </label>
          <br />
          <label style={{ display: "block", width: "250px" }}>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              style={{ width: "100%" }}
            />
            {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}
          </label>
          <br />
          <div style={{ display: "flex", justifyContent: "center", marginLeft: "-10px" }}>
            <button type="submit" class="button-arounder">Login</button>
            <span style={{ margin: "0px 10px" }}> or </span>
            <Link to="/create-account" style={{ marginLeft: "10px" }}>Create Account</Link>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <Link to="/profile" style={{ marginLeft: "10px" }}>Forgot your password?</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
