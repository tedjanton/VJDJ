import React, { useState, useEffect, useRef } from 'react';
import Controls from "./Controls";
import chromatica from '../../images/chromatica.jpeg';
import future_nostalgia from '../../images/future_nostalgia.jpeg';
import './MusicPlayer.css';


const MusicPlayer = ({}) => {
  let tracks = [{
    title: "Stupid Love",
    artist: "Lady Gaga",
    art: chromatica,
    audio_src: 'https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/03+Stupid+Love.m4a'
  }, {
    title: "Don't Start Now",
    artist: "Dua Lipa",
    art: future_nostalgia,
    audio_src: 'https://vjdj.s3.amazonaws.com/music/dua-lipa/future-nostalgia/02-dua_lipa-dont_start_now.mp3'
  }]
  const [trackIdx, setTrackIdx] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { title, artist, art, audio_src } = tracks[trackIdx]
  const audioRef = useRef(new Audio(audio_src))
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;


  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audio_src);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [trackIdx])

  const toPrevTrack = () => {
    if (trackProgress > 2) {
      audioRef.current.currentTime = 0;
    } else if (trackIdx - 1 < 0) {
      setTrackIdx(tracks.length - 1);
    } else {
      setTrackIdx(trackIdx - 1);
    }
  }

  const toNextTrack = () => {
    if (trackIdx < tracks.length - 1) {
      setTrackIdx(trackIdx + 1);
    } else {
      setTrackIdx(0)
    }
  }

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime)
      }
    }, [1000])
  }

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true)
    }
    startTimer();
  }

  const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `

  return (
    <div className="mp-container">
      <div className="mp-track-info">
        <div className="mp-art-container">
          <img
            className="mp-art"
            src={art}
            alt="track art"
          />
        </div>
        <div className="mp-title-container">
          <p>{title}</p>
        </div>
        <div className="mp-artist-container">
          <p>{artist}</p>
        </div>
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
            <p>{trackProgress ? new Date(trackProgress * 1000).toISOString().substr(15, 4) : "0:00"}</p>
          </div>
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration ? duration : `${duration}`}
            className="progress"
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            style={{ background: trackStyling }}
          />
          <div className="mp-progress-end">
            <p>{duration ? new Date(duration * 1000).toISOString().substr(15, 4) : "0:00"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default MusicPlayer;
