import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MusicPlayer from '../MusicPlayer';


const Queue = ({ authenticated }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const tracks = useSelector(state => state.tracks.popTracks?.map((track) => ({
    title: track.title,
    artists: track.artists.map(artist => artist.name),
    art: track.album.art_src,
    audio_src: track.audio_src,
  })))

  if (!authenticated) {
    return null;
  }

  return (
    <div>
      {tracks && (
        <MusicPlayer
          tracks={tracks}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying} />
      )}
    </div>
  )
}

export default Queue;
