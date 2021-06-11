import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppWithContext from '../../context/AppWithContext';
import { Modal } from '../../context/Modal';
import { addToPlaylist, deleteFromPlaylist } from '../../store/playlists';
import { playlistImageBuilder } from '../../utils';
import DeleteModal from '../DeleteModal';
import './TrackListing.css';

/*
This component handles all actions when a user clicks on the
ellipsis on the right side of the Track Listing
*/

const TrackActions = ({
  isUserPlaylist,
  setAddMenu,
  addMenu,
  setShowUserOptions,
  showUserOptions,
  track,
  playlist,
  index,
  setImages,
  setIsHover,
  isHover,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const userPls = useSelector(state => state.playlists.userPls)
  const { setConfirmedBox } = useContext(AppWithContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Clears hovering and editing state if Delete Modal is open
  useEffect(() => {
    if (showDeleteModal) {
      setIsHover(false)
      setShowUserOptions(false)
    }
  })

  // Opens the user options menu when the ellipsis is clicked
  // and skips the "delete" option if not the user's playlist
  const handleUserOptionsMenu = () => {
    if (!isUserPlaylist) setAddMenu(true);
    setShowUserOptions(true);
  }

  // Deletes song from playlist and rerenders image collage
  const handleDelete = async () => {
    const selection = {
      track_id: track.id,
      playlist_id: playlist.id,
      order_num: index + 1,
    }
    let pl = await dispatch(deleteFromPlaylist(selection));
    setImages(playlistImageBuilder(pl));
  };

  // Adds track to the selected user's playlist
  const addTrack = (pl) => {
    const submission = {
      track_id: track.id,
      playlist_id: pl.id,
    };
    dispatch(addToPlaylist(submission, user.id))
    setShowUserOptions(false);
    setConfirmedBox(true);
    setIsHover(false);
  };

  return (
    <>
      {isHover && (
        <div onClick={handleUserOptionsMenu} className="track-edit">
          <i className="tl fas fa-ellipsis-h" />
        </div>
      )}
      {showUserOptions && isHover && isUserPlaylist && (
        <div className="tl-edit-menu">
          <div className="tl-delete-button">
            <button onClick={() => setShowDeleteModal(true)}>Delete</button>
          </div>
          <div className="tl-add-to-button">
            <button onClick={() => setAddMenu(true)}>Add to Playlist</button>
          </div>
          <div className="tb-add-box-container">
          {addMenu && (
            <div className="tb-add-box">
              <p className="tb-add-title">Add track to:</p>
              {userPls?.map(pl => (
                <div key={pl.id} className="tb-add-pl">
                  <button onClick={() => addTrack(pl)}>{pl.name}</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      )}
      {showUserOptions && isHover && !isUserPlaylist && (
        <div className="tl-edit-menu-not-user">
          <div className="tb-add-box-container not-user">
          {addMenu && (
            <div className="tb-add-box">
              <p className="tb-add-title">Add track to:</p>
              {userPls?.map(pl => (
                <div key={pl.id} className="tb-add-pl">
                  <button onClick={() => addTrack(pl)}>{pl.name}</button>
                </div>
              ))}
            </div>
          )}
          </div>
        </div>
      )}
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteModal
            setShowDeleteModal={setShowDeleteModal}
            setOpenMenu={setShowUserOptions}
            setShowUserOptions={setShowUserOptions}
            handleDelete={handleDelete}
            item={track}
          />
        </Modal>
      )}
    </>
  )
}

export default TrackActions;
