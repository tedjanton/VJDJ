import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppWithContext from '../../context/AppWithContext';
import { Modal } from '../../context/Modal';
import { formatTrack } from '../../utils';
import VideoModal from '../VideoModal';
import './TrackListing.css';
import TrackActions from './TrackActions';

/*
This component is reused for track listings on the Playlist, Album,
and Artist Detail pages. The "isAlbum" variable conditionally renders
content since Album Detail Pages need to display slightly different
information for each Track Listing.
*/

const TrackListing = ({
  track,
  trackList,
  index,
  playlist,
  isUserPlaylist,
  isAlbum,
  setImages,
  editState
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isTrackPlaying, setIsTrackPlaying] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addMenu, setAddMenu] = useState(false);
  const {
    setTrackQueue,
    isPlaying,
    setIsPlaying,
    setTrackIdx,
    trackRef,
    } = useContext(AppWithContext)

  // Pauses music and cancels hovering if music video
  // button is clicked
  useEffect(() => {
    if (showModal) {
      setIsPlaying(false);
      setIsHover(false);
    }
  }, [showModal, setIsPlaying, isHover, setIsHover]);

  // Determines which track is currently playing to properly
  // render the play/pause buttons on the Track Listing
  useEffect(() => {
    if (trackRef.current?.id === track.id) {
      setIsTrackPlaying(true);
    } else {
      setIsTrackPlaying(false);
    }
  }, [setIsTrackPlaying, track, trackRef])

  // Resets all state when mouse is no longer hovering over
  // a Track Listing
  const handleMouseLeave = () => {
    setIsHover(false);
    setShowUserOptions(false);
    setAddMenu(false);
  };

  // Pauses currently playing music OR adds playlist tracks to the
  // queue and starts playing selected track
  const handleQueue = () => {
    if (isPlaying && isTrackPlaying) {
      setIsPlaying(false);
      setIsTrackPlaying(false);
    } else {
      let formatted = trackList.map(track => (
        formatTrack(track.track ? track.track : track)));
      trackRef.current = formatted[index];
      setTrackIdx(index);
      setTrackQueue(formatted);
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="pl-track-container"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={handleMouseLeave}>
      <div className="pl-track-container-inner">
        <div className="track-num-container">
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
        </div>
        <div className="track-details-container">
          {!isAlbum ? (
            <div className="track-img">
              <img src={track.album?.art_src} alt="" />
            </div>
          ) : (
            null
          )}
          <div className="track-title-artist-container">
            <div className="track-title">
              <p>{track.title}</p>
            </div>
            <div className="track-artists">
              {track.artists?.map((artist, i) => (
                <div key={artist.id} className="track-artist">
                  <Link to={`/artists/${artist.id}`}>
                    {(i ? ', ': '') + artist.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        {!isAlbum ? (
          <div className="track-album">
            <Link to={`/albums/${track.album.id}`}>
              {track.album.title}
            </Link>
          </div>
        ) : (
          <div className="track-num-plays album-detail">
            <p>{track.num_plays.toLocaleString()}</p>
          </div>
        )}
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
        <div className="track-time">
          <p>{track.time}</p>
        </div>
        {!editState && (
          <TrackActions
            isUserPlaylist={isUserPlaylist}
            setAddMenu={setAddMenu}
            setShowUserOptions={setShowUserOptions}
            track={track}
            playlist={playlist}
            index={index}
            setImages={setImages}
            setIsHover={setIsHover}
            isHover={isHover}
            showUserOptions={showUserOptions}
            addMenu={addMenu}
          />
        )}
      </div>
    </div>
  )
}

export default TrackListing;
