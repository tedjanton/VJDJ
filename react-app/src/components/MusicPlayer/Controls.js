import React from 'react';
import './MusicPlayer.css';


const Controls = ({ isPlaying, setIsPlaying, toPrevTrack, toNextTrack }) => {
    return (
      <div className="controls-container">
        <button
          type="button"
          className="prev"
          aria-label="Previous"
          onClick={toPrevTrack}
        >
          <i className="fas fa-step-backward" />
        </button>
        {isPlaying ? (
          <button
            type="button"
            className="pause"
            aria-label="Pause"
            onClick={() => setIsPlaying(false)}
          >
            <i className="fas fa-pause-circle" />
          </button>
        ) : (
          <button
            type="button"
            className="play"
            aria-label="Play"
            onClick={() => setIsPlaying(true)}
          >
            <i className="fas fa-play-circle" />
          </button>
        )}
        <button
          type="button"
          className="next"
          aria-label="Next"
          onClick={toNextTrack}
        >
          <i className="fas fa-step-forward" />
        </button>
      </div>
    )
  }


  export default Controls;
