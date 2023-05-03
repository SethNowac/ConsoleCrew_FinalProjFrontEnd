import './App.css';
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MainLayout from '../layouts/MainLayout';
import '../style.css';
import { UserError } from "../pages/UserError";
import { SystemError } from "../pages/SystemError";

/**
 * Main component of the application that sets up the routing for the different pages.
 * @returns {JSX.Element} The JSX element that contains the application layout and routing.
 */
function App() {
  return (
    <div>

      <Router>
        <Header />
        <Routes>
          <Route path="/" component={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="about/:employee" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/usererror" element={<UserError />} />
            <Route path="/systemerror" element={<SystemError />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
        <Footer />
      </Router>


    </div>
  );
}

export default App;