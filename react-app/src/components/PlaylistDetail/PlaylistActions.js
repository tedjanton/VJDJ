import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AppWithContext from '../../context/AppWithContext';
import { Modal } from '../../context/Modal';
import { addFollow, unfollow, editPlaylist, deletePlaylist, getUserPls, getPlaylist } from '../../store/playlists';
import { formatTrack, playlistImageBuilder } from '../../utils';
import DeleteModal from '../DeleteModal';
import PlaylistAddSongs from './PlaylistAddSongs';

const PlaylistActions = ({
  playlist,
  tracks,
  following,
  user,
  setDraggable,
  setEditState,
  editState,
  draggable,
  dragAndDrop,
  isUserPlaylist,
  setIsUserPlaylist,
  setTrackList,
  setImages,
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const [isPlaylistPlaying, setIsPlaylistPlaying] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    setTrackQueue,
    isPlaying,
    setIsPlaying,
    setTrackIdx,
    paramsRef
  } = useContext(AppWithContext)

  useEffect(() => {
    let followIds = following?.map(pl => pl.id);
    if (followIds?.includes(playlist?.id)) setIsFollowing(true);
    else setIsFollowing(false);
  }, [setIsFollowing, following, playlist])

  useEffect(() => {
    if (isPlaying && paramsRef.current === params.id) {
      setIsPlaylistPlaying(true);
    } else {
      setIsPlaylistPlaying(false);
    }
  }, [playlist, isPlaying, params, setIsPlaylistPlaying, paramsRef]);

  useEffect(() => {
    if (!user?.errors) {
      setIsUserPlaylist(playlist?.user.id === user.id)
    }
  }, [playlist, user, setIsUserPlaylist])

  const addToQueue = () => {
    if (isPlaylistPlaying && isPlaying) {
      setIsPlaylistPlaying(false);
      setIsPlaying(false);
    } else {
      setTrackQueue(tracks.map(track => formatTrack(track.track)));
      setTrackIdx(0);
      setIsPlaying(true);
      paramsRef.current = params.id;
    }
  }

  const handleFollow = () => {
    if (playlist.user.id === user.id) {
      setShowModal(true);
      return;
    }
    const submission = { userId: user.id, playlistId: playlist.id };
    if (isFollowing) dispatch(unfollow(submission));
    else dispatch(addFollow(submission));
  }

  const handleEdit = () => {
    setOpenMenu(false);
    setDraggable(true);
    setEditState("#1c1c1c");
  }

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
    setEditState(null);
    setOpenMenu(false);
    setDraggable(false);
  };

  const cancelEdits = () => {
    if (dragAndDrop.originalOrder.length) {
      setTrackList(dragAndDrop.originalOrder)
    }
    setEditState(null);
    setOpenMenu(false);
    setDraggable(false);
  }

  const handleDelete = async () => {
    await dispatch(deletePlaylist(playlist.id));
    await dispatch(getUserPls(user.id));
    return history.push('/home');
  }

  return (
    <div className="pl-bottom-header">
      <div className="pl-bottom-header-left">
        <div className="pl-music-play-buttons">
        {isPlaylistPlaying ? (
          <button
            type="button"
            className="pl-pause"
            aria-label="Pause"
            onClick={addToQueue}
          >
            <i className="pl fas fa-pause" />
          </button>
        ) : (
          <button
            type="button"
            className="pl-play"
            aria-label="Play"
            onClick={addToQueue}
          >
            <i className="pl fas fa-play" />
          </button>
        )}
        </div>
        <div onClick={handleFollow} className="pl-like-button">
        {playlist?.user.id === user?.id ? (
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
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <PlaylistAddSongs />
          </Modal>
        )}
        {isUserPlaylist && (
          <div
            className="pl-dot-menu"
            onClick={() => setOpenMenu(!openMenu)}>
            <i className="pl fas fa-ellipsis-h" />
          </div>
        )}
        {openMenu && (
          <div className="pl-menu-box">
            <div className="pl-edit-button">
              <button onClick={handleEdit}>Edit Playlist</button>
            </div>
            <div className="pl-delete-button">
              <button onClick={() => setShowDeleteModal(true)}>Delete Playlist</button>
            </div>
          </div>
        )}
        {showDeleteModal && (
          <Modal onClose={() => setShowDeleteModal(false)}>
            <DeleteModal
              setShowDeleteModal={setShowDeleteModal}
              setOpenMenu={setOpenMenu}
              handleDelete={handleDelete}
              item={playlist}
            />
          </Modal>
        )}
        {draggable && (
          <div className="pl-edit-cancel-container">
            <div className="pl-edit-confirm-button">
              <button onClick={submitEdits}>Confirm</button>
            </div>
            <div className="pl-edit-cancel-button">
              <button onClick={cancelEdits}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PlaylistActions;
