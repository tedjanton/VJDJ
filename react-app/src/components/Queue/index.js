import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MusicPlayer from '../MusicPlayer';


const Queue = ({ authenticated, trackQueue, setTrackQueue }) => {

  let tracks = trackQueue

  // let emptyTracks = [{title: "", artists: "", art: "", audio_src: ""}]

  if (!authenticated) {
    return null;
  }

  return (
    <div>
    {tracks.length && (
      <MusicPlayer tracks={tracks} />
    )}
    </div>
  )
}

export default Queue;
