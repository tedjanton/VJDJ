import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppWithContext } from '../../App';
import { Modal } from '../../context/Modal';
import { addToPlaylist, deleteFromPlaylist } from '../../store/playlists';
import { playlistImageBuilder } from '../../utils';
import DeleteModal from '../DeleteModal';
import './TrackListing.css';

const TrackActions = ({
  isUserPlaylist,
  setAddMenu,
  setEditMenu,
  track,
  playlist,
  index,
  setImages,
  setIsHover,
  isHover,
  editMenu,
  addMenu,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const userPls = useSelector(state => state.playlists.userPls)
  const { setConfirmedBox } = useContext(AppWithContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (showDeleteModal) {
      setIsHover(false)
      setEditMenu(false)
    }
  })

  const handleUserPlaylist = () => {
    if (!isUserPlaylist) setAddMenu(true);
    setEditMenu(true);
  }

  const handleDelete = async () => {
    const selection = {
      track_id: track.id,
      playlist_id: playlist.id,
      order_num: index + 1,
    }
    let pl = await dispatch(deleteFromPlaylist(selection));
    setImages(playlistImageBuilder(pl));
  };

  const addTrack = (pl) => {
    const submission = {
      track_id: track.id,
      playlist_id: pl.id,
    };
    dispatch(addToPlaylist(submission, user.id))
    setEditMenu(false);
    setConfirmedBox(true);
    setIsHover(false);
  };

  return (
    <>
      {isHover && (
        <div onClick={handleUserPlaylist} className="track-edit">
          <i className="tl fas fa-ellipsis-h" />
        </div>
      )}
      {editMenu && isHover && isUserPlaylist && (
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
      {editMenu && isHover && !isUserPlaylist && (
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
            setOpenMenu={setEditMenu}
            setEditMenu={setEditMenu}
            handleDelete={handleDelete}
            item={track}
          />
        </Modal>
      )}
    </>
  )
}

export default TrackActions;
