import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppWithContext } from '../../App';
import { Modal } from '../../context/Modal';
import Popular from '../Popular';
import VideoModal from '../VideoModal';
import "./Home.css";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef();
  const { inBrowse, setInBrowse, setIsPlaying } = useContext(AppWithContext);

  const removeBackground = (e) => {
    document.getElementById("nav-home").classList.remove("browser")
  }

  const handleVideo = () => {
    videoRef.current = document.getElementById("featured-video")
    // videoRef.current.setAttribute("src", "https://vjdj.s3.amazonaws.com/featured-vids/lil-nax-x-montero.mp4")
  }

  useEffect(() => {
    if (showModal) setIsPlaying(false);

    if (showModal && videoRef.current) {
      videoRef.current.pause();
    } else if (!showModal && videoRef.current) {
      videoRef.current.play();
    }

  }, [showModal, setIsPlaying])

  useEffect(() => {
    removeBackground()
    handleVideo()
  }, [])

  useEffect(() => {
    setInBrowse(false)
  }, [inBrowse, setInBrowse])

  return (
    <div className="home-container">
      <div className="home-featured-video-container" style={
            { background: `linear-gradient(to bottom, rgba(245, 246, 252, 0.1), rgba(15, 15, 15, 1))`}
          }>
        <video
          id="featured-video"
          // src="https://vjdj.s3.amazonaws.com/featured-vids/lil-nax-x-montero-2.mp4"
          autoPlay
          loop
          width="100%"
          muted
        />
      </div>
      <div className="home-bottom-container">
        <div className="home-featured-detail-container">
          <div className="home-featured-title">
            <h1>{`MONTERO`}</h1>
            <span>Lil Nas X</span>
          </div>
          <div className="home-feature-watch-button">
            <button onClick={() => setShowModal(true)}>Watch Now</button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <VideoModal vidSrc="https://www.youtube.com/embed/6swmTBVI83k" />
              </Modal>
            )}
          </div>
        </div>
        <Popular />
      </div>
    </div>
  )
}

export default Home;
