import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPlaylist, getUserPls } from '../../store/playlists';
import './PlaylistModal.css';

const PlaylistModal = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length) {
      const submission = { name, user_id: user.id };
      const newPlaylist = await dispatch(createPlaylist(submission));
      setShowModal(false)
      await dispatch(getUserPls(user.id))
      return history.push(`/playlists/${newPlaylist.id}`)
    } else {
      window.alert("You must enter a name to create a playlist!")
    }
  };

  return (
    <div className="create-pl-container">
      <h1>Create Playlist</h1>
      <div>
        <form className="create-pl-form">
          <input
            autoComplete="off"
            className="input-box"
            name="name"
            type="text"
            placeholder="Enter playlist name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <button className="input-button" onClick={handleSubmit}>
            <i className="fas fa-plus" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default PlaylistModal;
