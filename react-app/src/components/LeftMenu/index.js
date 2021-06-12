import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import AppWithContext from '../../context/AppWithContext';
import { Modal } from '../../context/Modal';
import { getUserFollowedPls, getUserPls } from '../../store/playlists';
import library from '../../images/library.png';
import PlaylistModal from '../PlaylistModal';
import ComingSoon from '../ComingSoon';
import './LeftMenu.css';

const LeftMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const userPls = useSelector(state => state.playlists.userPls);
  const following = useSelector(state => state.playlists.following);
  const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const {
    isBrowsing,
    setIsBrowsing,
    setIsPlaylistMenuOpen
  } = useContext(AppWithContext);

  // If user is logged in, get their playlists from the database
  useEffect(() => {
    if (user) {
      dispatch(getUserFollowedPls(user.id))
      dispatch(getUserPls(user.id))
    }
  }, [user, dispatch]);

  const comingSoon = () => {
    setShowComingSoon(true);
    setTimeout(() => {
      setShowComingSoon(false);
    }, 2900)
  }

  return (
    <div className="lm-container">
      <div onClick={() => history.push("/")} className="lm-logo">
        <i className="fab fa-spotify" />
        <div className="lm-logo-title">
          <span className="v">V</span>
          <span className="j">J</span>
          <span className="d">D</span>
          <span className="j">J</span>
        </div>
      </div>
      <div className="lm-nav-buttons">
        <div className="lm-nav-home">
          <NavLink activeClassName="nav-active active" to='/home'>
            <i className="fas fa-home"/>Home
          </NavLink>
        </div>
        <div className="lm-nav-search">
          <NavLink activeClassName="nav-active active" to="/search">
            <i className="fas fa-search" />Search
          </NavLink>
        </div>
        <div className="lm-nav-library">
          <NavLink
            onClick={() => setIsBrowsing(true)}
            className={ isBrowsing ? "nav-active active" : ""}
            activeClassName="nav-active active"
            to='/library/playlists'
          ><img src={library} alt="library" />Library
          </NavLink>
        </div>
      </div>
      <div
        onClick={() => setShowCreatePlaylistModal(true)}
        id="create-playlist-modal"
        className="lm-create-pl"
      >
        <div className="lm-create-pl-plus">+</div>
        <p>Create Playlist</p>
      </div>
      {showCreatePlaylistModal && (
        <Modal onClose={() => setShowCreatePlaylistModal(false)}>
          <PlaylistModal setShowCreatePlaylistModal={setShowCreatePlaylistModal}/>
        </Modal>
      )}
      <div onClick={comingSoon} className="lm-liked">
        <div className="lm-liked-heart">
          <i className="fas fa-heart" />
        </div>
        <p>Liked Songs</p>
      </div>
      {showComingSoon && (
        <ComingSoon />
      )}
      <div onClick={() => setIsPlaylistMenuOpen(false)} className="lm-user-pls">
        <div className="lm-user-owned-pls-title">
          <p>YOUR PLAYLISTS</p>
        </div>
        <div className="lm-user-owned-pls">
          {userPls && userPls.map(pl => (
            <div key={pl.id} className="lm-user-pl-container">
              <NavLink
                to={`/playlists/${pl.id}`}
                className="lm-user-pl"
                activeClassName="lm-user-pl-active">
                {pl.name}
              </NavLink>
            </div>
          ))}
        </div>
        <div className="lm-user-followed-pls-title">
          <p>FOLLOWED PLAYLISTS</p>
        </div>
        <div className="lm-user-followed-pls">
          {following?.map(pl => (
            <div key={pl.id} className="lm-user-pl-container">
              <NavLink
                to={`/playlists/${pl.id}`}
                className="lm-user-pl"
                activeClassName="lm-user-pl-active">
                {pl.name}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeftMenu;
