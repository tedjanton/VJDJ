import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AudioContext from '../../context/AudioContext';
import { formatTrack } from '../../utils';
import AddToPlaylistMenu from '../AddToPlaylistMenu';
import './TrackBox.css';

/*
Single track box component
*/

const TrackBox = ({ track, trackList, index }) => {
  const [isHover, setIsHover] = useState(false);
  const [addMenu, setAddMenu] = useState(false);
  const [isTrackPlaying, setIsTrackPlaying] = useState(false);
  const {
    setTrackQueue,
    isPlaying,
    setIsPlaying,
    setTrackIdx,
    trackRef
  } = useContext(AudioContext);

  // Dynamically renders play/pause button if track is
  // currently playing
  useEffect(() => {
    if (trackRef.current?.id === track.id) {
      setIsTrackPlaying(true);
    } else {
      setIsTrackPlaying(false);
    }
  }, [setIsTrackPlaying, trackRef, track])

  const handleMouseLeave = () => {
    setIsHover(false);
    setAddMenu(false);
  }

  // Manages playing of a track
  const handleQueue = () => {
    if (isPlaying && isTrackPlaying) {
      setIsPlaying(false);
      setIsTrackPlaying(false);
    } else {
      let formatted = trackList.map(track => formatTrack(track))
      trackRef.current = formatted[index];
      setTrackIdx(index);
      setTrackQueue(formatted);
      setIsPlaying(true);
      setIsTrackPlaying(true);
    }
  };

  return (
    <div
      className="tb-container"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={handleMouseLeave}>
      <div className="tb-img">
        <img src={track.album.art_src} alt={track.title} />
        {isHover && (
          <div>
            <button onClick={handleQueue} className="tb-play-button">
              {isPlaying && isTrackPlaying ? (
                <i className="tb fas fa-pause" />
              ) : (
                <i className="tb fas fa-play" />
              )}
            </button>
            <button onClick={() => setAddMenu(true)} className="tb-add-song-button">
              <i className="tb fas fa-plus-circle" />
            </button>
          </div>
        )}
        <div className="tb-add-box-container">
        {addMenu && (
          <AddToPlaylistMenu setAddMenu={setAddMenu} track={track}/>
        )}
        </div>
      </div>
      <div className="tb-title">
        <span>{track.title}</span>
      </div>
      <div className="tb-artists">
      {track.artists.map((artist, i) => (
        <div className="tb-artist" key={artist.id}>
          <Link to={`/artists/${artist.id}`}>
            <span>{(i ? ", ": "")}</span>
            <span className="track-artist-name">{artist.name}</span>
          </Link>
        </div>
      ))}
      </div>
    </div>
  )
}

export default TrackBox;
