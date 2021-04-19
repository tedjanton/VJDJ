import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { AppWithContext } from '../../App';
import { addFollow, unfollow, editPlaylist, deletePlaylist, getUserPls, getPlaylist } from '../../store/playlists';
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
  setIsUserPlaylist,
  setList,
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
    if (playlist?.user.id === user?.id) return;

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
    const submission = dragAndDrop.updatedOrder.map(({track}, i) => {
      return {
        track_id: track.id,
        order_num: i + 1,
      }
    });
    await dispatch(editPlaylist(submission, playlist.id))
    await dispatch(getPlaylist(playlist.id))
    setEditState(null);
    setOpenMenu(false);
    setDraggable(false);
  }

  const cancelEdits = () => {
    setList(dragAndDrop.originalOrder)
    setEditState(null);
    setOpenMenu(false);
    setDraggable(false);
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
            onClick={() => setOpenMenu(!openMenu)}>
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
