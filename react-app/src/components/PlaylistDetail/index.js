import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorExtractor } from 'react-color-extractor';
import { useParams } from 'react-router-dom';
import { AppWithContext } from '../../App';
import TrackListing from './TrackListing';
import { formatTrack } from '../../utils';
import { getPlaylist } from '../../store/playlists';
import { addMultipleTracks } from '../../store/queue';
import './PlaylistDetail.css';


const PlaylistDetail = () => {
  const { trackQueue, setTrackQueue, isPlaying, setIsPlaying } = useContext(AppWithContext)
  const dispatch = useDispatch();
  const params = useParams();
  const playlist = useSelector(state => state.playlists.selected?.playlist);
  const tracks = useSelector(state => state.playlists.selected?.tracks);
  const [images, setImages] = useState([]);
  const [colors, getColors] = useState([]);

  useEffect(() => {
    (async() => {
      let pl = await dispatch(getPlaylist(params.id))
      let imgs = [];
      if (pl.tracks) {
        for (let i = 0; i < pl.tracks.length; i++) {
          imgs.push(pl.tracks[i].track.album.art_src);
        }
      }
      let square = imgs.filter((img, i) => i < 4)
      setImages(square);
    })();
  }, [dispatch, params])

  const addToQueue = () => {
    if (trackQueue.length) {
      setTrackQueue([])
    } else {
      const plTracks = tracks.map(({ track }) => formatTrack(track));
      setTrackQueue([...trackQueue, ...plTracks])
    }

  }

  return (
    <div className="pl-page-container" style={{ backgroundColor: `${colors[3]}80`}}>
      <div className="pl-header-container">
        <div className="pl-header-image-container">
        {images && images?.map((image, i) => (
          <div key={i} className="pl-image">
            <ColorExtractor getColors={(c) => getColors(c)}>
              <img src={image} alt="art" />
            </ColorExtractor>
          </div>
        ))}
        </div>
        <div className="pl-header-details-container">
          <div className="pl-header-playlist">
            <p>PLAYLIST</p>
          </div>
          <div className="pl-header-name">
            <h2>{playlist?.name}</h2>
          </div>
          <div className="pl-subheader">
            <div className="pl-user-name">
              <p>{`${playlist?.user.firstName} ${playlist?.user.lastName} •`}</p>
            </div>
            <div className="pl-num-songs">
              <p>{`${tracks?.length} ${tracks?.length === 1 ? "song" : "songs" }`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-bottom-container">
        <div className="pl-bottom-header">
          <div className="pl-music-play-buttons">
          <button
              type="button"
              className="pl-play"
              aria-label="Play"
              onClick={addToQueue}
            >
              <i className="pl fas fa-play" />
            </button>
          {/* {isPlaying ? (
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
              onClick={() => setIsPlaying(true)}
            >
              <i className="pl fas fa-play" />
            </button>
          )} */}
          </div>
          <div className="pl-like-button">
            <i className="pl fas fa-heart" />
          </div>
          <div className="pl-dot-menu">
            <i className="pl fas fa-ellipsis-h" />
          </div>
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
            <div className="pl-header-date">
              <p>DATE ADDED</p>
            </div>
            <div className="pl-header-time">
              <i className="far fa-clock" />
            </div>
          </div>
        </div>
      </div>
      <div className="tracks-container">
      {tracks?.map(track => (
        <TrackListing
          track={track}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          key={track.id}
        />
      ))}
      </div>
      <div className="pl-margin-bottom"></div>
    </div>
  )
}

export default PlaylistDetail;
