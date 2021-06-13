import React, { useContext } from 'react';
import AudioContext from '../../context/AudioContext';
import MusicPlayer from '../MusicPlayer';

/*
This component acts as a gatekeeper for the display
of the Music Player
*/

const Queue = ({ authenticated }) => {
  const { trackQueue } = useContext(AudioContext);

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
