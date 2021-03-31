import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = ({ nav, authenticated, setAuthenticated }) => {

  let links;
  if (authenticated) {
    links = (
      <nav className="nav-home-container">
        <div className="nav-home">
          <p>Profile Dropdown</p>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </div>
      </nav>
    )
  } else if (!nav) {
    links = (
      <nav className="nav-container-hidden">
      </nav>
    )
  } else {
    links = (
      <nav className="nav-container">
        <div className="nav-landing-container">
          <div>
            <p>About Me</p>
          </div>
          <div>
            <p>Github</p>
          </div>
          <div>
            <p>Linkedin</p>
          </div>
          <div>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink >
          </div>
          <div>
            <NavLink  to="/login" exact={true} activeClassName="active">
              Log In
            </NavLink >
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      {links}
    </>
  );
}

export default NavBar;
