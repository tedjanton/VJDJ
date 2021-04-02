import React, { useState } from 'react';
import './TrackBox.css';


const TrackBox = ({ track }) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseHover = () => {
    setIsHover(!isHover);
  }

  return (
    <div
      className="tb-container"
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}>
      <div className="tb-img">
        <img src={track.album.art_src} alt={track.title} />
        {isHover && (
          <button className="tb-play-button">
            <i className="tb fas fa-play" />
          </button>
        )}
      </div>
      <div className="tb-title">
        <span>{track.title}</span>
      </div>
      <div className="tb-artists">
      {track.artists.map(artist => (
        <div className="tb-artist" key={artist.id}>
          <p>{artist.name}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

export default TrackBox;
