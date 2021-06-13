import React from 'react';
import { NavLink } from 'react-router-dom';
import './PlaylistAddSongs.css';

/*
Directs users to the library to find more songs to add to
a playlist
*/

const AddSongsModal = () => {

  return (
    <div className="add-songs-modal-container">
      <h1>Add Songs</h1>
      <p className="add-songs-modal-text">
        Browse the Library to find songs by artist, album, or playlist.
        Hover over any song and click on the "•••" to add that song to any of your playlists.
      </p>
      <NavLink className="add-songs-modal-to-lib" to="/library/playlists">Go to Library</NavLink>
    </div>
  )
};

export default AddSongsModal;
