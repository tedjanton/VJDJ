import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppWithContext } from '../../App';
import Controls from "./Controls";
import './MusicPlayer.css';


const MusicPlayer = ({ tracks }) => {
  const {
    isPlaying,
    setIsPlaying,
    trackIdx,
    setTrackIdx,
    trackQueue
  } = useContext(AppWithContext);
  const [progress, setProgress] = useState(0);
  const [vol, setVol] = useState(1);
  const { title, artists, art, audio_src } = tracks[trackIdx];
  const audRef = useRef(new Audio(audio_src));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audRef.current;

  const timer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audRef.current.ended) toNextTrack();
      else setProgress(audRef.current.currentTime)
    }, [1000])
  };

  useEffect(() => {
    audRef.current.pause();
    audRef.current = new Audio(audio_src);
    setProgress(audRef.current.currentTime);

    if (isReady.current) {
      audRef.current.play();
      setIsPlaying(true);
      timer();
    } else {
      isReady.current = true;
    }
  }, [trackIdx, trackQueue])

  useEffect(() => {
    audRef.current.volume = vol;
  }, [vol])

  useEffect(() => {
    return () => {
      audRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audRef.current.play();
      timer();
    } else {
      clearInterval(intervalRef.current);
      audRef.current.pause();
    }
  }, [timer, isPlaying]);

  const toPrevTrack = () => {
    if (progress > 2) audRef.current.currentTime = 0;
    else if (trackIdx - 1 < 0) setTrackIdx(tracks.length - 1);
    else setTrackIdx(trackIdx - 1);
  }

  const toNextTrack = () => {
    if (trackIdx < tracks.length - 1) setTrackIdx(trackIdx + 1);
    else setTrackIdx(0)
  }

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audRef.current.currentTime = value;
    setProgress(audRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) setIsPlaying(true);
    timer();
  }

  const currPercentage = duration ? `${(progress / duration) * 100}%` : '0%';
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%,
      color-stop(${currPercentage}, #e1e1e1),
      color-stop(${currPercentage}, #505050))
  `;
  const curVolPercentage = `${vol * 100}%`;
  const volStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%,
      color-stop(${curVolPercentage}, #e1e1e1),
      color-stop(${curVolPercentage}, #505050))
  `;

  return (
    <footer>
      <div className="mp-container">
        <div className="mp-track-info">
          <div className="mp-art-container">
          {art && (
            <img
              className="mp-art"
              src={art}
              alt="track art"
            />
          )}
          </div>
          <div className="mp-track-details">
            <div className="mp-title-container">
              <p>{title}</p>
            </div>
            <div className="mp-artist-container">
            {artists?.map((artist, i) => (
              <p key={artist}>{(i ? ', ': '') + artist}</p>
            ))}
            </div>
          </div>
        </div>
        <div className="mp-handling-container">
          <div className="mp-controls-container">
            <Controls
              isPlaying={isPlaying}
              onPrevClick={toPrevTrack}
              onNextClick={toNextTrack}
              onPlayPauseClick={setIsPlaying}
              />
          </div>
          <div className="mp-progress-container">
            <div className="mp-progress-start">
              <p>{progress ? new Date(progress * 1000).toISOString().substr(15, 4) : "0:00"}</p>
            </div>
            <input
              type="range"
              value={progress}
              step="1"
              min="0"
              max={duration ? duration : `${duration}`}
              className="progress slider"
              onChange={(e) => onScrub(e.target.value)}
              onMouseUp={onScrubEnd}
              onKeyUp={onScrubEnd}
              style={{ background: trackStyling, height: "4px" }}
              />
            <div className="mp-progress-end">
              <p>{duration ? new Date(duration * 1000).toISOString().substr(15, 4) : "0:00"}</p>
            </div>
          </div>
        </div>
        <div className="mp-volume-container">
          <div className="mp-vol-icon">
            <i className="fas fa-volume-up" />
          </div>
          <div className="mp-vol-slider">
            <input
              type="range"
              value={vol}
              step="0.01"
              min="0"
              max="1"
              className="volume slider"
              onChange={(e) => setVol(e.target.value)}
              style={{ background: volStyling, height: "4px"  }}
              />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default MusicPlayer;
