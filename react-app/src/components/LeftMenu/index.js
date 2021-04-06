import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import PlaylistModal from '../PlaylistModal';
import { getUserFollowedPls, getUserPls } from '../../store/playlists';
import library from '../../images/library.png';
import './LeftMenu.css';

const LeftMenu = ({ authenticated }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [showModal, setShowModal] = useState(false);
  const userPls = useSelector(state => state.playlists.userPls);
  const following = useSelector(state => state.playlists.following);

  useEffect(() => {
    if (user) {
      dispatch(getUserFollowedPls(user.id))
      dispatch(getUserPls(user.id))
    }
  }, [user, dispatch])

  // useEffect(() => {
  //   dispatch(getUserPls(user.id))
  //   setPls(allUserPls)
  // }, [allUserPls, pls, user])


  return (
    <div className="lm-container">
      <div className="lm-logo">
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
          <p><i className="fas fa-search" />Search</p>
        </div>
        <div className="lm-nav-library">
          <img src={library} alt="library" />
          <p>Library</p>
        </div>
      </div>
      <div
        onClick={() => setShowModal(true)}
        id="create-playlist-modal"
        className="lm-create-pl"
      >
        <div className="lm-create-pl-plus">+</div>
        <p>Create Playlist</p>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PlaylistModal setShowModal={setShowModal}/>
        </Modal>
      )}
      <div className="lm-liked">
        <div className="lm-liked-heart">
          <i className="fas fa-heart" />
        </div>
        <p>Liked Songs</p>
      </div>
      <div className="lm-user-pls">
        <div className="lm-user-owned-pls-title">
          <p>YOUR PLAYLISTS</p>
        </div>
        <div className="lm-user-owned-pls">
          {userPls?.map(pl => (
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
