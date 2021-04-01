import React, { useState, useEffect, useRef } from 'react';
import Controls from "./Controls";
import chromatica from '../../images/chromatica.jpeg';
import './MusicPlayer.css';


const MusicPlayer = ({}) => {
  let tracks = [{
    title: "Stupid Love",
    artist: "Lady Gaga",
    art: chromatica,
    audio_src: 'https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/03+Stupid+Love.m4a'
  }]
  const [trackIdx, setTrackIds] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { title, artist, art, audio_src } = tracks[trackIdx]

  const audioRef = useRef(new Audio(audio_src))
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const toPrevTrack = () => {
    console.log("go to prev")
  }

  const toNextTrack = () => {
    console.log("go to next")
  }


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
      </div>
    </div>
  )
}


export default MusicPlayer;
