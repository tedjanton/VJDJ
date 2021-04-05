import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppWithContext } from '../../App';
import { formatTrack } from '../../utils';
import './TrackBox.css';
import { addToPlaylist } from '../../store/playlists';


const TrackBox = ({ track, trackList, index }) => {
  const dispatch = useDispatch();
  const userPls = useSelector(state => state.playlists.userPls)
  const user = useSelector(state => state.session.user)
  const { trackQueue, setTrackQueue, setIsPlaying, setTrackIdx } = useContext(AppWithContext)
  const [isHover, setIsHover] = useState(false);
  const [addMenu, setAddMenu] = useState(false);
  

  const handleMouseHover = () => {
    setIsHover(!isHover);
    setAddMenu(false)
  }

  const handleQueue = () => {
    let formatted = trackList.map(track => formatTrack(track))
    setTrackIdx(index);
    setTrackQueue(formatted);
    setIsPlaying(true);
    // setIsTrackPlaying(true);
  }

  // const handleQueue = () => {
  //   if (trackQueue.length) {
  //     setTrackQueue([])
  //     setIsPlaying(false)
  //   }
  //   setTrackQueue([formatTrack(track)]);
  //   setIsPlaying(true)

  // }

  const handleAddBox = () => {
    setAddMenu(true)
  }

  const addTrack = (pl) => {
    const submission = {
      track_id: track.id,
      playlist_id: pl.id,
    }
    setAddMenu(false)
    dispatch(addToPlaylist(submission, user.id))
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
      <div className="tb-title">
        <span>{track.title}</span>
      </div>
      <div className="tb-artists">
      {track.artists.map((artist, i) => (
        <div className="tb-artist" key={artist.id}>
          <p>{(i ? ', ': '') + artist.name}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

export default TrackBox;
