import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import "./components/App.js";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from "./components/ErrorBoundary";
import { ProjectProvider } from "./pages/ProjectContext";

ReactDOM.render(
  <Router>
    <ProjectProvider>
      <App />
    </ProjectProvider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
