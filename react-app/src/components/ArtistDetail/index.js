import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppWithContext } from '../../App';
import verified from '../../images/verified.png';
import { getArtist } from '../../store/artists';
import { formatTrack } from '../../utils';
import ArtistTrackListing from '../ArtistTrackListing';
import './ArtistDetail.css';

const ArtistDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const artist = useSelector(state => state.artists.selected);
  const tracks = useSelector(state => state.artists.selected?.tracks);
  const { inBrowse, setInBrowse, setTrackQueue, setTrackIdx, setIsPlaying } = useContext(AppWithContext);
  const [isArtistPlaying, setIsArtistPlaying] = useState(false);
  const [openText, setOpenText] = useState(false);

  useEffect(() => {
    document.getElementById("nav-home").classList.remove("browser");
  }, []);

  useEffect(() => {
    setInBrowse(false)
  }, [inBrowse, setInBrowse])

  useEffect(() => {
    dispatch(getArtist(params.id))
  }, [dispatch, params])

  const addToQueue = () => {
    setTrackQueue([])
    let formatted = tracks.map(track => formatTrack(track))
    setTrackIdx(1);
    setTrackQueue(formatted);
    setTrackIdx(0);
    setIsPlaying(true);
    setIsArtistPlaying(true)
  };

  return (
    <div className="ad-container">
      <div className="ad-header" style={
        { backgroundImage: artist ?
          `linear-gradient(
            to bottom, rgba(245, 246, 252, 0.1), rgba(15, 15, 15, 1)),
             url(${artist.image})`
          : "none"}
      }>
        <div className="ad-header-top">
          <img src={verified} alt="verified" />
          <p>Verified Artist</p>
        </div>
        <div className="ad-header-name">
          <h1>{artist?.name}</h1>
        </div>
        <div className="ad-header-total-plays">
          <p>{artist?.total_plays.toLocaleString()} total plays</p>
        </div>
      </div>
      <div className="ad-bottom-container pl-bottom-container">
        <div className="ad-play-container">
        {isArtistPlaying ? (
          <button
            type="button"
            className="pl-pause"
            aria-label="Pause"
            onClick={addToQueue}
          >
            <i className="pl fas fa-pause" />
          </button>
        ) : (
          <button
            type="button"
            className="pl-play"
            aria-label="Play"
            onClick={addToQueue}
          >
            <i className="pl fas fa-play" />
          </button>
        )}
        </div>
        <div className="pl-table-container">
          <div className="pl-table-header">
            <div className="pl-header-num-title-container">
              <div className="pl-header-track-num">
                <p>#</p>
              </div>
              <div className="pl-header-title">
                <p>TITLE</p>
              </div>
            </div>
            <div className="pl-header-album">
              <p>ALBUM</p>
            </div>
            <div className="pl-header-vid">
              <p>VIDEO</p>
            </div>
            <div className="pl-header-time">
              <i className="far fa-clock" />
            </div>
          </div>
          <div className="tracks-container">
            {tracks?.map((track, i) => (
              <div key={track.id}>
                <ArtistTrackListing
                  track={track}
                  trackList={tracks}
                  index={i}
                  />
              </div>
            ))}
          </div>
        </div>
        <div className="ad-bio">
          <h2>Artist Biography</h2>
          {!openText ? (
            <p>{artist?.bio.slice(0, 300)}...
              <button
                className="open-close-text"
                onClick={() => setOpenText(true)}>read more
              </button>
            </p>
          ) : (
            <p>{artist?.bio}
              <button
                className="open-close-text"
                onClick={() => setOpenText(false)}>read less
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArtistDetail;
