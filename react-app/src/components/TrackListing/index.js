import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AppWithContext } from '../../App';
import { Modal } from '../../context/Modal';
import { deleteFromPlaylist } from '../../store/playlists';
import { formatTrack } from '../../utils';
import VideoModal from '../VideoModal';
import './TrackListing.css';

const TrackListing = ({ track, trackList, index, playlist }) => {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);
  const [isTrackPlaying, setIsTrackPlaying] = useState(false);
  const [editMenu, setEditMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    trackQueue,
    setTrackQueue,
    isPlaying,
    setIsPlaying,
    trackIdx,
    setTrackIdx
  } = useContext(AppWithContext)
  // const [playStyle, setPlayStyle ] = useState()

  const handleMouseEnter = () => {
    setIsHover(true);
  }

  const handleMouseLeave = () => {
    setIsHover(false);
    setEditMenu(false);
  }

  const handleQueue = () => {
    let formatted = trackList.map(track => formatTrack(track.track))
    setTrackIdx(index);
    setTrackQueue(formatted);
    setIsPlaying(true);
    setIsTrackPlaying(true);
  }

  // useEffect(() => {
  //   if (!isTrackPlaying) {
  //     setPlayStyle(null)
  //   } else {
  //     setPlayStyle("#202020")
  //   }

  // }, [isTrackPlaying])

  const handleEdit = () => {
    setEditMenu(true)
  }

  const handleDelete = () => {
    const selection = {
      track_id: track.track.id,
      playlist_id: playlist.id,
      order_num: track.order_num,
    }
    window.alert("Are you sure you would like to remove this song from this playlist?");
    dispatch(deleteFromPlaylist(selection));
  }

  return (
    <div
      className="pl-track-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div
        className="pl-track-container-inner"
        id={`track-${track.order_num}`}
        // style={{ backgroundColor: playStyle }}
      >
        <div className="track-details-container">
          {isHover ? (
            <div>
              {isPlaying && isTrackPlaying ? (
                <button onClick={handleQueue} className="track-play-button">
                  <i className="tl fas fa-pause" />
                </button>
              ) : (
                <button onClick={handleQueue} className="track-pause-button">
                  <i className="tl fas fa-play" />
                </button>
              )}
            </div>
          ) : (
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
                <p>{(i ? ', ': '') + artist.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="track-album">
          <p>{track.track.album.title}</p>
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
          {editMenu && isHover && (
            <div className="tl-edit-menu">
              <div className="tl-delete-button">
                <button onClick={handleDelete}>Delete</button>
              </div>
              <div className="tl-add-to-button">
                <button>Add to Playlist</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrackListing;
