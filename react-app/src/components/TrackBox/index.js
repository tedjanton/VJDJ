import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppWithContext } from '../../App';
import { formatTrack } from '../../utils';
import { addOneTrack } from '../../store/queue';
import './TrackBox.css';


const TrackBox = ({ track }) => {
  const dispatch = useDispatch();
  const userPls = useSelector(state => state.playlists.userPls)
  const { trackQueue, setTrackQueue, isPlaying, setIsPlaying } = useContext(AppWithContext)
  const [isHover, setIsHover] = useState(false);
  const [addMenu, setAddMenu] = useState(false);

  const handleMouseHover = () => {
    setIsHover(!isHover);
    setAddMenu(false)
  }

  const handleQueue = () => {
    if (trackQueue.length) {
      setTrackQueue([])
    } else {
      setTrackQueue([...trackQueue, formatTrack(track)]);
    }
  }

  const handleAddBox = () => {
    setAddMenu(true)
  }

  const addTrack = () => {

  }

  return (
    <div
      className="tb-container"
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}>
      <div className="tb-img">
        <img src={track.album.art_src} alt={track.title} />
        {isHover && (
          <div>
            <button onClick={handleQueue} className="tb-play-button">
              <i className="tb fas fa-play" />
            </button>
            <button onClick={handleAddBox} className="tb-add-song-button">
              <i className="tb fas fa-plus-circle" />
            </button>
          </div>
        )}
        <div className="tb-add-box-container">
          {isHover && addMenu && (
            <div className="tb-add-box">
              <p className="tb-add-title">Add track to:</p>
              {userPls?.map(pl => (
                <div key={pl.id} className="tb-add-pl">
                  <button onClick={addTrack}>{pl.name}</button>
                </div>
              ))}
            </div>

          )}
        </div>
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
