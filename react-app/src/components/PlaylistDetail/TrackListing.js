import React, { useState, useContext, useEffect } from 'react';
import { AppWithContext } from '../../App';
import { formatTrack } from '../../utils';

const TrackListing = ({ track }) => {
  const [isHover, setIsHover] = useState(false);
  const { trackQueue, setTrackQueue, isPlaying, setIsPlaying } = useContext(AppWithContext)
  const [isTrackPlaying, setIsTrackPlaying] = useState(false);
  const [playStyle, setPlayStyle] = useState()

  const handleMouseHover = () => {
    setIsHover(!isHover);
  }

  const handleQueue = () => {
    if (trackQueue.length) {
      setTrackQueue([]);
      setIsPlaying(false);
      setIsTrackPlaying(false)
    } else {
      setTrackQueue([...trackQueue, formatTrack(track.track)]);
      setIsPlaying(true);
      setIsTrackPlaying(true);
    }
  }

  // useEffect(() => {
  //   if (!isTrackPlaying) {
  //     setPlayStyle(null)
  //   } else {
  //     setPlayStyle("#202020")
  //   }

  // }, [isTrackPlaying])

  return (
    <div
      className="pl-track-container"
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}>
      <div
        className="pl-track-container-inner"
        id={`track-${track.order_num}`}
        style={{ backgroundColor: playStyle }}
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
          <button className="track-video-button">
            <i className="fas fa-video" />
          </button>
        </div>
        <div className="track-time">
          <p>{track.track.time}</p>
        </div>
      </div>
    </div>
  )
}

export default TrackListing;
