import React from 'react';

import MusicPlayer from '../MusicPlayer';


const Queue = ({ authenticated, trackQueue }) => {

  let tracks = trackQueue

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
