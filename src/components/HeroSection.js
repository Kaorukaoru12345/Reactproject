import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>MY PORTFOLIO</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          to='/aboutme' // Set the link to /aboutme
        >
          ABOUT ME
        </Button>
        <Button 
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          to='/projects' // Set the link to /projects
        >
          MY PROJECTS<i />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
