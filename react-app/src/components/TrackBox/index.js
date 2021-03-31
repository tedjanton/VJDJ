import React from 'react';
import './TrackBox.css';


const TrackBox = ({ track }) => {

  return (
    <div className="tb-container">
      <div className="tb-img">
        <img src={track.album.art_src} alt={track.title} />
      </div>
      <div className="tb-title">
        <span>{track.title}</span>
      </div>
      <div className="tb-artists">
      {track.artists.map(artist => (
        <div className="tb-artist" key={artist.id}>
          <p>{artist.name}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

export default TrackBox;
