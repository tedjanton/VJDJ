import React, { useState, useEffect } from 'react';

const UIContext = React.createContext();

/*
Visual state variable context
*/

export function UIContextProvider({ children }) {
  const [isBrowsing, setIsBrowsing] = useState(false);
  const [confirmedBox, setConfirmedBox] = useState(false);

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
        }}
      >
        {children}
      </UIContext.Provider>
    </>
  );
};

export default UIContext;
