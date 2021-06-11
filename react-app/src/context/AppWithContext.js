import React, { useRef, useState, useEffect } from 'react';

const AppWithContext = React.createContext();

export function AppContextProvider({ children }) {
  const [isBrowsing, setIsBrowsing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackQueue, setTrackQueue] = useState([]);
  const [trackIdx, setTrackIdx] = useState(0);
  const [confirmedBox, setConfirmedBox] = useState(false);
  const [isPlaylistMenuOpen, setIsPlaylistMenuOpen] = useState(false);
  const paramsRef = useRef();
  const trackRef = useRef();

  useEffect(() => {
    if (confirmedBox) {
      setTimeout(() => {
        setConfirmedBox(false)
      }, 1900)
    }
  }, [confirmedBox]);

  return (
    <>
      <AppWithContext.Provider
        value={{
          trackQueue,
          setTrackQueue,
          isPlaying,
          setIsPlaying,
          trackIdx,
          setTrackIdx,
          isBrowsing,
          setIsBrowsing,
          paramsRef,
          trackRef,
          setConfirmedBox,
          confirmedBox,
          isPlaylistMenuOpen,
          setIsPlaylistMenuOpen
        }}
      >
        {children}
      </AppWithContext.Provider>
    </>
  );
};

export default AppWithContext;
