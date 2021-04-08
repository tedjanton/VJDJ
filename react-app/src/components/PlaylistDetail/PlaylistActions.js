import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { AppWithContext } from '../../App';
import { addFollow, unfollow, editPlaylist, deletePlaylist, getUserPls } from '../../store/playlists';
import { formatTrack } from '../../utils';

const PlayFollow = ({
  playlist,
  tracks,
  following,
  user,
  setDraggable,
  setEditState,
  draggable,
  dragAndDrop,
  isUserPlaylist,
  setIsUserPlaylist
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const [isPlaylistPlaying, setIsPlaylistPlaying] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const {
    setTrackQueue,
    isPlaying,
    setIsPlaying,
    setTrackIdx,
    paramsRef,
  } = useContext(AppWithContext)


  const handlePlaying = () => {
    if (isPlaying && paramsRef.current === params.id) {
      setIsPlaylistPlaying(true);
    } else {
      setIsPlaylistPlaying(false);
    }
  }

  useEffect(() => {
    let followIds = following?.map(pl => pl.id);
    if (followIds?.includes(playlist?.id)) {
      setIsFollowing(true)
    } else {
      setIsFollowing(false);
    }
  })

  useEffect(() => {
    handlePlaying();
  }, [playlist, isPlaying, tracks, params, handlePlaying]);

  useEffect(() => {
    if (!user?.errors) {
      setIsUserPlaylist(playlist?.user.id === user.id)
    }
  }, [playlist, user])

  const addToQueue = () => {
    setTrackQueue([])
    let formatted = tracks.map(track => formatTrack(track.track))
    setTrackIdx(1);
    setTrackQueue(formatted);
    setTrackIdx(0);
    setIsPlaying(true);
    paramsRef.current = params.id;
  }

  const playlistMenu = () => {
    setOpenMenu(!openMenu)
  }

  const handleFollow = () => {
    if (playlist?.user.id === user?.id) return;
    const submission = { userId: user.id, playlistId: playlist.id }
    if (isFollowing) {
      dispatch(unfollow(submission))
    } else {
      dispatch(addFollow(submission))
    }
  }

  const handleEdit = () => {
    setOpenMenu(false);
    setDraggable(true);
    setEditState("#1c1c1c");
  }

  const submitEdits = () => {
    const submission = dragAndDrop.updatedOrder.map(({track}, i) => {
      return {
        track_id: track.id,
        order_num: i + 1,
      }
    })
    dispatch(editPlaylist(submission, playlist.id))
    setEditState(null);
    window.location.reload();
  }

  const cancelEdits = () => {
    window.location.reload();
  }

  const handleDelete = async () => {
    window.confirm(`Are you sure you would like to delete ${playlist.name}?`);
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
          <i className="pl fas fa-heart" />
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
        {isUserPlaylist && (
          <div
            className="pl-dot-menu"
            onClick={playlistMenu}>
            <i className="pl fas fa-ellipsis-h" />
          </div>
        )}
        {openMenu && (
          <div className="pl-menu-box">
            <div className="pl-add-songs-button">
              <button>Add Songs</button>
            </div>
            <div className="pl-edit-button">
              <button onClick={handleEdit}>Edit Playlist</button>
            </div>
            <div className="pl-delete-button">
              <button onClick={handleDelete}>Delete Playlist</button>
            </div>
          </div>
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

export default PlayFollow;