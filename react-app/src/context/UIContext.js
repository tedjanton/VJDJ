import React, { useRef, useState, useEffect } from 'react';

const UIContext = React.createContext();

export function UIContextProvider({ children }) {
  const [isBrowsing, setIsBrowsing] = useState(false);
  const [confirmedBox, setConfirmedBox] = useState(false);
  const [isPlaylistMenuOpen, setIsPlaylistMenuOpen] = useState(false);

  useEffect(() => {
    if (confirmedBox) {
      setTimeout(() => {
        setConfirmedBox(false)
      }, 1900)
    }
  }, [confirmedBox]);

  return (
    <>
      <UIContext.Provider
        value={{
          isBrowsing,
          setIsBrowsing,
          setConfirmedBox,
          confirmedBox,
          isPlaylistMenuOpen,
          setIsPlaylistMenuOpen
        }}
      >
        {children}
      </UIContext.Provider>
    </>
  );
};

export default UIContext;
