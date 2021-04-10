import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppWithContext } from '../../App';
import { Modal } from '../../context/Modal';
import { addToPlaylist } from '../../store/playlists';
import { formatTrack } from '../../utils';
import VideoModal from '../VideoModal';
import './ArtistTrackListing.css';

const ArtistTrackListing = ({ track, trackList, index }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
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
    trackRef
  } = useContext(AppWithContext)

  useEffect(() => {
    if (showModal) setIsPlaying(false);
  }, [showModal, setIsPlaying])

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    setAddMenu(false);
  };

  // console.log(trackRef.current)
  // console.log(track.id);
  // console.log(isTrackPlaying);
  // useEffect(() => {
  //   if (trackRef.current?.id === track.id) {
  //     setIsTrackPlaying(true);
  //   } else {
  //     setIsTrackPlaying(false);
  //   }
  // })

  const handleQueue = () => {
    let formatted = trackList.map(track => formatTrack(track))
    trackRef.current = formatted[index];
    setTrackIdx(index);
    setTrackQueue(formatted);
    setIsPlaying(true);
    // setIsTrackPlaying(true);
  }

  const handleAddMenu = () => {
    setAddMenu(true)
  }

  const addTrack = (pl) => {
    const submission = {
      track_id: track.id,
      playlist_id: pl.id,
    }
    dispatch(addToPlaylist(submission, user.id))
  }

  return (
    <div
      className="pl-track-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div
        className="pl-track-container-inner"
        id={`track-${track.order_num}`}
      >
        <div className="track-details-container">
          {isHover && (
            <div>
              <button onClick={handleQueue} className="track-play-button">
                {isPlaying && isTrackPlaying ? (
                    <i className="tl fas fa-pause" />
                ) : (
                    <i className="tl fas fa-play" />
                )}
              </button>
            </div>
          )}
          {!isHover && (
            <div className="track-num">
              <p>{index + 1}</p>
            </div>
          )}
          <div className="track-img">
            <img src={track.album.art_src} alt="" />
          </div>
        </div>
        <div className="track-title-artist-container">
          <div className="track-title">
            <p>{track.title}</p>
          </div>
          <div className="track-artists">
            {track.artists.map((artist, i) => (
              <div key={artist.id} className="track-artist">
                <p>{(i ? ', ': '') + artist.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="track-album">
          <p>{track.album.title}</p>
        </div>
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
          </>
        )}
        </div>
        <div className="track-edit-container">
          <div className="track-time">
            <p>{track.time}</p>
          </div>
          {isHover && (
            <div onClick={handleAddMenu} className="track-edit artist">
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

export default ArtistTrackListing;