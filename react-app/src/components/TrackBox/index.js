import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppWithContext } from '../../App';
import { addToPlaylist } from '../../store/playlists';
import { formatTrack } from '../../utils';
import './TrackBox.css';

const TrackBox = ({ track, trackList, index }) => {
  const dispatch = useDispatch();
  const userPls = useSelector(state => state.playlists.userPls)
  const user = useSelector(state => state.session.user)
  const [isHover, setIsHover] = useState(false);
  const [addMenu, setAddMenu] = useState(false);
  const [isTrackPlaying, setIsTrackPlaying] = useState(false);
  const {
    setTrackQueue,
    isPlaying,
    setIsPlaying,
    setTrackIdx,
    trackRef,
    setConfirmedBox
  } = useContext(AppWithContext)


  useEffect(() => {
    if (trackRef.current?.id === track.id) {
      setIsTrackPlaying(true);
    } else {
      setIsTrackPlaying(false);
    }
  })

  const handleMouseHover = () => {
    setIsHover(!isHover);
    setAddMenu(false)
  }

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
    };
    setAddMenu(false);
    dispatch(addToPlaylist(submission, user.id));
    setConfirmedBox(true);
  };

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
          <Link to={`/artists/${artist.id}`}>{(i ? ', ': '') + artist.name}</Link>
        </div>
      ))}
      </div>
    </div>
  )
}

export default TrackBox;
