import React, { useEffect, useState } from 'react';
import { getWindowDimensions } from '../../utils';
import './VideoModal.css';

/*
Simple music video modal component
*/

const VideoModal = ({ vidSrc }) => {
  const [windowDims, setWindowDims] = useState(getWindowDimensions());

  // Adjusts video size to fit within window
  useEffect(() => {
    const handleResize = () => {
      setWindowDims(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <div className="vid-modal-container">
      <iframe
        width={windowDims.width * .8}
        height={windowDims.height * .9}
        src={vidSrc}
        title="YouTube video player"
        frameBorder="0"
        allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture"
        allowFullScreen>
      </iframe>
    </div>
  )
}

export default VideoModal;
