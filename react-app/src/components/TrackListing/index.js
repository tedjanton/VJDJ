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
  const [isTrackPlaying, ] = useState(false);
  const [editMenu, setEditMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addMenu, setAddMenu] = useState(false);
  const {
    setTrackQueue,
    isPlaying,
    setIsPlaying,
    setTrackIdx,
    trackRef
  } = useContext(AppWithContext)

  useEffect(() => {
    if (showModal) setIsPlaying(false);
  }, [showModal, setIsPlaying])

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    setEditMenu(false);
    setAddMenu(false);
  };

  // console.log(trackRef.current)
  // console.log(track.id);
  // console.log(isTrackPlaying);
  // useEffect(() => {
  //   if (trackRef.current?.id === track.id) {
  //     setIsTrackPlaying(true);
  //   } else {
  //     setIsTrackPlaying(false);
  //   }
  // })

  const handleQueue = () => {
    let formatted = trackList.map(track => formatTrack(track.track))
    trackRef.current = formatted[index];
    setTrackIdx(index);
    setTrackQueue(formatted);
    setIsPlaying(true);
    // setIsTrackPlaying(true);
  }

  const handleEdit = () => {
    setEditMenu(true)
  }

  const handleDelete = () => {
    const selection = {
      track_id: track.track.id,
      playlist_id: playlist.id,
      order_num: track.order_num,
    }
    window.confirm("Are you sure you would like to remove this song from this playlist?");
    dispatch(deleteFromPlaylist(selection));
  }

  const handleAddMenu = () => {
    setAddMenu(true)
  }

  const addTrack = (pl) => {
    const submission = {
      track_id: track.track.id,
      playlist_id: pl.id,
    }
    dispatch(addToPlaylist(submission, user.id))
    setEditMenu(false)
  }

  return (
    <div
      className="pl-track-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div
        className="pl-track-container-inner"
        id={`track-${track.order_num}`}
      >
        <div className="track-details-container">
          {isHover && (
            <div>
              <button onClick={handleQueue} className="track-play-button">
                {isPlaying && isTrackPlaying ? (
                    <i className="tl fas fa-pause" />
                ) : (
                    <i className="tl fas fa-play" />
                )}
              </button>
            </div>
          )}
          {!isHover && (
            <div className="track-num">
              <p>{track.order_num}</p>
            </div>
          )}
          <div className="track-img">
            <img src={track.track.album.art_src} alt="" />
          </div>
        </div>
        <div className="track-title-artist-container">
          <div className="track-title">
            <p>{track.track.title}</p>
          </div>
          <div className="track-artists">
            {track.track.artists.map((artist, i) => (
              <div key={artist.id} className="track-artist">
                <Link to={`/artists/${artist.id}`}>{(i ? ', ': '') + artist.name}</Link>
              </div>
            ))}
          </div>
        </div>
        <div className="track-album">
          <Link to={`/albums/${track.track.album.id}`}>{track.track.album.title}</Link>
        </div>
        <div className="track-video">
        {track.track.vid_src ? (
          <>
            <button
              onClick={() => setShowModal(true)}
              className="track-video-button"
            >
              <i className="fas fa-video" />
            </button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <VideoModal vidSrc={track.track.vid_src}/>
              </Modal>
            )}
          </>
        ) : (
          <>
          </>
        )}
        </div>
        <div className="track-edit-container">
          <div className="track-time">
            <p>{track.track.time}</p>
          </div>
          {isHover && (
            <div onClick={handleEdit} className="track-edit">
              <i className="tl fas fa-ellipsis-h" />
            </div>
          )}
          {editMenu && isHover && isUserPlaylist && (
            <div className="tl-edit-menu">
              <div className="tl-delete-button">
                <button onClick={handleDelete}>Delete</button>
              </div>
              <div className="tl-add-to-button">
                <button onClick={handleAddMenu}>Add to Playlist</button>
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
                <button onClick={handleAddMenu}>Add to Playlist</button>
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
