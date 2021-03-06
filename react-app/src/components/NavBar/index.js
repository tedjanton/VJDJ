import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UIContext from '../../context/UIContext';
import LogoutButton from './LogoutButton';
import './NavBar.css';

/*
Dynamically rendered nav bar depending on what page the
user is on
*/

const NavBar = ({ nav, authenticated, setAuthenticated }) => {
  const { isBrowsing } = useContext(UIContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const user = useSelector(state => state.session.user);

  // Handles user profile button appearance
  useEffect(() => {
    let button = document.getElementById("prof-button");
    if (!user?.errors && button) {
      if (showProfileMenu) button.classList.add("active-button");
      else button.classList.remove("active-button");
    }
  }, [showProfileMenu, user]);

  let links;
  if (authenticated) {
    // Loads profile button if user is authenticated and
    // shows nav bar if user is browsing the Library
    links = (
      <nav id="nav-home" className="nav-home-container">
        <div className="nav-browser">
          {isBrowsing && (
            <div className="lib-nav-buttons-container">
              <div className="lib-nav-playlist-button">
                <NavLink
                  activeClassName="nav nav-active-buttons"
                  to="/library/playlists">Playlists</NavLink>
              </div>
              <div className="lib-nav-artists-button">
                <NavLink
                  activeClassName="nav nav-active-buttons"
                  to="/library/artists">Artists</NavLink>
              </div>
              <div className="lib-nav-albums-button">
                <NavLink
                  activeClassName="nav nav-active-buttons"
                  to="/library/albums">Albums</NavLink>
              </div>
            </div>
          )}
        </div>
        <div className="nav-home">
          <button id="prof-button" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <i className="fas fa-user-circle" />
            {`${user?.firstName} ${user?.lastName}`}
            {!showProfileMenu ? (
              <i className="fas fa-sort-down" />
            ) : (
              <i className="fas fa-sort-up" />
            )}
          </button>
          {showProfileMenu && (
            <div className="nav-logout-button">
              <LogoutButton
                className="logout-button"
                setAuthenticated={setAuthenticated}
                setShowProfileMenu={setShowProfileMenu} />
            </div>
          )}
        </div>
      </nav>
    )
  } else if (!nav) {
    // Hides nav bar for sign up and log in pages
    links = (
      <nav className="nav-container-hidden">
      </nav>
    )
  } else {
    // Displays the landing page nav bar and options
    links = (
      <nav className="nav-container">
        <div className="lm-logo landing">
          <i className="fab fa-spotify" />
          <div className="lm-logo-title">
            <span className="v">V</span>
            <span className="j">J</span>
            <span className="d">D</span>
            <span className="j">J</span>
          </div>
      </div>
        <div className="nav-landing-container">
          <div>
            <a
              href="http://www.tedjanton.com/"
              target="_blank"
              rel="noopener noreferrer">About Me
            </a>
          </div>
          <div>
            <a
              href="https://github.com/tedjanton/VJDJ"
              target="_blank"
              rel="noopener noreferrer">GitHub
            </a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/ted-anton/"
              target="_blank"
              rel="noopener noreferrer">LinkedIn
            </a>
          </div>
          <div className="spacer"></div>
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
};

export default NavBar;
