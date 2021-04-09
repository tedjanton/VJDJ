import React from 'react';
import { useHistory } from 'react-router-dom';
import './ArtistBox.css';

const ArtistBox = ({ artist }) => {
  const history = useHistory();

  return (
    <div
      onClick={() => history.push(`/artists/${artist.id}`)}
      className="plb-container-inner">
      <div className="ab-image-container">
        <img src={artist.image} alt="artist" />
      </div>
      <div className="plb-name">
        <p>{artist.name}</p>
      </div>
      <div className="plb-by">
        <p>Artist</p>
      </div>
    </div>
  )
}

export default ArtistBox;
