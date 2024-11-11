import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Add Routes here
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import AboutMe from './components/pages/AboutMe'; // Your AboutMe component
import Projects from './components/pages/Projects'; // Your Projects component
import Chat from './components/pages/Chatbox'


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes> {/* Use <Routes> instead of <Switch> */}
          <Route path='/' element={<Home />} /> {/* Use element prop instead of component */}
          <Route path='/services' element={<Services />} />
          <Route path='/products' element={<Products />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/aboutme' element={<AboutMe />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
