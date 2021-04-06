import React, { useContext, useEffect } from 'react';
import App, { AppWithContext } from '../../App';
import Popular from '../Popular';
import "./Home.css";

const Home = () => {
  const { inBrowse, setInBrowse } = useContext(AppWithContext);

  console.log(inBrowse);

  useEffect(() => {
    setInBrowse(false)
  }, [inBrowse])

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
            <button>Watch Now</button>
          </div>
        </div>
        <Popular />
      </div>
    </div>
  )
}

export default Home;
