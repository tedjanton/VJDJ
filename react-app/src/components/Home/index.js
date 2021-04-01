import React from 'react';
// import lil_nas_x_montero from '../../media/lil_nas_x_montero.mp4';
import Popular from '../Popular';
import "./Home.css";

const Home = () => {


  return (
    <div className="home-container">
      <div className="home-featured-video-container">
        <video
          id="featured-video"
          // src={lil_nas_x_montero}
          src="https://vjdj.s3.amazonaws.com/featured-vids/lil-nas-x-montero.mp4"
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
