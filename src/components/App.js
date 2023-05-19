import './App.css';
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MainLayout from '../layouts/MainLayout';
import '../style.css';
import { UserError } from "../pages/UserError";
import { SystemError } from "../pages/SystemError";
import LoginPage from "../pages/LoginPage";
import CreateAccountPage from '../pages/CreateAccountPage';
import ExistingProjectPage from "../pages/ExistingProjects";
import ManageProjectPage from "../pages/ManageProjects";
import { createContext, useEffect, useState } from 'react';
import ProfilePage from "../pages/Profile";
import backgroundImg from '../img/background.jpg';


const LoggedInContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

/**
 * Main component of the application that sets up the routing for the different pages.
 * @returns {JSX.Element} The JSX element that contains the application layout and routing.
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loggedInValueAndSetter = [isLoggedIn, setIsLoggedIn];

  useEffect(() => {
    async function checkForLoggedIn() {
      try {
        /** Call auth, passing cookies to the back-end */
        const response = await fetch("http://localhost:1339/session/auth", { method : "GET" });
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false); // may be unnecessary, but do this just in case to be more secure
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    }
    checkForLoggedIn();
  }, []);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <LoggedInContext.Provider value={loggedInValueAndSetter}>
        <Header />
        <Routes>
          <Route path="/" component={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="about/:employee" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/usererror" element={<UserError />} />
            <Route path="/systemerror" element={<SystemError />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage/>} />
            <Route path='/existing-projects' element={<ExistingProjectPage/>} />
            <Route path='/manage-projects' element={<ManageProjectPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </LoggedInContext.Provider>
    </div>
  );
}

export default App;
export {LoggedInContext};