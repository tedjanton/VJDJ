import React, { useRef, useState, useEffect } from 'react';

const AudioContext = React.createContext();

export function AudioContextProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackQueue, setTrackQueue] = useState([]);
  const [trackIdx, setTrackIdx] = useState(0);
  const trackRef = useRef();

  return (
    <>
      <AudioContext.Provider
        value={{
          trackQueue,
          setTrackQueue,
          isPlaying,
          setIsPlaying,
          trackIdx,
          setTrackIdx,
          trackRef,
        }}
      >
        {children}
      </AudioContext.Provider>
    </>
  );
};

export default AudioContext;
