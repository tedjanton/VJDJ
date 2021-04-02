import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AppWithContext } from '../../App';
import { formatTrack } from '../../utils';
import { addOneTrack } from '../../store/queue';
import './TrackBox.css';


const TrackBox = ({ track }) => {
  const dispatch = useDispatch();
  const { trackQueue, setTrackQueue } = useContext(AppWithContext)
  const [isHover, setIsHover] = useState(false);

  const handleMouseHover = () => {
    setIsHover(!isHover);
  }

  const handleQueue = () => {
    setTrackQueue([...trackQueue, formatTrack(track)]);
  }

  return (
    <div
      className="tb-container"
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}>
      <div className="tb-img">
        <img src={track.album.art_src} alt={track.title} />
        {isHover && (
          <button onClick={handleQueue} className="tb-play-button">
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
