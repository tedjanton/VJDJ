import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { addFollow, unfollow, editPlaylist, deletePlaylist, getUserPls, getPlaylist } from '../../store/playlists';
import { playlistImageBuilder } from '../../utils';
import DeleteModal from '../DeleteModal';
import PlaylistAddSongs from './PlaylistAddSongs';

const PlaylistActions = ({
  playlist,
  following,
  user,
  setDraggable,
  setEditStyleState,
  dragAndDrop,
  isUserPlaylist,
  setIsUserPlaylist,
  setTrackList,
  setImages,
}) => {
  const [isPlaylistMenuOpen, setIsPlaylistMenuOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAddSongsModal, setShowAddSongsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  // Cancels all editing state if user goes to another page
  useEffect(() => {
    if (isPlaylistMenuOpen) {
      cancelEdits()
    }
  }, [params.id])

  // Manages heart button appearance on non-user owned playlists
  useEffect(() => {
    let followIds = following?.map(pl => pl.id);
    if (followIds?.includes(playlist?.id)) setIsFollowing(true);
    else setIsFollowing(false);
  }, [setIsFollowing, following, playlist])

  // Tracks if a playlist is owned by the user
  useEffect(() => {
    if (!user?.errors) {
      if (playlist?.user.id === user.id) {
        setIsUserPlaylist(true);
      } else {
        setIsUserPlaylist(false);
        cancelEdits();
      }
    }
    // eslint-disable-next-line
  }, [playlist, user, setIsUserPlaylist]);

  const handleFollowOrAdd = () => {
    if (isUserPlaylist) {
      setShowAddSongsModal(true);
    } else {
      const submission = { userId: user.id, playlistId: playlist.id };
      if (isFollowing) dispatch(unfollow(submission));
      else dispatch(addFollow(submission));
    }
  };

  const showEditingState = () => {
    setDraggable(true);
    setEditStyleState("#1c1c1c");
    setShowEditMenu(false);
  };

  const togglePlaylistMenu = () => {
    if (isPlaylistMenuOpen) {
      cancelEdits();
    } else {
      setIsPlaylistMenuOpen(true);
      setShowEditMenu(true);
    }
  };

  const submitEdits = async () => {
    const submission = dragAndDrop.updatedOrder.map((plTrack, i) => {
      return {
        pl_track_id: plTrack.id,
        order_num: i + 1,
      }
    });
    await dispatch(editPlaylist(submission, playlist.id));
    let pl = await dispatch(getPlaylist(playlist.id));
    setImages(playlistImageBuilder(pl));
    setEditStyleState(null);
    setIsPlaylistMenuOpen(false);
    setDraggable(false);
  };

  const cancelEdits = () => {
    if (dragAndDrop.originalOrder.length) {
      setTrackList(dragAndDrop.originalOrder)
    }
    setEditStyleState(null);
    setIsPlaylistMenuOpen(false);
    setDraggable(false);
  }

  const handleDelete = async () => {
    await dispatch(deletePlaylist(playlist.id));
    await dispatch(getUserPls(user.id));
    return history.push('/home');
  };

  return (
    <div className="pl-bottom-header-left">
      <div onClick={handleFollowOrAdd} className="pl-like-button">
      {isUserPlaylist ? (
        <i className="fas fa-plus" />
      ) : (
        <>
          {isFollowing ? (
            <i className="pl fas fa-heart" />
          ) : (
            <i className="pl far fa-heart" />
          )}
        </>
      )}
      </div>
      {showAddSongsModal && (
        <Modal onClose={() => setShowAddSongsModal(false)}>
          <PlaylistAddSongs />
        </Modal>
      )}
      {isUserPlaylist && (
        <div
          className="pl-dot-menu"
          onClick={togglePlaylistMenu}>
          <i className="pl fas fa-ellipsis-h" />
        </div>
      )}
      {isPlaylistMenuOpen && (
        <>
        {showEditMenu ? (
          <div className="pl-menu-box">
            <div className="pl-edit-button">
              <button onClick={showEditingState}>Edit Playlist</button>
            </div>
            <div className="pl-delete-button">
              <button onClick={() => setShowDeleteModal(true)}>Delete Playlist</button>
            </div>
            <div className="pl-cancel-button">
              <button onClick={cancelEdits}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="pl-edit-cancel-container">
            <div className="pl-edit-confirm-button">
              <button onClick={submitEdits}>Confirm</button>
            </div>
            <div className="pl-edit-cancel-button">
              <button onClick={cancelEdits}>Cancel</button>
            </div>
          </div>
        )}
        </>
      )}
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteModal
            setShowDeleteModal={setShowDeleteModal}
            setIsPlaylistMenuOpen={setIsPlaylistMenuOpen}
            handleDelete={handleDelete}
            item={playlist}
          />
        </Modal>
      )}
    </div>

  )
};

export default PlaylistActions;
