import React, { useContext } from 'react';
import AppWithContext from '../../context/AppWithContext';
import MusicPlayer from '../MusicPlayer';

/*
This component acts as a gatekeeper for the display
of the Music Player
*/

const Queue = ({ authenticated }) => {
  const { trackQueue } = useContext(AppWithContext)

  if (!authenticated) return null;

  return (
    <div>
    {trackQueue.length && (
      <MusicPlayer tracks={trackQueue} />
    )}
    </div>
  )
}

export default Queue;
