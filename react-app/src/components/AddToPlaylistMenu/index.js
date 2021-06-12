import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AppWithContext from '../../context/AppWithContext';
import { addToPlaylist } from '../../store/playlists';

/*
Adds a track to a selected user-owned playlist.
*/

const AddToPlaylistMenu = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const userPls = useSelector(state => state.playlists.userPls);
  const { setConfirmedBox } = useContext(AppWithContext);

  const addTrack = (pl) => {
    const submission = {
      track_id: props.track.id,
      playlist_id: pl.id,
    };
    dispatch(addToPlaylist(submission, user.id));
    setConfirmedBox(true);
    if (props.setAddMenu) props.setAddMenu(false);
    if (props.setShowUserOptions) props.setShowUserOptions(false);
    if (props.setIsHover) props.setIsHover(false);
  };

  return (
    <div className="tb-add-box">
      <p className="tb-add-title">Add track to:</p>
      {userPls?.map(pl => (
        <div key={pl.id} className="tb-add-pl">
          <button onClick={() => addTrack(pl)}>{pl.name}</button>
        </div>
      ))}
    </div>
  )
};

export default AddToPlaylistMenu;
