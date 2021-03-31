import React from 'react';
import lil_nas_x_montero from '../../media/lil_nas_x_montero.mp4';
import LeftMenu from '../LeftMenu';
import Popular from '../Popular';
import "./Home.css";

const Home = () => {


  return (
    <div className="home-container">
      <div className="lm-container">
        <LeftMenu />
      </div>
      <div className="home-featured-video-container">
        <video
          id="featured-video"
          src={lil_nas_x_montero}
          // src="https://vjdj.s3.amazonaws.com/featured-vids/lil-nas-x-montero.mp4"
          autoPlay
          controls
          loop
          width="100%"
          muted
        />
      </div>
      <div className="home-bottom-container">
        <Popular />
      </div>
    </div>
  )
}

export default Home;
