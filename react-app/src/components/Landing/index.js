import React from 'react';
import { Redirect } from "react-router-dom";
import "./Landing.css";


const Landing = ({ setNav, authenticated }) => {
  setNav(true);

  if (authenticated) {
    return <Redirect to="/home" />
  }

  return (
    <div className="landing-background-container">
      <div className="landing-content-container">
        <div className="landing-title-start">
          <h1>Listening</h1>
        </div>
        <div className="landing-title-watch">
          <h1><span className="landing-title-and">and </span>watching</h1>
        </div>
        <div className="landing-title-end">
          <h1>is everything</h1>
        </div>
      </div>
    </div>
  )
}

export default Landing;
