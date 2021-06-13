import React, { useContext, useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AudioContext from '../../context/AudioContext';
import { formatTrack } from '../../utils';

/*
Manages the big green button on playlist pages
*/

const PlaylistAudio = ({ playlist, tracks }) => {
  const {
    isPlaying,
    setIsPlaying,
    setTrackQueue,
    setTrackIdx
  } = useContext(AudioContext);
  const [isPlaylistPlaying, setIsPlaylistPlaying] = useState(false);
  const paramsRef = useRef();
  const params = useParams();

  // Connects the green button with the playlist ID param to
  // track if a playlist is currently playing.
  useEffect(() => {
    if (isPlaying && paramsRef.current === params.id) {
      setIsPlaylistPlaying(true);
    } else {
      setIsPlaylistPlaying(false);
    };
  }, [playlist, isPlaying, params, setIsPlaylistPlaying, paramsRef]);

  const addToQueue = () => {
    if (isPlaylistPlaying && isPlaying) {
      setIsPlaylistPlaying(false);
      setIsPlaying(false);
    } else {
      setTrackQueue(tracks.map(track => formatTrack(track.track)));
      setTrackIdx(0);
      setIsPlaying(true);
      paramsRef.current = params.id;
    };
  };

  return (
    <div className="pl-music-play-buttons">
    {isPlaylistPlaying ? (
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
  )
};

export default PlaylistAudio;
