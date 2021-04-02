import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MusicPlayer from '../MusicPlayer';


const Queue = ({ isPlaying, setIsPlaying, authenticated, trackQueue, setTrackQueue }) => {

  let tracks = trackQueue;

  if (!authenticated) {
    return null;
  }

  return (
    <div>
      {tracks.length && (
        <MusicPlayer
          tracks={tracks}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying} />
      )}
    </div>
  )
}

export default Queue;
