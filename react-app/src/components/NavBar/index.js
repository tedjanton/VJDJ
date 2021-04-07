import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppWithContext } from '../../App';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = ({ nav, authenticated, setAuthenticated }) => {
  const { inBrowse, setInBrowse } = useContext(AppWithContext);
  const [menu, setMenu] = useState(false);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    setInBrowse(true);
  }, [inBrowse, setInBrowse])

  useEffect(() => {
    if (!user.errors) {
      let button = document.getElementById("prof-button")
      if (menu) {
        button.classList.add("active-button");
      } else {
        button.classList.remove("active-button");
      }
    }
  }, [menu])

  const handleProfButton = () => {
    setMenu(!menu)
  }

  let links;
  if (authenticated) {
    links = (
      <nav id="nav-home" className="nav-home-container">
        <div className="nav-browser">
          {inBrowse && (
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
                  to="/library/playalbumslists">Albums</NavLink>
              </div>
            </div>
          )}
        </div>
        <div className="nav-home">
          <button id="prof-button" onClick={handleProfButton}>
            <i className="fas fa-user-circle"
            />{`${user?.firstName} ${user?.lastName}`}
            {!menu ? (
              <>
                <i className="fas fa-sort-down" />
              </>
            ) : (
              <>
                <i className="fas fa-sort-up" />
              </>
            )}</button>
          {menu && (
            <div className="nav-logout-button">
              <LogoutButton
                className="logout-button"
                setAuthenticated={setAuthenticated}
                setMenu={setMenu} />
            </div>
          )}
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
