import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppWithContext } from '../../App';
import { Modal } from '../../context/Modal';
import { addToPlaylist, deleteFromPlaylist } from '../../store/playlists';
import { formatTrack } from '../../utils';
import VideoModal from '../VideoModal';
import './TrackListing.css';

const TrackListing = ({ track, trackList, index, playlist, isUserPlaylist }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const userPls = useSelector(state => state.playlists.userPls)
  const [isHover, setIsHover] = useState(false);
  const [isTrackPlaying, setIsTrackPlaying] = useState(false);
  const [editMenu, setEditMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addMenu, setAddMenu] = useState(false);
  const {
    setTrackQueue,
    isPlaying,
    setIsPlaying,
    setTrackIdx,
    trackRef,
    setConfirmedBox
  } = useContext(AppWithContext)

  useEffect(() => {
    if (showModal) {
      setIsPlaying(false);
      setIsHover(false);
    }
  }, [showModal, setIsPlaying, isHover, setIsHover]);

  useEffect(() => {
    if (trackRef.current?.id === track.id) {
      setIsTrackPlaying(true);
    } else {
      setIsTrackPlaying(false);
    }
  })

  const handleMouseLeave = () => {
    setIsHover(false);
    setEditMenu(false);
    setAddMenu(false);
  };

  const handleQueue = () => {
    let formatted = trackList.map(track => formatTrack(track))
    trackRef.current = formatted[index];
    setTrackIdx(index);
    setTrackQueue(formatted);
    setIsPlaying(true);
  };

  const handleDelete = () => {
    const selection = {
      track_id: track.id,
      playlist_id: playlist.id,
      order_num: index + 1,
    }
    window.confirm("Are you sure you would like to remove this song from this playlist?");
    dispatch(deleteFromPlaylist(selection));
  };

  const addTrack = (pl) => {
    const submission = {
      track_id: track.id,
      playlist_id: pl.id,
    };
    dispatch(addToPlaylist(submission, user.id))
    setEditMenu(false);
    setConfirmedBox(true);
  };

  return (
    <div
      className="pl-track-container"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={handleMouseLeave}>
      <div className="pl-track-container-inner">
        <div className="track-details-container">
          {isHover ? (
            <div>
              <button onClick={handleQueue} className="track-play-button">
                {isPlaying && isTrackPlaying ? (
                    <i className="tl fas fa-pause" />
                ) : (
                    <i className="tl fas fa-play" />
                )}
              </button>
            </div>
          ) : (
            <div className="track-num">
              <p>{index + 1}</p>
            </div>
          )}
          <div className="track-img">
            <img src={track.album.art_src} alt="" />
          </div>
        </div>
        <div className="track-title-artist-container">
          <div className="track-title">
            <p>{track.title}</p>
          </div>
          <div className="track-artists">
            {track.artists.map((artist, i) => (
              <div key={artist.id} className="track-artist">
                <Link to={`/artists/${artist.id}`}>
                  {(i ? ', ': '') + artist.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="track-album">
          <Link to={`/albums/${track.album.id}`}>
            {track.album.title}
          </Link>
        </div>
        <div className="track-video">
        {track.vid_src ? (
          <>
            <button
              onClick={() => setShowModal(true)}
              className="track-video-button"
            >
              <i className="fas fa-video" />
            </button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <VideoModal vidSrc={track.vid_src}/>
              </Modal>
            )}
          </>
        ) : (
          <>
            <button
              disabled
              className="track-video-button"
            >
              <i className="fas fa-video" />
            </button>
          </>
        )}
        </div>
        <div className="track-edit-container">
          <div className="track-time">
            <p>{track.time}</p>
          </div>
          {isHover && (
            <div onClick={() => setEditMenu(true)} className="track-edit">
              <i className="tl fas fa-ellipsis-h" />
            </div>
          )}
          {editMenu && isHover && isUserPlaylist && (
            <div className="tl-edit-menu">
              <div className="tl-delete-button">
                <button onClick={handleDelete}>Delete</button>
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
        </div>
      </div>
    </div>
  )
}

export default TrackListing;
