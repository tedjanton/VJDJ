import React, { useContext } from 'react';
import { AppWithContext } from '../../App';
import MusicPlayer from '../MusicPlayer';


const Queue = ({ authenticated }) => {
  const { trackQueue } = useContext(AppWithContext)
  let tracks = trackQueue

  if (!authenticated) return null;

  return (
    <div>
    {tracks.length && (
      <MusicPlayer tracks={tracks} />
    )}
    </div>
  )
}

export default Queue;
