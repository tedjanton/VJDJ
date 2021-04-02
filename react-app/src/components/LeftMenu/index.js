import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserPls } from '../../store/playlists';
import './LeftMenu.css';

const LeftMenu = ({ authenticated }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const userPls = useSelector(state => state.playlists.userPls)

  useEffect(() => {
    if (user) {
      dispatch(getUserPls(user.id))
    }
  }, [user, dispatch])


  return (
    <div className="lm-container">
      <div className="lm-logo">
        <h2>VJDJ</h2>
      </div>
      <div className="lm-nav-buttons">
        <div className="lm-nav-home">
          <NavLink to='/home'>
            <i className="fas fa-home"
            />Home
          </NavLink>
        </div>
        <div className="lm-nav-search">
          <p><i className="fas fa-search" />Search</p>
        </div>
      </div>
      <div className="lm-create-pl">
        <p>Create Playlist</p>
        <p>Liked Songs</p>
      </div>
      <div className="lm-user-pls">
      {userPls?.map(pl => (
        <NavLink
          to={`/playlists/${pl.id}`}
          key={pl.id}
          className="lm-user-pl">
          {pl.name}
        </NavLink>
      ))}
      </div>
    </div>
  )
}

export default LeftMenu;
