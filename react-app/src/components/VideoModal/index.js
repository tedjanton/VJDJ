import React, { useEffect, useState } from 'react';
import './VideoModal.css';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

const VideoModal = ({ vidSrc, setShowModal }) => {
  const [windowDims, setWindowDims] = useState(getWindowDimensions());

  console.log(windowDims);

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
        width={windowDims.width * 0.8}
        height={windowDims.height * 0.8}
        src={vidSrc}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
      </iframe>
    </div>
  )
}

export default VideoModal;
