import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPlaylist, getUserPls } from '../../store/playlists';
import './PlaylistModal.css';

/*
Creates a new playlist
*/

const PlaylistModal = ({ setShowCreatePlaylistModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = { name, user_id: user.id };
    const newPlaylist = await dispatch(createPlaylist(submission));
    setShowCreatePlaylistModal(false)
    await dispatch(getUserPls(user.id))
    return history.push(`/playlists/${newPlaylist.id}`)
  };

  return (
    <div className="create-pl-container">
      <h1>Create Playlist</h1>
      <div>
        <form onSubmit={handleSubmit} className="create-pl-form">
          <input
            autoComplete="off"
            className="input-box"
            name="name"
            type="text"
            placeholder="Enter playlist name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit" className="input-button">
            <i className="fas fa-plus" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default PlaylistModal;
