import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorExtractor } from 'react-color-extractor';
import { useParams } from 'react-router-dom';
import playlist_placeholder from '../../images/playlist_placeholder.png';
import { AppWithContext } from '../../App';
import TrackListing from '../TrackListing';
import { formatTrack } from '../../utils';
import { addFollow, unfollow, editPlaylist, getPlaylist } from '../../store/playlists';
import './PlaylistDetail.css';

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
}

const PlaylistDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const playlist = useSelector(state => state.playlists.selected?.playlist);
  const tracks = useSelector(state => state.playlists.selected?.tracks);
  const following = useSelector(state => state.playlists.following)
  const user = useSelector(state => state.session.user);
  const [images, setImages] = useState([]);
  const [colors, getColors] = useState([]);
  const [draggable, setDraggable] = useState(false);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState)
  const [list, setList] = useState();
  const [openMenu, setOpenMenu] = useState(false);
  const [editState, setEditState] = useState(null);
  const [isUserPlaylist, setIsUserPlaylist] = useState()
  const [isPlaylistPlaying, setIsPlaylistPlaying] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const {
    inBrowse,
    setInBrowse,
    setTrackQueue,
    isPlaying,
    setIsPlaying,
    setTrackIdx,
    paramsRef,
  } = useContext(AppWithContext)

  const removeBackground = (e) => {
    document.getElementById("nav-home").classList.remove("browser")
  }

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
    removeBackground()
  }, [])

  useEffect(() => {
    if (!user?.errors) {
      setIsUserPlaylist(playlist?.user.id === user.id)
    }
  }, [playlist, user])

  useEffect(() => {
    setList(tracks);
  }, [tracks])

  useEffect(() => {
    setInBrowse(false)
  }, [inBrowse])

  useEffect(() => {
    (async() => {
      let pl = await dispatch(getPlaylist(params.id))
      let imgs = [];
      if (pl.tracks) {
        for (let i = 0; i < pl.tracks.length; i++) {
          imgs.push(pl.tracks[i].track.album.art_src);
        }
      }
      let square = imgs.filter((img, i) => i < 4)
      setImages(square);
    })();
  }, [dispatch, params])

  const addToQueue = () => {
    setTrackQueue([])
    let formatted = tracks.map(track => formatTrack(track.track))
    setTrackIdx(1);
    setTrackQueue(formatted);
    setTrackIdx(0);
    setIsPlaying(true);
    paramsRef.current = params.id;
  }

  const onDragStart = (e) => {
    const initialPosition = Number(e.currentTarget.dataset.position)
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    })
    e.dataTransfer.setData('text/html', '');
  }

  const onDragOver = (e) => {
    e.preventDefault();
    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(e.currentTarget.dataset.position);
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter((track, i) => i !== draggedFrom);
    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo)
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo
      })
    }
  }

  const onDrop = () => {
    setList(dragAndDrop.updatedOrder);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false
    });
  };

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

  return (
    <div className="pl-page-container" style={{ backgroundColor: `${colors[3]}80`}}>
      <div className="pl-header-container">
        <div className="pl-header-image-container">
        {images.length < 4 ? (
          <div className="pl-image placeholder">
            <img src={playlist_placeholder} alt="placeholder" />
          </div>

        ) : (
          <>
          {images?.map((image, i) => (
            <div key={i} className="pl-image">
              <ColorExtractor getColors={(c) => getColors(c)}>
                <img src={image} alt="art" />
              </ColorExtractor>
            </div>
          ))}
          </>
        )}
        </div>
        <div className="pl-header-details-container">
          <div className="pl-header-playlist">
            <p>PLAYLIST</p>
          </div>
          <div className="pl-header-name">
            <h2>{playlist?.name}</h2>
          </div>
          <div className="pl-subheader">
            <div className="pl-user-name">
              <p>{`${playlist?.user.firstName} ${playlist?.user.lastName} •`}</p>
            </div>
            <div className="pl-num-songs">
              <p>{`${tracks?.length} ${tracks?.length === 1 ? "song" : "songs" }`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-bottom-container">
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
                  <button>Delete Playlist</button>
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
        <div className="pl-table-container">
          <div className="pl-table-header">
            <div className="pl-header-num-title-container">
              <div className="pl-header-track-num">
                <p>#</p>
              </div>
              <div className="pl-header-title">
                <p>TITLE</p>
              </div>
            </div>
            <div className="pl-header-album">
              <p>ALBUM</p>
            </div>
            <div className="pl-header-vid">
              <p>VIDEO</p>
            </div>
            <div className="pl-header-time">
              <i className="far fa-clock" />
            </div>
          </div>
        </div>
        <section>
          <div className="tracks-container" style={{backgroundColor: editState }}>
            {list?.map((track, i) => (
              <div
                data-position={i}
                key={track.id}
                draggable={draggable}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                className={editState && "track-draggable"}
              >
                <TrackListing
                  track={track}
                  trackList={list}
                  index={i}
                  playlist={playlist}
                  key={track.id}
                  isUserPlaylist={isUserPlaylist}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default PlaylistDetail;
