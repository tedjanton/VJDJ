import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = ({ authenticated, setAuthenticated }) => {

  let links;
  if (authenticated) {
    links = (
      <div>
        <p>Profile Dropdown</p>
        <LogoutButton setAuthenticated={setAuthenticated} />
      </div>
    )
  } else {
    links = (
      <ul>
        <li>
          <p>About Me</p>
        </li>
        <li>
          <p>Github</p>
        </li>
        <li>
          <p>Linkedin</p>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Log In
          </NavLink>
        </li>
      </ul>
    )
  }


  return (
    <nav>
      {links}
    </nav>
  );
}

export default NavBar;
