import React from "react";
import {Outlet} from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * MainLayout component
 * Renders the Header, Outlet, and Footer components.
 * @returns {JSX.Element} MainLayout component JSX code
 */
function MainLayout() {
   return <div>
            <Header />
            <Outlet />
            <Footer />	
	
          </div>
}   

export default MainLayout;