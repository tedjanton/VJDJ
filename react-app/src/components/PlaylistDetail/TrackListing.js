import React from 'react';


const TrackListing = ({ track, isPlaying, setIsPlaying }) => {


  return (
    <div className="pl-track-container">
      <div
        className="pl-track-container-inner"
        // onClick={handlePlaying}
        id={`track-${track.track.order_num}`}
      >
        <div className="track-details-container">
          <div className="track-num">
            <p>{track.order_num}</p>
          </div>
          <div className="track-img">
            <img src={track.track.album.art_src} alt="" />
          </div>
          <div className="track-title-artist-container">
            <div className="track-title">
              <p>{track.track.title}</p>
            </div>
            <div className="track-artists">
              {track.track.artists.map(artist => (
                <div key={artist.id} className="track-artist">
                  <p>{artist.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="track-album">
          <p>{track.track.album.title}</p>
        </div>
        <div className="track-video">
          <button className="track-video-button">
            <i className="fas fa-video" />
          </button>
        </div>
        <div className="track-time">
          <p>TIME</p>
        </div>
      </div>
    </div>
  )
}

export default TrackListing;