import React, { useContext, useEffect, useState } from 'react';
import { AppWithContext } from '../../App';
import { Modal } from '../../context/Modal';
import Popular from '../Popular';
import VideoModal from '../VideoModal';
import "./Home.css";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const { inBrowse, setInBrowse, setIsPlaying } = useContext(AppWithContext);

  const removeBackground = (e) => {
    document.getElementById("nav-home").classList.remove("browser")
  }

  useEffect(() => {
    if (showModal) setIsPlaying(false);
  }, [showModal, setIsPlaying])

  useEffect(() => {
    removeBackground()
  }, [])

  useEffect(() => {
    setInBrowse(false)
  }, [inBrowse, setInBrowse])

  return (
    <div className="home-container">
      <div className="home-featured-video-container">
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
