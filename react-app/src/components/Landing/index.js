import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import { login } from '../../store/session';
import "./Landing.css";

const Landing = ({ setNav, authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // Display landing page nav bar
  useEffect(() => setNav(true), [setNav])

  const onLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const user = await dispatch(login('demo@lition.com', "password"));
    if (!user.errors) {
      setNav(true);
      setAuthenticated(true);
      setIsLoading(false);
    }
  };

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
        <div className="landing-subheader">
          <p>Because why not have both in the same place?</p>
        </div>
      </div>
      <div className="landing-demo">
        {isLoading ? (
          <div className="loader">
            <div className="loader-spinner"></div>
          </div>
         ) : (
          <button onClick={(e) => onLogin(e)}>SIGN IN AS A GUEST</button>
         )}
      </div>
    </div>
  )
}

export default Landing;
