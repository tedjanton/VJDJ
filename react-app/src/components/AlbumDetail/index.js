import React, { useEffect, useContext, useState } from 'react';
import { ColorExtractor } from 'react-color-extractor';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AppWithContext } from '../../App';
import { getAlbum } from '../../store/albums';
import { formatTrack } from '../../utils';
import TrackListing from '../TrackListing';
import './AlbumDetail.css';

const AlbumDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const album = useSelector(state => state.albums.selected);
  const tracks = useSelector(state => state.albums.selected?.tracks);
  const [isAlbumPlaying, setIsAlbumPlaying] = useState(false);
  const [colors, getColors] = useState([]);
  const {
    isPlaying,
    inBrowse,
    setInBrowse,
    setTrackQueue,
    setTrackIdx,
    setIsPlaying,
  } = useContext(AppWithContext);

  useEffect(() => {
    document.getElementById("nav-home").classList.remove("browser")
  }, []);

  useEffect(() => setInBrowse(false), [inBrowse, setInBrowse]);

  useEffect(() => {
    dispatch(getAlbum(params.id))
  }, [dispatch, params]);

  const addToQueue = () => {
    setTrackQueue(tracks.map(track => formatTrack(track)));
    setTrackIdx(0);
    setIsPlaying(true);
    setIsAlbumPlaying(true)
  };

  return (
    <div className="ad-container" style={{ backgroundColor: `${colors[1]}80`}}>
      <div className="ad-header album-detail">
        <div className="pl-image album-image">
          <ColorExtractor getColors={(c) => getColors(c)}>
            <img src={album?.art_src} alt="art" />
          </ColorExtractor>
        </div>
        <div className="album-detail-details">
          <div className="album-detail-top">
            <p>ALBUM</p>
          </div>
          <div className="ad-header-name album-name">
            <h1>{album?.title}</h1>
          </div>
          <div className="ad-header-total-plays artist-detail">
            <div className="album-detail-artist-image">
              <img src={album?.artist.image} alt="artist" />
            </div>
            <Link
              to={`/artists/${album?.artist.id}`}
              className="album-detail-artist-name">{album?.artist.name}</Link>
            <p className="album-detail-year">{`• ${album?.year} •`}</p>
            <div className="pl-num-songs artist-detail">
              <p>{`${tracks?.length} ${tracks?.length === 1 ? "song" : "songs" }`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="ad-bottom-container pl-bottom-container">
        <div className="ad-play-container">
        {isAlbumPlaying && isPlaying ? (
          <button
            type="button"
            className="pl-pause"
            aria-label="Pause"
            onClick={() => setIsPlaying(false)}
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
          <div className="pl-table-header album-detail">
            <div className="pl-header-track-num album-detail">
              <p>#</p>
            </div>
            <div className="pl-header-title album-detail">
              <p>TITLE</p>
            </div>
            <div className="pl-header-album">
              <p>PLAYS</p>
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
                <TrackListing
                  track={track}
                  trackList={tracks}
                  index={i}
                  isAlbum={true}
                  />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlbumDetail;
