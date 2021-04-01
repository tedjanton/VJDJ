import React from 'react';
import './MusicPlayer.css';


const Controls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick }) => {

    return (
      <div className="controls-container">
        <button
          type="button"
          className="prev"
          aria-label="Previous"
          onClick={onPrevClick}
        >
          <i className="fas fa-step-backward" />
        </button>
        {isPlaying ? (
          <button
            type="button"
            className="pause"
            aria-label="Pause"
            onClick={() => onPlayPauseClick(false)}
          >
            <i className="fas fa-pause-circle" />
          </button>
        ) : (
          <button
            type="button"
            className="play"
            aria-label="Play"
            onClick={() => onPlayPauseClick(true)}
          >
            <i className="fas fa-play-circle" />
          </button>
        )}
        <button
          type="button"
          className="next"
          aria-label="Next"
          onClick={onNextClick}
        >
          <i className="fas fa-step-forward" />
        </button>
      </div>
    )
  }


  export default Controls;
