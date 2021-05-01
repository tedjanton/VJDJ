import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { AppWithContext } from '../../App';
import Controls from "./Controls";
import './MusicPlayer.css';

const MusicPlayer = ({ tracks }) => {
  const {
    isPlaying,
    setIsPlaying,
    trackIdx,
    setTrackIdx,
    trackQueue,
    trackRef
  } = useContext(AppWithContext);
  const [progress, setProgress] = useState(0);
  const { title, artists, art, audio_src } = tracks[trackIdx];
  const audRef = useRef(new Audio(audio_src));
  const [vol, setVol] = useState(audRef.current.volume);
  const [mute, setMute] = useState(false);
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audRef.current;

  const toPrevTrack = () => {
    if (progress > 2) audRef.current.currentTime = 0;
    else if (trackIdx - 1 < 0) setTrackIdx(tracks.length - 1);
    else setTrackIdx(trackIdx - 1);
  };

  const toNextTrack = useCallback(() => {
    if (trackIdx < tracks.length - 1) setTrackIdx(trackIdx + 1);
    else setTrackIdx(0)
  }, [setTrackIdx, trackIdx, tracks.length]);

  const timer = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audRef.current.ended) toNextTrack();
      else setProgress(audRef.current.currentTime)
    }, [1000])
  }, [toNextTrack]);

  useEffect(() => {
    audRef.current.pause();
    audRef.current = new Audio(audio_src);
    trackRef.current = tracks[trackIdx];
    audRef.current.volume = vol;
    setProgress(audRef.current.currentTime);

    if (isReady.current) {
      audRef.current.play();
      setIsPlaying(true);
      timer();
    } else {
      isReady.current = true;
    }
    // eslint-disable-next-line
  }, [trackIdx, trackQueue])

  useEffect(() => {
    audRef.current.volume = vol;
  }, [vol])

  useEffect(() => {
    if (mute) audRef.current.volume = 0;
    else audRef.current.volume = vol;
  })

  useEffect(() => {
    return () => {
      audRef.current.pause();
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    }
    // eslint-disable-next-line
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
            <img className="mp-art" src={art} alt="track art" />
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
              toPrevTrack={toPrevTrack}
              toNextTrack={toNextTrack}
              setIsPlaying={setIsPlaying}
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
          <div onClick={() => setMute(!mute)} className="mp-vol-icon">
            {mute ? (
              <i className="fas fa-volume-mute" />
            ) : (
              <i className="fas fa-volume-up" />
            )}
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
              style={{ background: volStyling, height: "4px" }}
              />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default MusicPlayer;
