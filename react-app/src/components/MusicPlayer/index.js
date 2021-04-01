import React, { useState, useEffect, useRef } from 'react';
import Controls from "./Controls";
import './MusicPlayer.css';
import { useSelector } from 'react-redux';

const MusicPlayer = ({ authenticated }) => {
  const tracks = useSelector(state => state.playlists.selected?.tracks.map((track) => ({
    title: track.track.title,
    artists: track.track.artists.map(artist => artist.name),
    art: track.track.album.art_src,
    audio_src: track.track.audio_src,
  })))
  const [trackIdx, setTrackIdx] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [vol, setVol] = useState(1);
  const { title, artists, art, audio_src } = tracks ? tracks[trackIdx] : {};
  const audioRef = useRef(new Audio(audio_src))
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;

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

  // console.log(audio_src);

  // useEffect(() => {
  //   audioRef.current = new Audio(audioSrc)
  // }, [audioSrc])

  useEffect(() => {
    audioRef.current.volume = vol;
  }, [vol])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [startTimer, isPlaying]);

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
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #e1e1e1), color-stop(${currentPercentage}, #505050))
  `;
  const currentVolPercentage = `${vol * 100}%`;
  const volStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentVolPercentage}, #e1e1e1), color-stop(${currentVolPercentage}, #505050))
  `;

  if (!authenticated) {
    return null;
  }

  return (
    <footer>
      <div className="mp-container">
        <div className="mp-track-info">
          <div className="mp-art-container">
            <img
              className="mp-art"
              src={art}
              alt="track art"
              />
          </div>
          <div className="mp-track-details">
            <div className="mp-title-container">
              <p>{title}</p>
            </div>
            <div className="mp-artist-container">
              <p>{artists}</p>
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
              <p>{trackProgress ? new Date(trackProgress * 1000).toISOString().substr(15, 4) : "0:00"}</p>
            </div>
            <input
              type="range"
              value={trackProgress}
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


// let tracks = [{
  //   title: "Stupid Love",
  //   artist: "Lady Gaga",
  //   art: chromatica,
  //   audio_src: 'https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/03+Stupid+Love.m4a'
  // }, {
  //   title: "Don't Start Now",
  //   artist: "Dua Lipa",
  //   art: future_nostalgia,
  //   audio_src: 'https://vjdj.s3.amazonaws.com/music/dua-lipa/future-nostalgia/02-dua_lipa-dont_start_now.mp3'
  // }]
