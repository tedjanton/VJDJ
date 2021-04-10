import React from 'react';
import { useHistory } from 'react-router-dom';
import './ArtistBox.css';

const ArtistBox = ({ artist, album }) => {
  const history = useHistory();

  if (artist) {
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
  } else {
    return (
      <div
        onClick={() => history.push(`/albums/${album.id}`)}
        className="plb-container-inner">
        <div className="album-image-container">
          <img src={album.art_src} alt="artist" />
        </div>
        <div className="plb-name">
          <p>{album.title}</p>
        </div>
        <div className="plb-by">
          <p>{album.artist.name}</p>
        </div>
      </div>
    )
  }

}

export default ArtistBox;
