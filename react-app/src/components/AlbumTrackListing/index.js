import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppWithContext } from '../../App';
import { Modal } from '../../context/Modal';
import { addToPlaylist } from '../../store/playlists';
import { formatTrack } from '../../utils';
import VideoModal from '../VideoModal';
import './AlbumTrackListing.css';

const AlbumTrackListing = ({ track, trackList, index }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const userPls = useSelector(state => state.playlists.userPls)
  const [isHover, setIsHover] = useState(false);
  const [isTrackPlaying, ] = useState(false);
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

  const handleMouseLeave = () => {
    setIsHover(false);
    setAddMenu(false);
  };

  const handleQueue = () => {
    let formatted = trackList.map(track => formatTrack(track))
    trackRef.current = formatted[index];
    setTrackIdx(index);
    setTrackQueue(formatted);
    setIsPlaying(true);
  };

  const addTrack = (pl) => {
    const submission = {
      track_id: track.id,
      playlist_id: pl.id,
    }
    dispatch(addToPlaylist(submission, user.id));
    setAddMenu(false);
    setConfirmedBox(true);
  }

  return (
    <div
      className="pl-track-container album-track-container"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={handleMouseLeave}>
      <div
        className="pl-track-container-inner album-track-container-inner"
        id={`track-${track.track_num}`}
      >
        {!isHover ? (
          <div className="track-num album-detail">
            <p>{track?.track_num}</p>
          </div>
          ) : (
          <div>
            <button onClick={handleQueue} className="track-play-button album-detail">
              {isPlaying && isTrackPlaying ? (
                  <i className="tl fas fa-pause" />
              ) : (
                  <i className="tl fas fa-play" />
              )}
            </button>
          </div>
          )
        }
        <div className="track-title-artist-container artist-detail">
          <div className="track-title">
            <p>{track.title}</p>
          </div>
          <div className="track-artists">
            {track.artists.map((artist, i) => (
              <div key={artist.id} className="track-artist">
                <Link to={`/artists/${artist.id}`}>{(i ? ', ': '') + artist.name}</Link>
              </div>
            ))}
          </div>
        </div>
        <div className="track-num-plays album-detail">
          <p>{track?.num_plays.toLocaleString()}</p>
        </div>
        <div className="track-video artist-detail">
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
        <div className="track-edit-container artist-detail">
          <div className="track-time">
            <p>{track.time}</p>
          </div>
          {isHover && (
            <div onClick={() => setAddMenu(true)} className="track-edit artist">
              <i className="tl fas fa-ellipsis-h" />
            </div>
          )}
          {addMenu && (
            <div className="atb tb-add-box">
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
    </div>
  )
}

export default AlbumTrackListing;
