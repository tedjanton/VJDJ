import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AppWithContext } from '../../App';
import { deleteFromPlaylist } from '../../store/playlists';
import { formatTrack } from '../../utils';
import './TrackListing.css';

const TrackListing = ({ track, playlist }) => {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);
  const { trackQueue, setTrackQueue, isPlaying, setIsPlaying } = useContext(AppWithContext)
  const [isTrackPlaying, setIsTrackPlaying] = useState(false);
  const [editMenu, setEditMenu] = useState(false);
  // const [playStyle, setPlayStyle ] = useState()

  const handleMouseEnter = () => {
    setIsHover(true);
  }

  const handleMouseLeave = () => {
    setIsHover(false);
    setEditMenu(false);
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
          <button className="track-video-button">
            <i className="fas fa-video" />
          </button>
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
