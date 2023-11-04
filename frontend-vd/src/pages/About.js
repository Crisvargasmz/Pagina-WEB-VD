// About.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/App.css';

function About({rol}) {
  return(
    <div>
      <Header rol={rol}/>
      
    </div>
  );
}

export default About;