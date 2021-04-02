import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPlaylist } from '../../store/playlists';

const PlaylistModal = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const [name, setName] = useState("");

  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = {
      name,
      user_id: user.id
    }
    const newPlaylist = await dispatch(createPlaylist(submission));
    // return history.push(`/playlists/${newPlaylist.id}`)
  }

  return (
    <div className="create-pl-container">
      <h1>Create Playlist</h1>
      <div className="create-pl-form">
        <form>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleSubmit}>CREATE</button>
        </form>
      </div>
    </div>
  )
}

export default PlaylistModal;
