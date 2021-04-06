import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AppWithContext } from '../../App';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = ({ nav, authenticated, setAuthenticated }) => {
  const { inBrowse, setInBrowse } = useContext(AppWithContext);

  console.log(inBrowse);

  useEffect(() => {
    setInBrowse(true);
  }, [inBrowse])

  let links;
  if (authenticated) {
    links = (
      <nav className="nav-home-container">
        <div className="nav-browser">
          {inBrowse && (
            <div className="lib-nav-buttons-container">
              <div className="lib-nav-playlist-button">
                <NavLink to="/library/playlists">Playlists</NavLink>
              </div>
              <div className="lib-nav-artists-button">
                <NavLink to="/library/artists">Artists</NavLink>
              </div>
              <div className="lib-nav-albums-button">
                <NavLink to="/library/playalbumslists">Albums</NavLink>
              </div>
            </div>
          )}
        </div>
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
            <a href="https://github.com/tedjanton/VJDJ">Github</a>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/ted-anton/">Linkedin</a>
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
}

export default NavBar;
