import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { deleteFromPlaylist } from '../../store/playlists';
import { playlistImageBuilder } from '../../utils';
import AddToPlaylistMenu from '../AddToPlaylistMenu';
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
            <AddToPlaylistMenu
              setShowUserOptions={setShowUserOptions}
              setIsHover={setIsHover}
              track={track}
            />
          )}
        </div>
      </div>
      )}
      {showUserOptions && isHover && !isUserPlaylist && (
        <div className="tl-edit-menu-not-user">
          <div className="tb-add-box-container not-user">
          {addMenu && (
            <AddToPlaylistMenu
              setShowUserOptions={setShowUserOptions}
              setIsHover={setIsHover}
              track={track}
            />
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
