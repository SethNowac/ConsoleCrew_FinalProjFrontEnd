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

/**
 * Main component of the application that sets up the routing for the different pages.
 * @returns {JSX.Element} The JSX element that contains the application layout and routing.
 */
function App() {
  return (
    <div>
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
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;