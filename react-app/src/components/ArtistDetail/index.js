import React, { useEffect, useContext, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppWithContext } from '../../App';
import verified from '../../images/verified.png';
import { getArtist } from '../../store/artists';
import { formatTrack } from '../../utils';
import './ArtistDetail.css';


const ArtistDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const artist = useSelector(state => state.artists.selected);
  const tracks = useSelector(state => state.artists.selected?.tracks);
  const { inBrowse, setInBrowse, setTrackQueue, setTrackIdx, setIsPlaying } = useContext(AppWithContext);
  const [isArtistPlaying, setIsArtistPlaying] = useState(false);


  const removeBackground = () => {
    document.getElementById("nav-home").classList.remove("browser")
  }

  useEffect(() => {
    removeBackground()
  }, [])

  useEffect(() => {
    setInBrowse(false)
  }, [inBrowse])

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
  }

  return (
    <div className="ad-container">
      <div className="ad-header" style={
        { backgroundImage: artist ? `url(${artist.image})` : "none"}
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
      <div className="ad-bottom-container">
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
      </div>
    </div>
  )
}

export default ArtistDetail;
